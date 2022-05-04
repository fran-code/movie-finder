export interface ISearchFilm {
    totalResults: string;
    films: ISearchFilmData[];
}

export interface ISearchFilmData {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
}

export interface ICustomInput {
    value: string;
    setValue: Function;
    label: string;
    onSubmit: Function;
}

export interface IStateSubmit {
    loading: boolean;
    message: string | null;
}

export interface IList {
    filmsList: ISearchFilm
}

export interface IPagination {
    filmsList: ISearchFilm;
    filmName: string;
    onSubmit: Function;
}

export interface IDataFilm {
    Title: string;
    Year: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
    Ratings: IScore[];
    Response: string;
    imdbID: string;
}

interface IScore {
    Source: string;
    Value: string;
}

export interface ICardFilm {
    filmData: IDataFilm
}

export interface ICardSection {
    head: string;
    body: string;
    split?: boolean;
}