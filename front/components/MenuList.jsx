import React from 'react';
import styled from '@emotion/styled';
import MenuItem from "./MenuItem";

const MenuListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  padding: 7px;
  background-color: var(--color-f2f2f2)
`;

function MenuList({ menus }) {
  if(!menus) {
    return (<div>loading menus!</div>)
  }

  return (
    <MenuListContainer>
        {menus.map((menu) => <MenuItem key={menu.menu_id} menu={menu} />)}
    </MenuListContainer>
  )
}

export default MenuList;