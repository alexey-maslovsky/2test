import { random } from 'lodash';

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

const MILLISECONDS_IN_ONE_YEAR = 1000 * 60 * 60 * 24 * 365; // 1 year

const generateFakeDataItem = (index: number) => {
  return {
    id: `id-${index}`,
    address: `Ukraine, Kiev, Victory Street ${index + 1}`,
    description: 'hello',
    capacity: random(1, 20, false),
    imageSrc: 'https://media.npr.org/assets/img/2022/02/25/gettyimages-1372620623_custom-4895d389987758c4dc1bfc6d5752ffd3eb55efc4-s1100-c50.jpg',
    createdAt: Date.now() - (random(1, 20, true) * MILLISECONDS_IN_ONE_YEAR),
    type: Object.values(PlaceType)[random(0, 2, false)],
  };
};

const FAKE_DATA: IPlace[] = Array
  .from({ length: 1000 })
  .map((item, index) => generateFakeDataItem(index));

export default class PlacesApi {
  public getAll(): Promise<IPlace[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FAKE_DATA), 1000);
    });
  }

  public getById(id: string): Promise<IPlace | null> {
    return new Promise((resolve) => {
      const placeDetails = FAKE_DATA.find((place) => place.id === id) || null;

      setTimeout(() => resolve(placeDetails), 1000);
    });
  }
}
