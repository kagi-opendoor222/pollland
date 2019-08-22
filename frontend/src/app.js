import React from "react"
import ReactDOM from "react-dom"

const axios = require("axios")
const url = "http://localhost:4000/welcome";
axios.get(url).then(res => {
  console.log(res)
})

ReactDOM.render(
  <div>Hello, React!</div>,
  document.getElementById("root")
)