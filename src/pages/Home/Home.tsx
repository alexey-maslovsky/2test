import { DataGrid, GridColDef } from '@mui/x-data-grid';
import pluralize from 'pluralize';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlaceType } from '../../api/Places';
import DateFormat from '../../constants/DateFormat';
import { RootState } from '../../store';
import { getPlaces } from '../../store/Places/ActionCreators';
import formatDate from '../../utils/formatDate';
import { Cabin, DirectionsTransit, Security } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const mapType = (type: PlaceType) => {
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

const COLUMNS: GridColDef[] = [
  { field: 'type', headerName: 'Type', flex: 0.05, renderCell: (params) => mapType(params.value) },
  { field: 'address', headerName: 'Address', flex: 0.40 },
  { field: 'capacity', headerName: 'Capacity', flex: 0.15 },
  { field: 'createdAt', headerName: 'Created At', flex: 0.20 },
];

const Home: FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.places);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPlaces());
  }, []);

  const openDetails = (id: string) => {
    navigate(`/places/${id}`);
  };

  const rows = items?.map((place) => {
    return {
      id: place.id,
      address: place.address,
      type: place.type,
      capacity: `${place.capacity} ${pluralize('person', place.capacity)}`,
      createdAt: formatDate(place.createdAt, DateFormat.ShortDate),
    };
  });

  return (
    <div style={{ height: 500 }}>
      <DataGrid
        loading={!rows}
        rows={rows || []}
        columns={COLUMNS}
        pageSize={7}
        isRowSelectable={() => false}
        onRowClick={(params) => openDetails(params.id.toString())}
      />
    </div>
  );
};

export default Home;
