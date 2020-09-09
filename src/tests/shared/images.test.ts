import { fetchImages } from '../../shared/images.utility';
import { encode, decode } from 'typescript-base64-arraybuffer';

jest.mock('typescript-base64-arraybuffer', () => ({
  encode: jest.fn().mockReturnValue('mockEncodedString'),
  decode: jest.fn()
}));

describe('Images utility', () => {
  let urls: string[];
  beforeEach(() => {
    urls = ["mockUrl1", "mockUrl2", "mockUrl3"];
    global.URL.createObjectURL = jest.fn().mockImplementation(() => 'mockResponse');
  });

  it('should fetch images if none are available on localstorage', (done) => {
    const mockSuccessResponse = { arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)) };
    const mockBlobPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      blob: () => mockBlobPromise,
      status: 200
    });

    const mockFunction = jest.fn().mockImplementation(() => mockFetchPromise);
    global.fetch = mockFunction;

    fetchImages(urls).subscribe((res) => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(global.fetch).toHaveBeenCalledWith('https://cors-anywhere.herokuapp.com/mockUrl3', { "method": "GET" });
      expect(encode).toHaveBeenCalledTimes(3);
      mockFunction.mockClear();
      done();
    });

  });

  it('should use localstorage if possible', (done) => {
    global.localStorage.getItem = jest.fn().mockImplementation(() => 'mockValue');

    const mockFunction = jest.fn().mockImplementation(() => { });
    global.fetch = mockFunction;

    const response = fetchImages(urls).subscribe(res => {
      expect(global.fetch).not.toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalled();
      expect(decode).toHaveBeenCalled();
      expect(res).toEqual(['mockResponse', 'mockResponse', 'mockResponse']);
      mockFunction.mockClear();
      done();
    });

  });
});