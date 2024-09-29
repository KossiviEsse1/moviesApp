import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGenre, IMovie } from '../Types/types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private genreURL: string = 'https://movies-app-backend.replit.app/api/genres';
  private moviesURL: string = 'https://movies-app-backend.replit.app/api/movies';
  constructor(private http: HttpClient) { }

  getGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(this.genreURL).pipe(
      map(
        response => response.map((item: any)=> ({
          name: item[0],
          number: item[1]
        }) as IGenre)
      )
    );
  }

  getAllMovies(limit: number, from: number): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.moviesURL, { params: { limit: limit, from: from } }).pipe(
      map(
        response => response.map((item : any)=> ({
          id: item.id,
          genreList: item.genres,
          releaseDate: item.release_date,
          title: item.title,
          tagline: item.tagline,
          overview: item.overview,
          url: item.url
        }) as IMovie)
      )
    );
  }

  getMoviesByGenre(limit: number, from: number, genre: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.moviesURL, { params: { limit: limit, from: from, genre: genre } }).pipe(
      map(
        response => response.map((item : any)=> ({
          id: item.id,
          genreList: item.genres,
          releaseDate: item.release_date,
          title: item.title,
          tagline: item.tagline,
          overview: item.overview,
          url: item.url
        }) as IMovie)
      )
    );
  }
}
