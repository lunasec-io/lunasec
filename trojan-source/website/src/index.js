import React from "react";
import { hydrate, render } from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css";
// pages
import Index from "views/Index.js";
// others

const app = <BrowserRouter>
              <Switch>
                <Route path="/" render={(props) => <Index {...props} />} />
                <Redirect to="/" />
              </Switch>
            </BrowserRouter>;

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
}