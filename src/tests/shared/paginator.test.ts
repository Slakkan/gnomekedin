import { paginate } from '../../shared/paginator.utility';

describe('Paginator utility', () => {
  let array: number[];
  beforeEach(() => array = [1, 2, 3, 4, 5, 6, 7]);

  it('should respond with a full page if the array has enough elements', () => {
    const response = paginate(array, 5, 0);
    expect(response).toEqual([1, 2, 3, 4, 5]);
  });

  it('should respond with an incomplete page if the array does not have enough elements', () => {
    const response = paginate(array, 5, 1);
    expect(response).toEqual([6,7]);
  });
});