export interface IGenre {
  name: string,
  number: number
}

export interface IMovie {
  id: number,
  genreList: string[],
  releaseDate: string,
  title: string,
  tagline: string,
  overview: string,
  url: string
}
