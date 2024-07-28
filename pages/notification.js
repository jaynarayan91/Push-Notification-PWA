// pages/notification.js
import { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

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

const Paragraph = styled(motion.p)`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: white;
  line-height: 1.5;
`;

const NotificationButton = styled(motion.button)`
  padding: 15px 30px;
  border: 2px solid #9b59b6;
  border-radius: 10px;
  background: transparent;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
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

const IconContainer = styled(motion.div)`
  margin: 20px auto;
  padding: 40px;
  border-radius: 50%;
  background-color: #2d2d2d;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
`;

const glowing = keyframes`
  0% { text-shadow: 0 0 5px #f1c40f, 0 0 10px #f1c40f, 0 0 15px #f1c40f; }
  50% { text-shadow: 0 0 20px #f1c40f, 0 0 30px #f1c40f, 0 0 40px #f1c40f; }
  100% { text-shadow: 0 0 5px #f1c40f, 0 0 10px #f1c40f, 0 0 15px #f1c40f; }
`;

const FooterText = styled(motion.div)`
  font-size: 1.25rem;
  color: #f1c40f;
  margin-top: 2rem;
  animation: ${glowing} 1.5s infinite;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dialog = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  color: black;
`;

const DialogButton = styled.button`
  margin-top: 1rem;
  padding: 10px 20px;
  background: #9b59b6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #8e44ad;
  }
`;

export default function Notification() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }, []);

  const handleSendNotificationClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogOkClick = async () => {
    setIsDialogOpen(false);

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        });

        console.log('Push subscription:', subscription);

        // Simulating a push notification
        registration.showNotification('Hello!', {
          body: 'This is a test notification',
          icon: '/icons/icon-192x192.png',
        });

      } catch (error) {
        console.error('Error subscribing to notifications:', error);
      }
    } else {
      console.warn('Push messaging is not supported');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Hola!</Title>
        <IconContainer
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, loop: Infinity }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#9b59b6">
            <path d="M12 24c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2zm6.707-7.293l1.293-1.293-1.414-1.414-1.293 1.293c-1.136-1.014-2.735-1.586-4.293-1.586s-3.157.572-4.293 1.586l-1.293-1.293-1.414 1.414 1.293 1.293c-1.015 1.136-1.586 2.735-1.586 4.293h16c0-1.558-.571-3.157-1.586-4.293z"/>
          </svg>
        </IconContainer>
        <Subtitle>This is a PWA Notification Page!</Subtitle>
        <Paragraph
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 5, loop: Infinity }}
        >
          Progressive Web Apps (PWAs) are a type of application software delivered through the web, built using common web technologies including HTML, CSS, and JavaScript. PWAs are intended to work on any platform that uses a standards-compliant browser. Key features include offline capabilities, push notifications, and performance enhancements that provide a more app-like experience on the web.
        </Paragraph>
        <NotificationButton
          onClick={handleSendNotificationClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Notification
        </NotificationButton>
        <FooterText
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, loop: Infinity }}
        >
          CodeWithJay@2024 Copyright Information
        </FooterText>
      </Container>

      {isDialogOpen && (
        <DialogOverlay>
          <Dialog>
            <p>Grant permission to send notifications?</p>
            <DialogButton onClick={handleDialogOkClick}>OK</DialogButton>
          </Dialog>
        </DialogOverlay>
      )}
    </>
  );
}
