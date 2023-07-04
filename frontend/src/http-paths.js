import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/all/",
  headers: {
    "Content-type": "application/json"
  }
});