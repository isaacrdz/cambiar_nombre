import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  baseURL = "https://f1a8-2806-2f0-4060-47c-c075-2ff2-7385-7651.ngrok.io/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
