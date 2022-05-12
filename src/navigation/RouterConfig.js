import React from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import {history} from "../history";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import PrivateRoute from "./PrivateRoute";
import OrdersSchedule from "../pages/orders/OrdersSchedule";
import OrdersInbox from "../pages/orders/OrdersInbox";
import OrdersAccepted from "../pages/orders/OrdersAccepted";
import OrdersDeclined from "../pages/orders/OrdersDeclined";
import Profile from "../pages/cabinet/Profile";
import Reviews from "../pages/cabinet/Reviews";
import Services from "../pages/services/Services";

function RouterConfig() {
    return (
        <Router history={history}>
            <div style={{height: "100vh"}}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login"/>
                    </Route>
                    <Route path="/register">
                        <SignUp/>
                    </Route>
                    <Route path="/login">
                        <SignIn/>
                    </Route>

                    <Route exact path="/orders">
                        <Redirect to="/orders/schedule" />
                    </Route>
                    <PrivateRoute path="/orders/schedule" component={OrdersSchedule} />
                    <PrivateRoute path="/orders/inbox" component={OrdersInbox} />
                    <PrivateRoute path="/orders/accepted" component={OrdersAccepted} />
                    <PrivateRoute path="/orders/declined" component={OrdersDeclined} />
                    <PrivateRoute path="/services" component={Services} />
                    <PrivateRoute path="/cabinet/profile" component={Profile} />
                    <PrivateRoute path="/cabinet/reviews" component={Reviews} />
                </Switch>
            </div>
        </Router>
    );
}

export default RouterConfig;
