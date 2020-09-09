import { decode, encode } from 'typescript-base64-arraybuffer';
import { Observable, from, forkJoin, of } from 'rxjs';


// Fetches the images from the URLS passed and returns an observable with the list of local URLS
export function fetchImages(urls: string[]): Observable<string[]> {
  const requestOptions: RequestInit = {
    method: 'GET'
  };
  const requests = urls.map(url => {
    const encodedValue = localStorage.getItem(url);
    if (encodedValue) {
      const decodedValue = decode(encodedValue);
      const newBlob = new Blob([decodedValue], { type: 'image/jpeg' });
      const reference = URL.createObjectURL(newBlob);
      return of(reference);
    } else {
      return from(fetch('https://cors-anywhere.herokuapp.com/' + url, requestOptions)
        .then(res => {
          if(res.status !==200) {
            throw new Error('Could not fetch data')
          }
          return res.blob()
        })
        .then(blob => {
          blob.arrayBuffer().then(buffer => {
            const encodedValue = encode(buffer);
            try {
              localStorage.setItem(url, encodedValue);
            }
            catch{
              // No more space on LocalStorage
              const lastSessionPage = localStorage.getItem('lastSessionsPage') + ''
              localStorage.clear()
              localStorage.setItem('lastSessionsPage', lastSessionPage)
            }
          });
          return URL.createObjectURL(blob);
        }).catch(err => err));
    }
  });
  return forkJoin(requests);
}