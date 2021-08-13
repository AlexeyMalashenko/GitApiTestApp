import React from "react"
import './App.less'
import {useDispatch} from "react-redux"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import Error from "./main/Error"
import Card from "./card/Card";
import Main from "./main/Main"

const App = () => {
    const dispatch = useDispatch()

    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route path="/card/:username/:reponame" component={Card}/>
                    <Route path="/error" component={Error}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;