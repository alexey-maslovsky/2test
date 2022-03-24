import formatCapacity, { NegativeCapacityError } from './formatCapacity';

jest.mock('pluralize', () => {
  return () => 'test';
});

describe('formatCapacity', () => {
  it('returns capacity and result from pluralize', () => {
    const result = formatCapacity(1);

    return expect(result).resolves.toBe('1 test');
  });

  it('returns "no people" when passed capacity = 0', () => {
    const result = formatCapacity(0);

    return expect(result).resolves.toBe('no people');
  });

  it('throws error when passed capacity is lower then 0', () => {
    const result = formatCapacity(-1);

    return expect(result).rejects.toThrow(NegativeCapacityError);
  });
});
