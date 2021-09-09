import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  baseURL = "https://1714-2806-2f0-4041-fd66-70f8-33cf-582-26bf.ngrok.io/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
