import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IMovie, IGenre } from '../Types/types';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="card" (click) ="goToURL(movie)">
      <section>
        {{movie.title}} {{movie.releaseDate.split('-')[0]}}
        <hr class="solid">
      </section>
      <section class="container">
        {{movie.overview}}
        <p class="genre">
          {{movie.genreList.toString()}}
        </p>
      </section>
    </section>
  `,
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie!: IMovie;

  goToURL(movie: IMovie){
    window.open(movie.url, "_blank");
  }
}
