import React, {useEffect, useState} from "react";
import {ReactComponent as DateIcon} from "../../../assets/icons/dateIcon.svg";
import {ReactComponent as PriceIcon} from "../../../assets/icons/priceIcon.svg";
import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";

const moment = require('moment'); // require

function OrderCard({order, handleChangeStatusOrder, index}) {

    const isOrderDeclined = (order) => order.status === "DECLINED";
    const isOrderAccepted = (order) => order.status === "ACCEPTED";

    const hideActionButtons = () => isOrderDeclined(order) || isOrderAccepted(order);

    console.log(hideActionButtons)
    return <Card sx={{minWidth: 500}}>
        <CardContent style={isOrderDeclined(order) ? {
            background: '#ff9494'
        } : {}}>
            < Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                <div className="date" style={{display: "flex"}}>
                    <DateIcon style={{
                        marginRight: '16px'
                    }}/>
                    <p style={{
                        marginRight: '16px'
                    }}>{moment(order.date).format('DD MM YYYY')}</p>
                    <p>{order.time}</p>

                </div>
            </Typography>
            <Typography variant="h6" component="div">
                <p>{order.carType ?? "Седан"}</p>
                <p>{order.serviceType ?? "Эконом"}</p>
            </Typography>
            <div
                className="cost"
                style={{display: "flex", alignItems: "center"}}
            >
                <PriceIcon style={{
                    marginRight: '10px',

                }
                }/>
                <p style={{
                    color: 'green'
                }}>{order.price}tg</p>
            </div>
        </CardContent>
        {
            hideActionButtons() ? null :
                <CardActions>
                    <Button style={{
                        color: 'red'
                    }} size="small" onClick={() => {
                        handleChangeStatusOrder(index, "DECLINED", order);
                    }}>Decline</Button>
                    <Button variant="contained" color="primary" size="small" onClick={() => {
                        handleChangeStatusOrder(index, "ACCEPTED", order);
                    }}>Accept</Button>
                </CardActions>}
    </Card>;
}

export default OrderCard;
