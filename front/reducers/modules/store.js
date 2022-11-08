import { createSlice } from "@reduxjs/toolkit";
import {
  loadBanners, loadCategories, loadMenus,
  loadSettings,
  loadStoreInfo,
} from "../../actions/store";

export const initialState = {
  storeInfo: null,
  storeInfoLoading: false,
  storeInfoDone: false,
  storeInfoError: null,
  settings: null,
  settingsLoading: false,
  settingsDone: false,
  settingsError: null,
  banners: null,
  bannersLoading: false,
  bannersDone: false,
  bannersError: null,
  categories: null,
  categoriesLoading: false,
  categoriesDone: false,
  categoriesError: null,
  menus: null,
  menusLoading: false,
  menusDone: false,
  menusError: null,
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => builder
    // loadStoreInfo
    .addCase(loadStoreInfo.pending, (state, action) => {
      state.storeInfoLoading = true;
      state.storeInfoDone = false;
      state.storeInfoError = null;
    })
    .addCase(loadStoreInfo.fulfilled, (state, action) => {
      state.storeInfo = action.payload;
      state.storeInfoLoading = false;
      state.storeInfoDone = true;
      state.storeInfoError = null;
    })
    .addCase(loadStoreInfo.rejected, (state, action) => {
      state.storeInfoError = action.error.message;
      state.storeInfoLoading = false;
    })
    // loadSettings
    .addCase(loadSettings.pending, (state, action) => {
      state.settingsLoading = true;
      state.settingsDone = false;
      state.settingsError = null;
    })
    .addCase(loadSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
      state.settingsLoading = false;
      state.settingsDone = true;
      state.settingsError = null;
    })
    .addCase(loadSettings.rejected, (state, action) => {
      state.settingsError = action.error.message;
      state.settingsLoading = false;
    })
    // loadBanners
    .addCase(loadBanners.pending, (state, action) => {
      state.bannersLoading = true;
      state.bannersDone = false;
      state.bannersError = null;
    })
    .addCase(loadBanners.fulfilled, (state, action) => {
      state.banners = action.payload;
      state.bannersLoading = false;
      state.bannersDone = true;
      state.bannersError = null;
    })
    .addCase(loadBanners.rejected, (state, action) => {
      state.bannersError = action.error.message;
      state.bannersLoading = false;
    })
    // loadCategories
    .addCase(loadCategories.pending, (state, action) => {
      state.categoriesLoading = true;
      state.categoriesDone = false;
      state.categoriesError = null;
    })
    .addCase(loadCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.categoriesLoading = false;
      state.categoriesDone = true;
      state.categoriesError = null;
    })
    .addCase(loadCategories.rejected, (state, action) => {
      state.categoriesError = action.error.message;
      state.categoriesLoading = false;
    })
    // loadMenus
    .addCase(loadMenus.pending, (state, action) => {
      state.menusLoading = true;
      state.menusDone = false;
      state.menusError = null;
    })
    .addCase(loadMenus.fulfilled, (state, action) => {
      state.menus = action.payload;
      state.menusLoading = false;
      state.menusDone = true;
      state.menusError = null;
    })
    .addCase(loadMenus.rejected, (state, action) => {
      state.menusError = action.error.message;
      state.menusLoading = false;
    })
})

export default storeSlice;