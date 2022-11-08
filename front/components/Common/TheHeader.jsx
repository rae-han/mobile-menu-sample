import React, {useCallback, useRef, useState} from 'react';
import Image from 'next/image'
import styled from '@emotion/styled'

import hamburger from '../../public/images/controls-buttons-nav-more-style-1-nor.svg'
import cart from '../../public/images/controls-buttons-nav-cart-style-1-nor.svg'
import SideMenu from "./SideMenu";

const HeaderContainer = styled.header`
  display: flex;
  flex-grow: 0;
  justify-content: space-between;
  align-items: center;
  
  .menu {
    display: flex;
    align-items: center;
  }
`;

const TitleLeft = styled.span`
  background-color: green;
`;

const TitleCenter = styled.span`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: red;
`

const CartWrap = styled.div`
  position: relative;
  
  .count {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 19px;
    left: 19px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    background-color: var(--color-main);
    color: var(--color-white);
  }
`;

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

function Header() {
  const [isSideMenu, setIsSideMenu] = useState(false)
  const menuBack = useRef();

  const onClickBackground = useCallback((e) => {
    if (e.target === menuBack.current) {
      setIsSideMenu(false)
    }
  }, [])

  return (
    <HeaderContainer>
      <div className="menu left">
        <Image
          src={hamburger}
          alt="menu"
          width={47}
          height={45}
          onClick={() => setIsSideMenu(prev => !prev)}
        ></Image>
        <SideMenu show={isSideMenu} onToggle={setIsSideMenu}></SideMenu>
        <TitleLeft>왼쪽 제목</TitleLeft>
      </div>
      <TitleCenter>중앙 제목</TitleCenter>
      <div className="menu right">
        <CartWrap>
          <Image
            src={cart}
            alt="menu"
            width={47}
            height={45}
            onClick={() => console.log(123123)}
          ></Image>
          <span className="count">123</span>
        </CartWrap>
      </div>
    </HeaderContainer>
  )
}

export default Header