import React, {useRef, Suspense} from 'react';
import {useRouter} from "next/router";
const TestComponent = React.lazy(() => import('../components/TestComponent'))

function Test() {
  const router = useRouter();

  // const fakerData = useRef(Array.from({ length: 10000 }).map((_, index) => ({ fakerKey: `${index}_abcxyz`})))
  //
  // const size = 4000;
  //
  // console.log(Math.ceil(fakerData.current.length/size))
  // console.log(Array.from({ length: Math.ceil(fakerData.current.length/size)}).map((_, index) => Array.from({ length: size})))
  //
  // const newFakerData = fakerData.current.reduce((acc, cur, idx) => {
  //   console.log(acc[idx])
  //   // acc[idx] = [...acc[idx], cur]
  //   return acc;
  // }, Array.from({ length: Math.ceil(fakerData.current.length/size)}).map((_, index) => Array.from({ length: size})))
  //
  // console.log(newFakerData)

  const fakerData = Array.from({ length: 40 }).map((_, idx) => Array.from({ length: 4000}).map((_v, _idx) => ({ key: `${idx}_${_idx}_abcxyz`})))
  console.log(fakerData)


  return (
    <>
      <button onClick={() => router.push(`/m/2EE81511`)}>move!</button>
      {/*{ fakerData.current && fakerData.current.map((d) => (<div key={d.fakerKey}>{d.fakerKey}</div>))}*/}
      {/*<Suspense fallback={(() => <p>loading</p>)()}>*/}
        {fakerData.map((d, i) => (
          <Suspense fallback={(() => <p>loading</p>)()}>
            <TestComponent data={d} key={i}></TestComponent>
          </Suspense>
        ))}
      {/*</Suspense>*/}
    </>
  )
}

export default Test;