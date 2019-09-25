import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import LCC from 'lightning-container';

//This block can be turned on/off for local debugging with the Aura component sending down quote line data
/*
import quoteLineMockData from './quoteLineData'
const message = {
    rows: quoteLineMockData
}
ReactDOM.render(<App rows={message.rows}/>, document.getElementById("app"));
*/

LCC.addMessageHandler(function(message) {
    debugger
    //This message handler receives quote line data from the host Lightning Container Component
    console.log('message', message)
    ReactDOM.render(<App rows={message.rows}/>, document.getElementById("app"));
});

