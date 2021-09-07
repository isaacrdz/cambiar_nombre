import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  baseURL = "https://8523-2806-2f0-4041-fd66-18b8-9cd6-f2ec-3a07.ngrok.io/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
