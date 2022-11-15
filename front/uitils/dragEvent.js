const isTouchScreen =
  typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

export function addDragEvent({
  onDrag,
  onDragEnd,
} = {
  onDrag: () => console.error('Not found onDrag Event Function'),
  onDragEnd: () =>  console.error('Not found onDragEnd Event Function'),
}) {
  if (isTouchScreen) {
    console.log('mobile')
    return {
      onTouchStart: (touchEvent) => {
        const touchMoveHandler = (moveEvent) => {
        }
      }
    }
  } else {
    return {
      onMouseDown: (downEvent) => {
        console.log('mousedown')

        const mouseMovehHandler = (moveEvent) => {
          const deltaX = moveEvent.pageX - downEvent.pageX;
          const deltaY = moveEvent.pageY - downEvent.pageY;

          console.log('mousemove', deltaX, deltaY)
          onDrag(deltaX, deltaY)
        }
        document.addEventListener('mousemove', mouseMovehHandler);

        const mouseUpHandler = (upEvent) => {
          const deltaX = upEvent.pageX - downEvent.pageX;
          const deltaY = upEvent.pageY - downEvent.pageY;

          console.log('mouseup', deltaX, deltaY)
          onDragEnd(deltaX)
          document.removeEventListener('mousemove', mouseMovehHandler)
        }
        document.addEventListener('mouseup', mouseUpHandler, { once: true });

      }
    }
  }
}