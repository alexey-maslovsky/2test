import { AppBar, Button, Container } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PageLayout.module.scss';

const PageLayout: FC = ({ children }) => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.mainContainer}>
      <AppBar position="sticky" className={styles.appBar}>
        <Container className={styles.container}>
          <div className={styles.logo} onClick={handleGoToHome}>Ukraine</div>
          <Button variant="contained" color="secondary">Add New Safe Place</Button>
        </Container>
      </AppBar>
      {children}
    </div>
  );
};

export default PageLayout;
