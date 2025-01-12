import axios from "axios";

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: "https://poetry-backend-mongo.onrender.com", // Set your backend URL here
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
