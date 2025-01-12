import axios from "axios";

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: "https://poetry-backend-dbt3.onrender.com", // Set your backend URL here
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
