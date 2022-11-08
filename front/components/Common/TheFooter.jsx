import React from 'react';
import Image from 'next/image'
import styled from "@emotion/styled";

import operatorLogo from '../../public/images/operator-logo.svg'
import {useSelector} from "react-redux";

const FooterContainer = styled.footer`
  .store-info {
    padding: 20px;
    font-size: 12px;
    background-color: var(--color-212121);
    color: var(--color-999);
    line-height: 1.5;
    
    .row {
      display: flex;
      
      &:not(:first-of-type) {
        margin-top: 6px;
      }

      .title {
        flex-basis: 54px;
        flex-shrink: 0;
      }
      
      .content {
        margin-left: 45px;
      }
    }
  }
  
  .operator-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    background-color: var(--color-black);
    
    .term-list {
      .term-item {
        height: 20px;
        font-size: 12px;
        color: var(--color-white);
      }
    }
  }
`;

function Footer() {
  const { storeInfo } = useSelector(state => state.store)

  if (!storeInfo) {
    return (<div>loading footer!</div>)
  }

  return (
    <FooterContainer>
      <div className="store-info">
        <div className="row">
          <span className="title">매장명</span>
          <div className="content"><p>{storeInfo.store_name}</p></div>
        </div>
        <div className="row">
          <span className="title">주소</span>
          <div className="content">
            <p>{storeInfo.addr1}</p>
            <p>{storeInfo.addr2}</p>
          </div>
        </div>
        <div className="row">
          <span className="title">대표자명</span>
          <div className="content"><p>{storeInfo.ceo_name}</p></div>
        </div>
        <div className="row">
          <span className="title">전화번호</span>
          <div className="content"><p>{storeInfo.phone_no}</p></div>
        </div>
        <div className="row">
          <span className="title">사업자번호</span>
          <div className="content"><p>{storeInfo.business_no}</p></div>
        </div>
        <div className="row">
          <span className="title">영업정보</span>
          <div className="content">
            <p>{storeInfo.open_start_time} ~ {storeInfo.open_end_time}</p>
            {
              storeInfo.break_start_time !== storeInfo.break_end_time
              && storeInfo.break_start_time !== '0000'
              && (<p>(브레이크타임 {storeInfo.break_start_time} ~ {storeInfo.break_end_time})</p>)
            }
            {
              storeInfo.close_text && storeInfo.close_text !== ''
              && (<p>{storeInfo.close_text}</p>)
            }
          </div>
        </div>
      </div>
      <div className="operator-info">
        <div className="term-list">
          <button className="term-item">개인정보 취급장침</button>
        </div>
        <Image
          src={operatorLogo}
          alt={'operator logo'}
          width={110}
          height={42}
          onClick={() => console.log('this.isLogo')}
        ></Image>
      </div>
    </FooterContainer>
  )
}

export default Footer;