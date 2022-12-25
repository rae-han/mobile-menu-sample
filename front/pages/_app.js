import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { QueryClient, QueryClientProvider} from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import wrapper from '../store/configureStore'
import GlobalContextProvider from "../utils/contexts/GlobalProvider";

import '../public/stylesheets/reset.scss'
import '../public/stylesheets/normalize.scss'
import '../public/stylesheets/common.scss'
import '../public/stylesheets/global.scss'

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {

  return (
    <>
      <Head>`
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Menu-mobile</title>
      </Head>
      <GlobalContextProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools></ReactQueryDevtools>
          <Component {...pageProps}/>
        </QueryClientProvider>
      </GlobalContextProvider>
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default wrapper.withRedux(App);
// export default wrapper.withRedux(CommonComponent);
// 여기서 페이지들의 공통된 부분을 담당한다.
// 다른 파일들의 리턴이 Component에 들어가서 리턴된다.
