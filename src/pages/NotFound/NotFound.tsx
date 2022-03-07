import { FC } from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import NotFoundImageSrc from './not-found.jpeg';
import styles from './NotFound.module.scss';

const NotFound: FC = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <img src={NotFoundImageSrc} alt="Not Found"/>
        <p className={styles.title}>Not Found</p>
      </div>
    </PageLayout>
  )
};

export default NotFound;
