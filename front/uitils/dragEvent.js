const isTouchScreen =
  typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

export function addDragEvent({
  onDragStart,
  onDrag,
  onDragEnd,
  stopPropagation = true,
} = {
  onDragStart: () => console.error('Not found onDragStart Event Function'),
  onDrag: () => console.error('Not found onDrag Event Function'),
  onDragEnd: () =>  console.error('Not found onDragEnd Event Function'),
}) {
  if (isTouchScreen) {
    return {
      onTouchStart: (touchEvent) => {
        console.log(touchEvent.target)
        console.log('touchEvent')
        if (stopPropagation) {
          touchEvent.stopPropagation(); // click 이벤트 전파 방지
        }

        onDragStart();

        const touchMoveHandler = (moveEvent) => {
          console.log('moveEvent.cancelable', moveEvent.cancelable);
          if (moveEvent.cancelable) {
            moveEvent.preventDefault(); // 터치 이벤트시 스크롤 작동 안하게.
          }
          const deltaX = moveEvent.touches[0].pageX - touchEvent.touches[0].pageX;
          const deltaY = moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;

          console.log('touchmove', deltaX, deltaY)
          onDrag(deltaX, deltaY)
        }
        document.addEventListener('touchmove', touchMoveHandler, { passive: false });

        const touchEndHandler = (endEvent) => {
          const deltaX = endEvent.changedTouches[0].pageX - touchEvent.changedTouches[0].pageX;
          const deltaY = endEvent.changedTouches[0].pageY - touchEvent.changedTouches[0].pageY;

          console.log('touchend', deltaX, deltaY)
          onDragEnd(deltaX, deltaY)
          document.removeEventListener('touchmove', touchMoveHandler)
        }
        document.addEventListener('touchend', touchEndHandler, { once: true });

      }
    }
  } else {
    return {
      onMouseDown: (downEvent) => {
        console.log('mousedown')
        if (stopPropagation) {
          downEvent.stopPropagation(); // click 이벤트 전파 방지
        }

        onDragStart();

        const mouseMoveHandler = (moveEvent) => {
          const deltaX = moveEvent.pageX - downEvent.pageX;
          const deltaY = moveEvent.pageY - downEvent.pageY;

          console.log('mousemove', deltaX, deltaY)
          onDrag(deltaX, deltaY)
        }
        document.addEventListener('mousemove', mouseMoveHandler);

        const mouseUpHandler = (upEvent) => {
          const deltaX = upEvent.pageX - downEvent.pageX;
          const deltaY = upEvent.pageY - downEvent.pageY;

          console.log('mouseup', deltaX, deltaY)
          onDragEnd(deltaX)
          document.removeEventListener('mousemove', mouseMoveHandler)
        }
        document.addEventListener('mouseup', mouseUpHandler, { once: true });

      }
    }
  }
}