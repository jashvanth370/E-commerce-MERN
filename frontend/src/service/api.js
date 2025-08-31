// frontend/src/service/api.js
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

export function useApi() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const api = useMemo(() => {
    const instance = axios.create({ baseURL: "http://localhost:8089/api" });
    instance.interceptors.request.use(async (config) => {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return instance;
  }, [getAccessTokenSilently, isAuthenticated]);

  return api;
}

axios.interceptors.request.use(async (config) => {
  if (isAuthenticated) {
    const token = await getAccessTokenSilently();
    config.headers.Authorization = `Bearer ${token}`;

    // fetch CSRF token from backend
    const csrf = await axios.get("http://localhost:8089/api/csrf-token", { withCredentials: true });
    config.headers["X-CSRF-Token"] = csrf.data.csrfToken;
  }
  return config;
});
