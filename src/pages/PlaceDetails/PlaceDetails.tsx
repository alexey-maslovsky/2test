import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store';
import { getPlaceDetails } from '../../store/PlaceDetails/ActionCreators';

const PlaceDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const placeDetails = useSelector((state: RootState) => state.placeDetails);

  useEffect(() => {
    dispatch(getPlaceDetails(id!));
  }, []);

  return (
    <div>
      {placeDetails[id!] && placeDetails[id!]?.description}
    </div>
  );
};

export default PlaceDetails;
