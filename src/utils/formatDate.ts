import moment from 'moment';

const formatDate = (date: Date | number, format: string): string => {
  return moment(date).format(format);
};

export default formatDate;
