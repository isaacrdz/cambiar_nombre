import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://dealerproxapi.com/api/v1";
} else {
  baseURL = "https://b99a-2806-2f0-4040-ff5b-e44f-dddc-e7f4-4230.ngrok.io/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
