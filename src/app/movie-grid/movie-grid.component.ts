import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { CommonModule } from '@angular/common';
import { MoviesService } from '../Services/movies.service';
import { IMovie, IGenre } from '../Types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-grid',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  template: `
    <section class = "grid-container">
      <app-movie-card *ngFor="let movie of movieList" [movie]="movie"></app-movie-card>
    </section>
  `,
  styleUrl: './movie-grid.component.css'
})
export class MovieGridComponent implements OnInit, OnDestroy{
  @Input() genre!: IGenre;
  @Input() movieList!: IMovie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
