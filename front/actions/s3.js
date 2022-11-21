import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backUrl } from "../config/config";
import {fetchStoreInfo, fetchSettings, fetchBanners, fetchCategories, fetchMenus} from "../apis/store";
import s3 from "../apis/s3";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true; // front, backend 간 쿠키 공유

export const uploadFile = createAsyncThunk('s3/uploadImage', async (params, thunkAPI) => {
  try {
    const response = await s3.uploadFile(params)
    console.log(response)
  } catch (error) {

  }
})