import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  baseURL = "http://192.168.3.3:5000/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
