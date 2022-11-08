import React from 'react';
import {useQuery} from "react-query";


function Home() {
  const { isLoading, isError, data, error } = useQuery("", )

  return (
    <div>home</div>
  )
}

export default Home;