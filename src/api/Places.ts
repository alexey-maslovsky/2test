export enum PlaceType {
  Basement = 'basement',
  Metro = 'metro',
  Bunker = 'bunker',
}

export interface IPlace {
  id: string;
  address: string;
  description: string;
  capacity: number;
  imageSrc: string;
  createdAt: number;
  type: PlaceType;
}

const FAKE_DATA: IPlace[] = [
  {
    id: 'id1',
    address: 'Street 1',
    description: '',
    capacity: 10,
    imageSrc: '',
    createdAt: Date.now(),
    type: PlaceType.Basement,
  },
  {
    id: 'id2',
    address: 'Street 123',
    description: '',
    capacity: 3,
    imageSrc: '',
    createdAt: Date.now(),
    type: PlaceType.Bunker,
  },
  {
    id: 'id3',
    address: 'Street 234',
    description: '',
    capacity: 500,
    imageSrc: '',
    createdAt: Date.now(),
    type: PlaceType.Metro,
  },
];

export default class PlacesApi {
  public getAll(): Promise<IPlace[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FAKE_DATA), 1000);
    });
  }
}
