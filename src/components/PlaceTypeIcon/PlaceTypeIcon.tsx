import { Cabin, Security, DirectionsTransit } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { FC } from 'react';
import { PlaceType } from '../../api/Places';

interface IPlaceTypeIconProps {
  type: PlaceType;
}

const PlaceTypeIcon: FC<IPlaceTypeIconProps> = ({ type }) => {
  return (
    <Tooltip title={type}>
      <>
        {type === PlaceType.Basement && <Cabin />}
        {type === PlaceType.Bunker && <Security />}
        {type === PlaceType.Metro && <DirectionsTransit />}
      </>
    </Tooltip>
  );
};

export default PlaceTypeIcon;
