import React, {useEffect} from 'react';
import {useRouter} from "next/router";
// import {dehydrate, QueryClient, useQueries, useQuery} from "react-query";
import wrapper from "../../store/configureStore";
import DefaultLayout from "../../layouts/DefaultLayout";
// import {fetchBanner, fetchCategories, fetchMenus, fetchSettings, fetchStoreInfo} from "../../apis/store";
import Carousel from "../../components/Carousel";
import SlideMenu from "../../components/SlideMenu";
import MenuList from "../../components/MenuList";
import {useDispatch, useSelector} from "react-redux";
import {loadBanners, loadCategories, loadMenus, loadSettings, loadStoreInfo} from "../../actions/store";

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { storeId } = router.query;
  const { storeInfo, settings, banners, categories, menus } = useSelector((state) => state.store)

  // const { data: storeInfo } = useQuery(['storeInfo', storeId], ({ queryKey }) => fetchStoreInfo(queryKey[1]));
  // const { data: settings } = useQuery(['settings', storeId], () => fetchSettings(storeId));
  // const { data: banners } = useQuery(['banners', storeId], () => fetchBanner(storeId));
  // const { data: categories } = useQuery(['categories', storeId], () => fetchCategories(storeId));
  // const { data: menus } = useQuery(['menus', storeId], () => fetchMenus({storeId, categoryId: categories[0].category_id}), {
  //   enabled: !!categories
  // });

  // useEffect(() => {
  // dispatch(loadStoreInfo(storeId));
  // dispatch(loadSettings(storeId));
  // dispatch(loadBanners(storeId));
  // dispatch(loadCategories(storeId));
  // }, [dispatch, storeId]);

  // useEffect(() => {
  //   if(!categories) {
  //     return;
  //   }
  //
  //   dispatch(loadMenus({ storeId, categoryId: categories[0]?.category_id}))
  // }, [dispatch, categories])

  // if(!storeInfo || !settings || !banners || !categories || !menus) {
  //   return <span>loading</span>;
  // }

  if(!storeInfo || !settings || !banners || !categories) {
    return <span>loading</span>
  }

  return (
    <DefaultLayout title>
      <Carousel list={storeInfo?.ad_list} />
      <SlideMenu menu={categories}/>
      <MenuList menus={menus} />
    </DefaultLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, params, ...rest}) => {
  console.log('\x1b[31m#### /m/[storeId].js \x1b[0m')
  // const queryClient = new QueryClient();
  const { storeId } = params;
  console.log(storeId);

  // await queryClient.prefetchQuery(['storeInfo', storeId], () => fetchStoreInfo(storeId));
  // await queryClient.prefetchQuery(['settings', storeId], () => fetchSettings(storeId))
  // await queryClient.prefetchQuery(['banners', storeId], () => fetchBanner(storeId))
  // await queryClient.prefetchQuery(['categories', storeId], () => fetchCategories(storeId))
  // await queryClient.prefetchQuery(['menus', storeId], () => fetchMenus({storeId}))

  // console.log(queryClient.getQueriesData('storeInfo'));
  // console.log(queryClient.getQueriesData('settings'));

  await store.dispatch(loadStoreInfo(storeId));
  await store.dispatch(loadSettings(storeId));
  await store.dispatch(loadBanners(storeId));
  await store.dispatch(loadCategories(storeId));

  const { category_id: categoryId } = store.getState()?.store?.categories[0]
  await store.dispatch(loadMenus({ storeId, categoryId }))

  return {
    props: {
      storeId,
      // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    }
  }
})

export default Home;
