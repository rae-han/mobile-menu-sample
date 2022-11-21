import React, {useCallback, useRef} from 'react';
import wrapper from "../../store/configureStore";
import {loadBanners, loadCategories, loadMenus, loadSettings, loadStoreInfo} from "../../actions/store";
import {uploadFile} from "../../actions/s3";
import {useDispatch} from "react-redux";

function s3 () {
  const dispatch = useDispatch();

  const file = useRef()
  const onChange = useCallback((e) => {
    console.log(file.current?.files[0])
    const inputFile = file.current?.files[0]
    dispatch(uploadFile({
      file: inputFile,
      options: { resize: true, grey: true },
      resizeConfig: { width: 200 },
    }))
  }, [file])

  return (
    <>
      <form onSubmit={(e) => {e.preventDefault()}}>
        <input
          type="file"
          placeholder="file"
          onChange={onChange}
          ref={file}
        />
        <button onClick={onChange}>보내기</button>
      </form>
      <img src={`https://raehan-test.s3.ap-northeast-2.amazonaws.com/1669002497478.png`} alt="image"/>
    </>
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