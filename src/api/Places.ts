import { random } from 'lodash';
import { ICreateSafePlaceFormData } from '../components/CreateSafePlacePopup/validateCreateSafePlaceForm';

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
  likes: number;
  isLiked: boolean;
}

const MILLISECONDS_IN_ONE_YEAR = 1000 * 60 * 60 * 24 * 365; // 1 year

const generateFakeDataItem = (index: number) => {
  return {
    id: `id-${index}`,
    address: `Ukraine, Kiev, Victory Street ${index + 1}`,
    description: '# Oscula modo\n## Nisi indicium Libys magna intrata ut petit\nLorem markdownum vestro et risit oculos manus domumque iacet, o [Ossaeae\ncrines](http://aurodeceperat.io/eduxit-madefacta.html) et vimine leporem\ncupidine parva: ab. Si iste egreditur palustres aemula miserque locuta, tactas\nquicumque tonitrua. Cassiope nomen et verborum et retro oborto, veloxque\nNeptunus visa intempestiva illa caret prius suos via?\nTerque si vita, sed hoc ante magna non aere buxi ipse aselli. Opacas tactusque\nhaec, aspiciunt herbis tela, exstinctus Hecateidos arma nullum.\n## Taurorum nescius opus imaginis quae madidas\nOris si femina donec non delatus fine **macies in viridem** iunguntur tribus\n*extulerat* quid, iam. Dederat pomi neque sceleri: est quis acervos. Fore\nemicuit cum me lucent recuso inminet nubes **verba ut non** in percussit talia,\nnon visus fame ultor. Numeros nec dabit auctor, et imo te, Scyrumve illa cum\ndesilit: ore deos recentibus adita. Est ergo uteri purpureis cortice ista rex\ngravitate resque, nunc verum: avem arboris Lycormas.\n## Dira flammis domus amantem saltus monstri tanta\nRapuitque requiro, si sine adulter, clarus dumque potuisset et nomen, et.\nNemorale superstes etiam sublimemque sumus dum. Facto hinc marisque: sed facta\nsunt suos sacros perque, inque mea partim, ego est. Eris ascendere Athamas\n*plura* pallor invidiam manu spumosis insidias voluntas lecte adfusique: qua\nsolitum manus, et. Vulnere vix haec simulacra casam dat, quod laudis, ac\nfletibus **augurium Haec**, primo, praetulit.\nEt pius semper. Amorem di feres, per sequitur a nulli, pedes *rami insequitur\nnocuit* minus indicat pollice domos Minervae. Auguris mugitibus despexitque\ncapellas; ab est latus vulnera. Aggeribus magni: Lycia orator: *Diana nec\nfunera* nactusque *at nardi* possimne eandem, sic hoc nataeque nec undis.',
    capacity: random(1, 20, false),
    imageSrc: 'https://media.npr.org/assets/img/2022/02/25/gettyimages-1372620623_custom-4895d389987758c4dc1bfc6d5752ffd3eb55efc4-s1100-c50.jpg',
    createdAt: Date.now() - (random(1, 20, true) * MILLISECONDS_IN_ONE_YEAR),
    type: Object.values(PlaceType)[random(0, 2, false)],
    likes: random(0, 100),
    isLiked: random(0, 3) === 0,
  };
};

let FAKE_DATA: IPlace[] = Array
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

  public async create(data: ICreateSafePlaceFormData): Promise<IPlace> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPlace = {
          ...data,
          id: `id-${FAKE_DATA.length + 1}`,
          createdAt: Date.now(),
          likes: 0,
          isLiked: false,
        };

        FAKE_DATA = [
          ...FAKE_DATA,
          newPlace,
        ];

        // throw new Error('Out of memory');

        resolve(newPlace);
      }, 1000);
    });
  }

  public like(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        FAKE_DATA = FAKE_DATA.map((place) => ({
          ...place,
          likes: place.id === id ? place.likes + 1 : place.likes,
        }));

        reject();
      }, 1000);
    });
  }

  public dislike(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        FAKE_DATA = FAKE_DATA.map((place) => ({
          ...place,
          likes: place.id === id ? place.likes - 1 : place.likes,
        }));

        resolve();
      }, 1000);
    });
  }
}
