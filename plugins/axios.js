import axios from "axios";

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000", // Set your backend URL here
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
