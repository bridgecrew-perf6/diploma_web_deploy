import {
    CircularProgress
} from "@material-ui/core";
import React, {useState} from "react";
import {useEffect} from "react";
import fire from "../../fire";
import {history} from "../../history";
import {CARWASH_ORDERS_PATH, ORDERS_PATH} from "../../core/constants";
import OrderCard from "./components/OrderCard";
import OrdersTabsContainer from "./components/OrdersTabsContainer";

function OrdersInbox() {
    const [orders, setOrders] = useState([]);
    const [ref, setRef] = useState([]);
    const [refUser, setRefUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const currentUser = fire.auth().currentUser;
        const userId = localStorage.getItem("userId");
        if (currentUser || userId) {
            setLoading(true);
            const ref = fire
                .firestore()
                .collection(CARWASH_ORDERS_PATH)
                .doc(currentUser?.uid || userId);

            ref.get().then(fetchDataCallback);

            setRef(ref);
        } else {
            history.push("/login");
        }
    }, []);


    const fetchDataCallback = (value) => {
        setOrders(value.data()?.orders.filter(isOrderPending).map(formatOrderDate) ?? []);
        setLoading(false);
    }

    const isOrderPending = (el) => el.status === null;

    const formatOrderDate = (order) => {
        const hh = parseInt(order.time.split(":")[0]);
        const mm = parseInt(order.time.split(":")[1]);
        return {
            ...order, time: `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}`,
        };
    };

    const handleChangeStatusOrder = (index, status, order) => {
        setLoading(true);
        const _orders = orders;

        _orders[index] = {
            ..._orders[index], status: status,
        };
        console.log(orders);
        const ref1 = fire
            .firestore()
            .collection(ORDERS_PATH)
            .doc(_orders[index].userid);

        let userOrders = [];
        let userOrderIndex = -1;
        ref1.get().then((value) => {
            userOrders = value.data()?.orders ?? [];
            console.log(value.data()?.orders ?? []);
            userOrderIndex = userOrders.findIndex((element, index, array) => {
                return (element.date == order.date && parseInt(element.time.split(":")[0]) == parseInt(order.time.split(":")[0]) && parseInt(element.time.split(":")[1]) == parseInt(order.time.split(":")[1]));
            });
            const _ordersUser = userOrders;

            console.log("TTTBefore", _ordersUser[userOrderIndex]);
            _ordersUser[userOrderIndex] = {
                ..._ordersUser[userOrderIndex], status: status,
            };
            console.log("TTTAfter", _ordersUser[userOrderIndex]);

            ref
                .set({
                    orders: _orders,
                })
                .then((response) => {
                    console.log(response);
                    setLoading(false);
                    setOrders(_orders ?? []);
                });
            console.log(_orders[index]);
            console.log(_ordersUser);
            console.log(_orders[index].userid ?? "undefined");
            _orders[index].userid && fire
                .firestore()
                .collection(ORDERS_PATH)
                .doc(_orders[index].userid)
                .set({
                    orders: _ordersUser.filter((e) => e),
                })
                .then((response) => {
                    console.log(response);
                    setLoading(false);
                });
        });
    };

    return (<OrdersTabsContainer title={'PENDING ORDERS'} content={
        loading ? (<CircularProgress/>) : orders.length > 0 ? (
            <div className="orders">
                {orders.map((order, index) => {
                    return <OrderCard order={order}
                                      handleChangeStatusOrder={handleChangeStatusOrder} index={index}
                    />;
                })}
            </div>) : (<div className="no_content">
            <p>No Orders</p>
        </div>)
    }/>);
}

export default OrdersInbox;
