import React from 'react';
import {useRouter} from "next/router";
import wrapper from "../../store/configureStore";
import DefaultLayout from "../../layouts/DefaultLayout";
import Carousel from "../../components/Carousel";
import SlideMenu from "../../components/SlideMenu";
import MenuList from "../../components/MenuList";
import {useDispatch, useSelector} from "react-redux";
import {loadBanners, loadCategories, loadMenus, loadSettings, loadStoreInfo} from "../../actions/store";

function Home({ storeId, categoryId }) {
  const router = useRouter();
  // const dispatch = useDispatch();
  const { storeInfo, settings, banners, categories, menus } = useSelector((state) => state.store)

  if(!storeInfo || !settings || !banners || !categories) {
    return <span>loading</span>
  }

  return (
    <DefaultLayout title>
      <Carousel list={storeInfo?.ad_list} />
      <SlideMenu menu={categories} categoryId={categoryId} />
      <MenuList menus={menus} />
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, params, ...rest}) => {
  console.log('\x1b[31m#### /m/[storeId].js \x1b[0m')
  const { storeId } = params;
  console.log(storeId);

  await store.dispatch(loadStoreInfo(storeId));
  await store.dispatch(loadSettings(storeId));
  await store.dispatch(loadBanners(storeId));
  await store.dispatch(loadCategories(storeId));

  const { category_id: categoryId } = store.getState()?.store?.categories[0]
  await store.dispatch(loadMenus({ storeId, categoryId }))

  return {
    props: {
      storeId,
      categoryId,
    }
  }
})

export default Home;
