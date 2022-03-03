import pluralize from 'pluralize';

const formatCapacity = (capacity: number): string => {
  return `${capacity} ${pluralize('person', capacity)}`;
};

export default formatCapacity;
