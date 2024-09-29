import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MoviesService } from './Services/movies.service';
import { IGenre, IMovie } from './Types/types';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovieGridComponent } from "./movie-grid/movie-grid.component";
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatMenuModule, MovieGridComponent, ScrollToBottomDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  genre!: IGenre;
  genreList!: IGenre[];
  movieList!: IMovie[];
  selectedGenre: string = "All";
  offset!: number;
  amount!: number;
  subscriptions$ = new Subscription();

  constructor(private movieService: MoviesService){}

  updateGenre(genre: IGenre) {
    this.genre = genre;
    this.offset = 50;
    this.amount = 50;
    if(genre.name == "All") {
      this.subscriptions$.add(
        this.movieService.getAllMovies(this.amount, this.offset).subscribe(
          response => {
            this.movieList = response;
            this.selectedGenre = "All";
          }
        )
      )
    } else {
      this.subscriptions$.add(
        this.movieService.getMoviesByGenre(this.amount, this.offset, genre.name).subscribe(
          response => {
            this.movieList = response;
            this.selectedGenre = genre.name;
          })
      )
    }
  }

  onScroll(){
    this.offset+=50;
    this.offset = this.offset % 500;
    if(this.selectedGenre == "All") {
      this.subscriptions$.add(
        this.movieService.getAllMovies(this.amount, this.offset).subscribe(
          response => {
            console.log(response);
            this.movieList = [...this.movieList, ...response];
          }
        )
      )
    } else {
      this.subscriptions$.add(
        this.movieService.getMoviesByGenre(this.amount, this.offset, this.selectedGenre).subscribe(
          response => {
            this.movieList = [...this.movieList, ...response];
          }
        )
      )
    }
  }

  ngOnInit(): void {
    this.amount = 50;
    this.offset = 50;
    this.subscriptions$.add(
      this.movieService.getGenres().subscribe(
        response => {
          let num = 0;
          response.forEach(x=>{ num += x.number });
          const all: IGenre = {
            name: "All",
            number: num
          }
          this.genre = all;
          this.genreList = [all, ...response];
        }
      )
    )
    this.subscriptions$.add(
      this.movieService.getAllMovies(50, 1).subscribe(
        response => {
          this.movieList = response;
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
  title = 'moviesApp';
}
