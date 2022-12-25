import axios from 'axios';
import { backUrl } from "../config/config";

const instance = axios.create({
  baseURL: backUrl,
  timeout: 1000,
})

const [GET, POST] = ['GET', 'POST']

axios.defaults.baseURL = backUrl;

export function fetchStoreInfo(data) {
  console.log(123123123, axios.defaults.baseURL)
  const options = {
    method: GET,
    url: `/store/${data}`
  }

  console.log(options);
  return axios(options).then((response) => response);
}

export function fetchSettings(data) {
  // if(!data) {
  //   return;
  // }
  const options = {
    method: GET,
    url: `/store/${data}/settings`
  }
  return axios(options).then((response) => response);
}

export function fetchBanners(data) {
  // if(!data) {
  //   return;
  // }
  const options = {
    method: GET,
    url: `/store/${data}/banners`
  }
  return axios(options).then((response) => response);
}

export function fetchCategories(data) {
  const options = {
    method: GET,
    url: `/store/${data}/categories`
  }
  return axios(options).then((response) => response);
}

export function fetchMenus({ storeId, categoryId }) {
  const options = {
    method: GET,
    url: `/store/${storeId}/category/${categoryId}/menus`
  }
  return axios(options).then((response) => response);
}





