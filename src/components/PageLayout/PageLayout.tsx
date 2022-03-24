import { Alert, AppBar, Button, Container, Snackbar } from '@mui/material';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IPlace } from '../../api/Places';
import { RootState, useAppDispatch } from '../../store';
import { createPlace, getPlaces } from '../../store/Places/ActionCreators';
import { closeSafePlacePopup, openSafePlacePopup } from '../../store/PopupManagement/ActionCreators';
import CreateSafePlacePopup from '../CreateSafePlacePopup/CreateSafePlacePopup';
import { ICreateSafePlaceFormData } from '../CreateSafePlacePopup/validateCreateSafePlaceForm';
import styles from './PageLayout.module.scss';

const PageLayout: FC = ({ children }) => {
  const navigate = useNavigate();
  const { isCreateSafePlacePopupOpen } = useSelector((state: RootState) => state.popupManagement);
  const [isSuccessToasterShown, setIsSuccessToasterShown] = useState(false);
  const [isErrorToasterShown, setIsErrorToasterShown] = useState(false);
  const dispatch = useAppDispatch();

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleAddNewSavePlace = () => {
    dispatch(openSafePlacePopup());
  };

  const handleOnSave = async (data: ICreateSafePlaceFormData) => {
    try {
      const newPlace: IPlace = await dispatch(createPlace(data)).unwrap();
      setIsSuccessToasterShown(true);
      dispatch(closeSafePlacePopup());
      dispatch(getPlaces());

      navigate(`/places/${newPlace.id}`);
    } catch (error) {
      setIsErrorToasterShown(true);
    }
  };

  const handleSuccessToasterClose = () => {
    setIsSuccessToasterShown(false);
  };

  const handleErrorToasterClose = () => {
    setIsErrorToasterShown(false);
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
      <Snackbar open={isSuccessToasterShown} autoHideDuration={2000} onClose={handleSuccessToasterClose} >
        <Alert>
          New Safe Place Has Been Created!
        </Alert>
      </Snackbar>
      <Snackbar open={isErrorToasterShown} autoHideDuration={2000} onClose={handleErrorToasterClose} >
        <Alert severity="error">
          Ooops something went wrong! :(
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PageLayout;
