import { Card, CardMedia, CardContent, Typography, CardActions, Button, Skeleton } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import PlaceTypeIcon from '../../components/PlaceTypeIcon/PlaceTypeIcon';
import DateFormat from '../../constants/DateFormat';
import { RootState } from '../../store';
import { getPlaceDetails } from '../../store/PlaceDetails/ActionCreators';
import formatCapacity from '../../utils/formatCapacity';
import formatDate from '../../utils/formatDate';
import styles from './PlaceDetails.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PlaceDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const placeDetails = useSelector((state: RootState) => state.placeDetails);

  useEffect(() => {
    dispatch(getPlaceDetails(id!));
  }, []);

  const {
    address,
    capacity,
    createdAt,
    description,
    imageSrc,
    type,
  } = placeDetails[id!] || {};

  const isLoading = placeDetails[id!] === undefined;

  if (placeDetails[id!] === null) {
    return (
      <div>Oooops Not Found</div>
    );
  }

  return (
    <PageLayout>
      <div>
        <Card>
          {isLoading && <Skeleton variant="rectangular" height={140} />}
          {imageSrc && <CardMedia component="img" height="140" image={imageSrc} />}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {address}
              {isLoading && <Skeleton variant="text" width="33%" />}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description && <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>}
              {isLoading && <Skeleton variant="text" />}
              {isLoading && <Skeleton variant="text" />}
              {isLoading && <Skeleton variant="text" />}
            </Typography>
            <Typography className={styles.subtitle} variant="subtitle2" color="text.secondary">
              {type && <PlaceTypeIcon type={type} />}
              {capacity !== undefined && <p>{formatCapacity(capacity)}</p>}
              {createdAt && formatDate(createdAt, DateFormat.LongDate)}
              {isLoading && <Skeleton variant="text" width="33%" />}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" disabled={isLoading}>Like</Button>
          </CardActions>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PlaceDetails;
