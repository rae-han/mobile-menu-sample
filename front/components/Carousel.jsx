import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';


const CarouselContainer = styled.div`
  width: 100%;
  aspect-ratio: 18/17;
  overflow: hidden;
  
  .list {
    width: 100%;
    height: 100%;
    display: flex;
    transition: margin-left .125s;
    
    .item {
      flex: none;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
`;

function Carousel({ list }) {
  const [pointer, setPointer] = useState(0)

  useEffect(() => {
    const length = list.length;

    if(length === 1) {
      return;
    }

    const walker = setInterval(() => {
      setPointer(prev =>{
        const next = prev + 1;

        if (next >= length) {
          return 0;
        }

        return next;
      })
    }, 4*1000);

    return () => clearInterval(walker)
  }, [list])

  return (
    <CarouselContainer>
      <div className="list" style={{ marginLeft: `-${pointer}00%`}}>
        {list && list.map((item, index) => <div className="item" key={index} style={{backgroundImage: `url('${item.ad_img}')`}}></div>)}
      </div>

    </CarouselContainer>
  )
}

export default Carousel;
