import React from 'react';
import styled from "@emotion/styled";
import cn from 'classnames';

const SlideMenuContainer = styled.div`
  overflow: scroll;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  height: 48px;
  padding: 11px;

  overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  
  .item {
    flex-shrink: 0;
    padding: 4px;
    font-size: 15px;
    font-weight: bold;
    color: var(--color-666);
    
    &.active {
      color: var(--color-main);
    }
  }
`;

function SlideMenu({ menu }) {
  return (
    <SlideMenuContainer>
      {menu.map((value) => <span className={cn('item', { active: true })} key={value.category_id}>{value.category_name}</span>)}
    </SlideMenuContainer>
  )
}

export default SlideMenu;