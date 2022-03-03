import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlaceType } from '../../api/Places';
import DateFormat from '../../constants/DateFormat';
import { RootState } from '../../store';
import { getPlaces } from '../../store/Places/ActionCreators';
import formatDate from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import PlaceTypeIcon from '../../components/PlaceTypeIcon/PlaceTypeIcon';
import formatCapacity from '../../utils/formatCapacity';
import PageLayout from '../../components/PageLayout/PageLayout';

const mapType = (type: PlaceType) => {
  return (
    <PlaceTypeIcon type={type} />
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
      capacity: formatCapacity(place.capacity),
      createdAt: formatDate(place.createdAt, DateFormat.ShortDate),
    };
  });

  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default Home;
