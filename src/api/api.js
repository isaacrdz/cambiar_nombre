import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "http://localhost:5000/api/v1";
} else {
  baseURL = "http://localhost:5000/api/v1";
}

export default axios.create({
  baseURL: baseURL,
});
