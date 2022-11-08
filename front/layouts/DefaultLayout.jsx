import React from 'react';
import styled from '@emotion/styled'
import Header from "../components/Common/TheHeader";
import Footer from "../components/Common/TheFooter";

const DefaultLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
`;

const Body = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  overflow: scroll;
  
  .content {
    * {
      flex-shrink: 0;
    }
  }

  .body-footer {

  }
`;

function DefaultLayout({children}) {
  return (
    <DefaultLayoutContainer>
      <Header></Header>
      <Body>
        <div className="content">
          {children}
        </div>
        <div className="body-footer">
          <Footer />
        </div>
      </Body>
    </DefaultLayoutContainer>
  )
}

export default DefaultLayout;