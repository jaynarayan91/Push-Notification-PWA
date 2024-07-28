// pages/index.js
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    color: white;
  }
`;

const Container = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.6);
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #f39c12;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ecf0f1;
`;

const LinkButton = styled.a`
  padding: 15px 30px;
  border: 2px solid #9b59b6;
  border-radius: 10px;
  background: transparent;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  margin-top: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const FooterText = styled.div`
  font-size: 1rem;
  color: #f1c40f;
  margin-top: 2rem;
`;

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Hola!</Title>
        <Subtitle>Welcome to the PWA Notification Page!</Subtitle>
        <Link href="/notification" passHref>
          <LinkButton>Go to Notification Page</LinkButton>
        </Link>
        <FooterText>CodeWithJay@2024 Copyright Information</FooterText>
      </Container>
    </>
  );
}
