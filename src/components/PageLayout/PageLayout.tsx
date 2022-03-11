import { AppBar, Button, Container } from '@mui/material';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { createPlace } from '../../store/Places/ActionCreators';
import { closeSafePlacePopup, openSafePlacePopup } from '../../store/PopupManagement/ActionCreators';
import CreateSafePlacePopup from '../CreateSafePlacePopup/CreateSafePlacePopup';
import { ICreateSafePlaceFormData } from '../CreateSafePlacePopup/validateCreateSafePlaceForm';
import styles from './PageLayout.module.scss';

const PageLayout: FC = ({ children }) => {
  const navigate = useNavigate();
  const { isCreateSafePlacePopupOpen } = useSelector((state: RootState) => state.popupManagement);
  const dispatch = useDispatch();

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleAddNewSavePlace = () => {
    dispatch(openSafePlacePopup());
  };

  const handleOnSave = async (data: ICreateSafePlaceFormData) => {
    await dispatch(createPlace(data));
    dispatch(closeSafePlacePopup());
  };

  return (
    <div className={styles.mainContainer}>
      <AppBar position="sticky" className={styles.appBar}>
        <Container className={styles.container}>
          <div className={styles.logo} onClick={handleGoToHome}>Ukraine</div>
          <Button variant="contained" color="secondary" onClick={handleAddNewSavePlace}>Add New Safe Place</Button>
        </Container>
      </AppBar>
      {children}
      {isCreateSafePlacePopupOpen && <CreateSafePlacePopup onSave={handleOnSave} />}
    </div>
  );
};

export default PageLayout;
