import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image'
import {commaNumber} from "../filters/commaNumber";

const MenuItemContainer = styled.div`
  flex-basis: 50%;
  //width: 50%;
  padding: 3px;
  
  //&:not(:nth-of-type(1), :nth-of-type(2)) {
  //  margin-top: 6px;
  //}
`;

const MenuItemWrap = styled.div`
  background-color: var(--color-white);

  &:active {
    background-color: var(--color-f7f7f7);
  }
`;

const ImageWrap = styled.div`
  aspect-ratio: 1/1;
  padding: 10px 9px 8px;
  
  .image {
    width: 100%;
    height: 100%;
  }
`;

const VerticalLine = styled.div`
 border-top: 1px solid var(--color-f7f7f7);
`;

const TextWrap = styled.div`
  padding: 9px 11px 11px;
  
  .name {
    font-size: 13px;
    font-weight: bold;
    color: var(--color-666);
    line-height: 24px;
  }
  .price {
    display: flex;
    align-items: center;
    height: 26px;
    margin-top: 2px;
    
    .original-price {
      margin-right: 8px;
      font-size: 0.75rem;
      color: var(--color-brown-gray);
      line-height: 18px;
      text-decoration: line-through;
    }
    .actual-price {
      font-size: 15px;
      color: var(--color-424242);
      line-height: 26px;
      font-weight: bolder;
    }
  }
`;

function MenuItem({ menu }) {
  return (
    <MenuItemContainer>
      <MenuItemWrap>
        <ImageWrap>
          <div className="image" style={{ backgroundImage: `url("${menu.menu_img}")`}}></div>
        </ImageWrap>
        <VerticalLine />
        <TextWrap>
          <h3 className="name">{menu.menu_name}</h3>
          <p className="price">
            {menu.dc_price !== 0 && <span className="original-price">{commaNumber(menu.dc_price + menu.price)} 원</span>}
            <span className="actual-price">{commaNumber(menu.price)} 원</span>
          </p>
        </TextWrap>
      </MenuItemWrap>
    </MenuItemContainer>
  )
}

export default MenuItem;