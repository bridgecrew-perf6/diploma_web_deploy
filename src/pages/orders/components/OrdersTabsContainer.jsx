import React from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as InboxIcon} from "../../../assets/icons/inbox.svg";
import {ReactComponent as AcceptedOrdersIcon} from "../../../assets/icons/acceptedOrder.svg";
import {ReactComponent as DeclinedOrdersIcon} from "../../../assets/icons/declinedOrder.svg";
import DefaultPage from "../../components/DefaultPage";

function OrdersTabsContainer({ title, content }) {
    return (
        <DefaultPage>
            <div className="cabinet__profile" style={{display: "flex"}}>
                <div className="tabs" style={{
                    marginLeft: '24px',
                    marginRight: '36px'
                }}>
                    <Link to="/orders/inbox" style={{textDecoration: "none"}}>
                        <div className="tab-item ">
                            <InboxIcon/>
                            <p>INBOX</p>
                        </div>
                    </Link>
                    <Link to="/orders/accepted" style={{textDecoration: "none"}}>
                        <div className="tab-item active">
                            <AcceptedOrdersIcon/>
                            <p>ORDERS ACCEPTED</p>
                        </div>
                    </Link>
                    <Link to="/orders/declined" style={{textDecoration: "none"}}>
                        <div className="tab-item">
                            <DeclinedOrdersIcon/>
                            <p>ORDERS DECLINED</p>
                        </div>
                    </Link>
                </div>
                <div className="content" >
                    <div className="title" style={{
                        margin: '50px 0 50px 0'
                    }}>{title}</div>
                    {content}
                </div>
            </div>
        </DefaultPage>);
}

export default OrdersTabsContainer;