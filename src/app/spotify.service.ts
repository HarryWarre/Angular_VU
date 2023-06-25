import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {map } from 'rxjs/operators';

interface Album {
  id: string;
  name: string;
  artist: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer BQDg2MG1M20ph0NKktLH6PXSMAV7ezgwR98ahFylb9mpDUecf2Pc5hamca9UxfZW2b9vcswpgSAMtqWPTS9Srz3_rOqW7O3ri7e_0De8QIplVyvpzo4e"
    })
  }

  getAllArtists(search:string) {
    return this.http.get<any>(`https://api.spotify.com/v1/search?q=${search}&type=artist`, this.httpOptions)
  }
  getArtists(id:string) {
    return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, this.httpOptions)
  }
  getAlbums(id:string) {
    return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums`, this.httpOptions)
  }
  getTopSongs(artistId: string): Observable<any> {
    return this.http.get<any>(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US&limit=20&order=desc`, this.httpOptions);
  }   
  getGenres(): Observable<any> {
  return this.http.get<any>('https://api.spotify.com/v1/browse/categories', this.httpOptions)
    .pipe(map(data => data.categories.items.map((item: { id: any; name: any; icons: string | any[]; }) => {
      return { 
        id: item.id,
        name: item.name,
        image: item.icons.length > 0 ? item.icons[0].url : ''
      };
    })));
  }

  getAlbumSongs(id:string) {
    return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}/tracks`, this.httpOptions);
  }
  
  getAlbumDetails(id: string): Observable<any> {
    return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, this.httpOptions);
  }

  getTopSongPreviews(artistId: string): Observable<string[]> {
    return this.getTopSongs(artistId).pipe(
      map(response => response.tracks),
      map(tracks => tracks.map((track: { preview_url: any; }) => track.preview_url))
    );
  }  
}  
