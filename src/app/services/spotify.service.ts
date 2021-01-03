import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;

  constructor(private http: HttpClient) { }

  setToken(tk: string) {
    this.token = 'Bearer ' + tk;
    console.log(this.token);
  }

  obtenerToken() {
    const url = 'https://accounts.spotify.com/api/token';

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = 'client_id=3f4c8bb253fd4a52a3924e432477a06e&client_secret=69cf15c0f1d3493abf1e2844eea2bb0e&grant_type=client_credentials';

    return this.http.post(url, body, { headers });

  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    console.log('head', headers);

    return this.http.get(url, { headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
      .pipe(map((data: any) => {
        return data.albums.items;
      }));
  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist`)
      .pipe(map((data: any) => {
        return data.artists.items;
      }));
  }

  getArtista(id: string) {

    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {

    return this.getQuery(`artists/${id}/top-tracks?market=es`)
      .pipe(map((data: any) => {
        return data.tracks;
      }));
  }

}
