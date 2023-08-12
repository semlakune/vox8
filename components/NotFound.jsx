import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from "next/link";

const NotFound = () => {
  return (
      <Container>
        <Title>404</Title>
        <Subtitle>Oops! Data not found.</Subtitle>
        <Link href={"/"}>
          <Message>Back to home.</Message>
        </Link>
      </Container>
  );
};

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateY(-30px);
    }
    to {
        transform: translateY(0);
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  //background-color: #ffffff;
  //padding: 20px;
  //border-radius: 8px;
  //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 700;
  //color: #000000;
  margin: 0;
  animation: ${slideIn} 0.6s ease-out 0.2s both;
`;

const Subtitle = styled.h2`
    font-size: 24px;
    //color: #333;
    margin: 10px 0;
    animation: ${slideIn} 0.6s ease-out 0.4s both;
`;

const Message = styled.p`
    //color: #666;
    text-align: center;
    animation: ${slideIn} 0.6s ease-out 0.6s both;
    cursor: pointer;
    
    &:hover {
      font-weight: 600;
    }
`;

export default NotFound;
