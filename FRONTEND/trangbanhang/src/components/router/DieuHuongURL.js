import React, { Component } from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Client from './../trangbanhangconponents/Client';

class DieuHuongURL extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route component={Client} path="/">
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default DieuHuongURL;