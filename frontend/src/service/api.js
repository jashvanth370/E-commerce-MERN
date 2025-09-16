// frontend/src/service/api.js
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

export function useApi() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const api = useMemo(() => {
    const instance = axios.create({ baseURL: "http://localhost:8089/api", withCredentials: true });

    instance.interceptors.request.use(async (config) => {
      // Add Auth0 token if authenticated
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Fetch CSRF token from backend
      try {
        const csrf = await axios.get("http://localhost:8089/api/csrf-token", { withCredentials: true });
        config.headers["X-CSRF-Token"] = csrf.data.csrfToken;
      } catch (err) {
        console.error("Error fetching CSRF token", err);
      }

      return config;
    });

    return instance;
  }, [getAccessTokenSilently, isAuthenticated]);

  return api;
}
