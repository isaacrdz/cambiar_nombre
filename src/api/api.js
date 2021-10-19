import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  baseURL = "https://5882-2806-2f0-4041-d9fd-1cd3-c8d1-dbdd-f33c.ngrok.io/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
