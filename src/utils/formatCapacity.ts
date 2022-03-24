import pluralize from 'pluralize';

export class NegativeCapacityError extends Error {
}

const formatCapacity = async (capacity: number): Promise<string> => {
  if (capacity < 0) {
    throw new NegativeCapacityError('Capacity must be greater or equal to 0.');
  }

  if (capacity === 0) {
    return 'no people';
  }

  return `${capacity} ${pluralize('person', capacity)}`;
};

export default formatCapacity;
