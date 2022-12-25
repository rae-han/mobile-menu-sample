import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import {addDragEvent} from "../../utils/dragEvent";

const CarouselContainer = styled.div`
  width: 100%;
  aspect-ratio: 18/17;
  overflow: hidden;
  
  .slider {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 125ms;
    
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
  const [intervalId, setIntervalId] = useState(null)
  const viewer = useRef();

  const onSlider = useCallback((deltaX) => {
    const viewerWidth = viewer.current.clientWidth;
    const moveWidth = parseInt(viewerWidth/4)

    if (deltaX < -moveWidth) {
      setCurrentIndex(prev => prev + 1)
    } else if (deltaX > moveWidth) {
      setCurrentIndex(prev => prev - 1)
    }
    setTransX(0);
  }, [viewer])

  const startInterval = useCallback(() => {
    const id = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= data.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 1_000)

    console.log('set interval id', id)

    setIntervalId(id);

    return id;
  }, [currentIndex])

  const endInterval = useCallback(() => {
    console.log('intervalId', intervalId)
    clearInterval(intervalId);
  }, [intervalId])

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = startInterval();

    return () => clearInterval(id);
  }, [data])


  return (
    <CarouselContainer>
      <div
        className="slider" style={{ transform: `translateX(calc(${-currentIndex*100}% + ${transX}px))` }}
        ref={viewer}
        {...addDragEvent({
          onDragStart: () => {
            endInterval();
          },
          onDrag: (deltaX) => {
            console.log(transX)
            setTransX(deltaX)

          },
          onDragEnd: (deltaX) => {
            console.log(deltaX)
            onSlider(deltaX);
            startInterval();
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