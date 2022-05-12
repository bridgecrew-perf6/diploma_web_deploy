import {
    CircularProgress,
} from "@material-ui/core";
import React, {useState} from "react";
import {useEffect} from "react";
import {ReactComponent as DateIcon} from "../../assets/icons/dateIcon.svg";
import {ReactComponent as PriceIcon} from "../../assets/icons/priceIcon.svg";
import fire from "../../fire";
import {history} from "../../history";
import OrdersTabsContainer from "./components/OrdersTabsContainer";
import OrderCard from "./components/OrderCard";
import {CARWASH_ORDERS_PATH} from "../../core/constants";

function OrdersDeclined() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ref, setRef] = useState([]);

    useEffect(() => {
        const currentUser = fire.auth().currentUser;
        const userId = localStorage.getItem("userId");
        if (currentUser || userId) {
            setLoading(true);
            const ref = fire
                .firestore()
                .collection(CARWASH_ORDERS_PATH)
                .doc(currentUser.uid || userId);
            const docSnapshot = ref.get().then((value) => {
                setOrders(
                    value
                        .data()
                        ?.orders.filter(isOrderDeclined)
                        .map(formatOrderDate) ?? []
                );
                console.table(value.data()?.orders ?? []);
                setLoading(false);
            });

            setRef(ref);
        } else {
            history.push("/login");
        }
    }, []);

    const isOrderDeclined = (el) => el.status === "DECLINED";
    const formatOrderDate = (order) => {
        const hh = parseInt(order.time.split(":")[0]);
        const mm = parseInt(order.time.split(":")[1]);
        return {
            ...order,
            time: `${hh < 10 ? `0${hh}` : hh}:${mm < 10 ? `0${mm}` : mm}`,
        };
    };

    return (
        <OrdersTabsContainer title={'DECLINED ORDERS'} content={loading ? (
            <CircularProgress/>
        ) : orders.length >
        0 ? (
            <div className="orders">
                {orders.map((order, index) => {
                    return <OrderCard order={order} index={index}/>
                })}
            </div>
        ) : (
            <div className="no_content">
                <p>No Orders</p>
            </div>
        )}/>
    );
}

export default OrdersDeclined;
