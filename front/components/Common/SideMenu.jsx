import React, {useCallback, useRef, useState, useContext} from 'react';
import Image from 'next/image'
import styled from '@emotion/styled'

import sideMenuOrder from '../../public/images/side-menu-order.svg';
import sideMenuHistory from '../../public/images/side-menu-history.svg';
import {GlobalContext} from "../../utils/contexts/GlobalProvider";

const SideMenuContainer = styled.div`
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  z-index: 1;
  position: fixed;
  top: 48px;
  right: 0;
  bottom: 0;
  left: 0;
  //background: red;
`;

const SideMenuBackground = styled.div`
  z-index: 10;
  position: fixed;
  top: 48px;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .84);
  opacity: ${props => props.show ? '1' : '0'};
  transition: all .25s ease-out;
`;

const SideMenuWindow = styled.div`
  z-index: 100;
  position: fixed;
  top: 48px;
  bottom: 0;
  left: 0;
  width: 270px;
  min-width: 270px;
  border-top: 1px solid var(--color-e1e1e1);
  background-color: var(--color-white);
  //opacity: ${props => props.show ? '1' : '0'};
  transition: all .5s ease-out;
  transform: translateX(${props => props.show ? '0' : '-100%'});
`;

const SideMenuItemWrap = styled.button`
  width: 100%;
  height: 90px;
  padding-left: 20px;
  
  .side-menu-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    padding-left: 10px;
  }
  
  &:not(:first-of-type) {
    .side-menu-item {
      border-top: 1px solid #e1e1e1;
    }
  }
`;

const SideMeneTitle = styled.span`
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.6;
`;

function SideMenu({ show, onToggle }) {
  const menuBack = useRef();
  const sideMenus = useRef([
    { id: 0, title: '주문하기', img: sideMenuOrder, onClick: () => test()},
    { id: 1, title: '주문내역 조회', img: sideMenuHistory, onClick: () => test()},
  ]);
  const {isSideMenu, setIsSideMenu} = useContext(GlobalContext);

  const test = useCallback(() => {
    alert('조금만 기다려주세요.')
  }, [])

  const onClickBackground = useCallback((e) => {
    if (e.target === menuBack.current) {
      setIsSideMenu(false)
    }
  }, [])

  return (
    <SideMenuContainer show={isSideMenu}>
      <SideMenuBackground show={isSideMenu} ref={menuBack} onClick={onClickBackground}/>
      <SideMenuWindow show={isSideMenu}>
        {sideMenus.current.map((item) => (
          <SideMenuItemWrap key={item.id} onClick={item.onClick}>
            <div className="side-menu-item">
              <Image
                src={item.img}
                width={30}
                height={33}
              ></Image>
              <SideMeneTitle>{item.title}</SideMeneTitle>
            </div>
          </SideMenuItemWrap>
        ))}
      </SideMenuWindow>
    </SideMenuContainer>
  )
}

export default SideMenu;