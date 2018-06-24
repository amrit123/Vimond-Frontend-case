import React, { Component } from 'react'
import ReactDOM from "react-dom";
import Header from "./components/Header"
import AssetsList from "./components/AssetsList"

import "normalize.css/normalize.css"; //makes browser render all elements more consistently and in line to modern standerd. alternative to css resets
import "./styles/styles.scss" //scss library  allows us to use features like  variable. need to be configure in webpack


class App extends Component {

    render() {
        return (
            <div>
            <Header />
                <AssetsList />
            </div>
        )
    }
}




ReactDOM.render(<App />, document.getElementById("app"));

