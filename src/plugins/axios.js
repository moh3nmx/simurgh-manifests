import axios from "axios";

import * as configs from "./apiconfig";
const authenticateUrl = `${configs.Users}authenticate`;

export const login = async () => {
  try {
    const data = await axios.post(authenticateUrl, {
      username: "superAdmin",
      password: "superAdmin1@3",
    });
    localStorage.setItem('user.id', data.id);
    localStorage.setItem('user.firstName', data.firstName);
    localStorage.setItem('user.lastName', data.lastName);
    localStorage.setItem('user.username', data.username);
    localStorage.setItem('user.token', 'Bearer ' + data.token);
  } catch (e) {
    console.log(e);
  }
};

axios.interceptors.request.use(
  async (request) => {
    if (request.url.indexOf(authenticateUrl) < 0) {
      if (!localStorage.getItem("user.token")) {
        localStorage.clear();
        await login();
      }
      const token = localStorage.getItem("user.token");
      request.headers.Authorization = token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data || response
  },
  async (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.clear();
      await login();

      return axios.request(error.config);
    }

    return Promise.reject(error);
  }
);
