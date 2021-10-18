import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  baseURL = "https://ffa8-2806-2f0-4060-9f54-f5de-80b-6f03-d6ac.ngrok.io/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
