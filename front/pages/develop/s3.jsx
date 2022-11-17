import React, {useCallback, useRef} from 'react';
import wrapper from "../../store/configureStore";
import {loadBanners, loadCategories, loadMenus, loadSettings, loadStoreInfo} from "../../actions/store";
import {uploadFile} from "../../actions/s3";
import {useDispatch} from "react-redux";

function s3 () {
  const dispatch = useDispatch();

  const file = useRef()
  const onChange = useCallback(() => {
    console.log(file.current?.files[0])
    const inputFile = file.current?.files[0]
    dispatch(uploadFile(inputFile))
  }, [file])

  return (
    <form>
      <input
        type="file"
        placeholder="file"
        onChange={onChange}
        ref={file}
      />
    </form>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, res, params, ...rest}) => {
  console.log('\x1b[31m#### /develop/s3.js \x1b[0m')


  return {
    props: {
    }
  }
})

export default s3;