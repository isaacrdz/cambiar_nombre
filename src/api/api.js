import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  baseURL="https://ce95-2806-2f0-4060-2282-9532-d3a-630a-ab36.ngrok.io/api/v1"
  //  baseURL="http://192.168.3.3:5000/api/v1"
  // baseURL = "https://dealerproxapi.com/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
