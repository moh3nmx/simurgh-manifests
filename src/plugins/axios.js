import axios from "axios";
import Vue from 'vue'
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
    if(typeof error.config.toast !== 'boolean' || !!error.config.toast) {
      let message = 'Error while connecting to server'
      if(error.response && error.response.data && error.response.data.Message) {
        message = error.response.data.Message
      } else if(error.response && error.response.statusText) {
        message = error.response.statusText
      }
      Vue.toasted.error(message)
    }
    if (error.response.status === 401) {
      localStorage.clear();
      await login();

      return axios.request(error.config);
    }

    return Promise.reject(error);
  }
);
