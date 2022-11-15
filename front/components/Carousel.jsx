import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import {addDragEvent} from "../uitils/dragEvent";

const CarouselContainer = styled.div`
  width: 100%;
  aspect-ratio: 18/17;
  overflow: hidden;
  
  .slider {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform .125s;
    
    .item {
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    
  }
`;

function Carousel({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const viewer = useRef();

  const onSlider = useCallback((deltaX) => {
    console.dir(viewer.current.clientWidth)
    const viewerWidth = viewer.current.clientWidth;
    const moveWidth = parseInt(viewerWidth/4)

    if (deltaX < -moveWidth) {
      setCurrentIndex(prev => prev - 1)
    } else if (deltaX > moveWidth) {
      setCurrentIndex(prev => prev + 1)
    }

    setTransX(0);
  }, [viewer])

  // useEffect(() => {
  //   const dataLength = data?.length;
  //
  //   const autoSlider = setInterval(() => {
  //     setCurrentIndex(prev =>{
  //       const next = prev + 1;
  //
  //       if (next >= dataLength) {
  //         return 0;
  //       }
  //
  //       return next;
  //     })
  //   }, 4*1000)
  //
  //   return () => clearInterval(autoSlider);
  // }, [data])

  useEffect(() => {
    // addDragEvent();
  }, [addDragEvent])


  return (
    <CarouselContainer>
      <div
        className="slider" style={{ transform: `translateX(calc(${currentIndex*100}% + ${transX}px))` }}
        ref={viewer}
        {...addDragEvent({
          onDrag: (deltaX) => {
            console.log(transX)
            setTransX(deltaX)

          },
          onDragEnd: (deltaX) => {
            console.log(deltaX)
            onSlider(deltaX);
          }
        })}
      >
        {data.map((item, index) => (
          <img className="item" key={index} src={item.ad_img} alt="carousel image" draggable={false} />
        ))}
      </div>
    </CarouselContainer>
  )
}

export default Carousel;