import axios from "axios";

let baseURL;
let ngrokURL =
  "https://d111-2806-2f0-4041-e08e-cce5-e29f-259a-d2d.ngrok-free.app";

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  //baseURL = "https://dealerproxapi.com/api/v1";
  baseURL = `${ngrokURL}/api/v1`;
}

export default axios.create({
  baseURL: baseURL,
});
