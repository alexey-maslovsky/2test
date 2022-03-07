import { Dialog, DialogTitle } from '@mui/material';
import { FC } from 'react';
import styles from './PopupLayout.module.scss';

interface PopupLayoutProps {
  title: string;
  onClose: () => void;
}

const PopupLayout: FC<PopupLayoutProps> = ({ title, onClose, children }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <div className={styles.container}>
        {children}
      </div>
    </Dialog>
  );
};

export default PopupLayout;
