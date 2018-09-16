import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ISongInfo } from '../entities/ISongInfo.interfaces';
import { ISongList } from '../entities/ISongList.interfaces';

@Injectable({
  providedIn: 'root'
})

export class RequestsHubService {
  private categoriesUrl = 'assets/mocks/categories.json';
  private getSongListUrl = 'assets/mocks/songList.json';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ICategories> {
    console.log('get Categories');
    return this.http.get<ICategories>(this.categoriesUrl);
  }

  getSongList(): Observable<ISongList> {
    console.log('get SongList');
    return this.http.get<ISongList>(this.getSongListUrl);
  }

  getFoundAlbums(inputValue: string): Observable<ISongInfo> {
    return this.getSongList().pipe(
      switchMap(data => data.songList),
      filter(song => song.albumName.toLowerCase().indexOf(inputValue) !== -1),
    );
  }
}

interface ICategories {
  categories: object[];
}
