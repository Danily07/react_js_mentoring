import React from 'react';
import { generateUUID } from '../../utils/Uuid-helper';
import { Movie, OrderBy } from './main-component';

export const NEW_MOVIE_ID = 'new_movie_id';

const moviesData: Movie[] = [
    {
        id: '00000000-0000-0000-0000-000000000001',
        image: './movie1.png',
        name: 'Pulp Fiction',
        genre: 'Criminal',
        releaseDate: new Date(1994, 1, 1),
        rating: 76,
        runtime: 120,
        comment: 'asdasd asd asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000002',
        image: './movie2.png',
        name: 'Bohemian Rhaspody',
        genre: 'Music & Drama',
        releaseDate: new Date(2018, 1, 1),
        rating: 81,
        runtime: 130,
        comment: 'asddsa asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000003',
        image: './movie3.png',
        name: 'Kill Bill: Vol. 1',
        genre: 'Action',
        releaseDate: new Date(2003, 1, 1),
        rating: 71,
        runtime: 145,
        comment: 'asdasd asd asmldkamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000004',
        image: './movie4.png',
        name: 'Inception',
        genre: 'Action & Thriller',
        releaseDate: new Date(2010, 1, 1),
        rating: 75,
        runtime: 144,
        comment: 'asdaddamsd',
    },
    {
        id: '00000000-0000-0000-0000-000000000005',
        image: './movie5.png',
        name: 'Avengers: War of infinity',
        genre: 'Action',
        releaseDate: new Date(2018, 1, 1),
        rating: 55,
        runtime: 130,
        comment: 'asdasmldka3sd',
    },
    {
        id: '00000000-0000-0000-0000-000000000006',
        image: './movie6.png',
        name: 'Reservoir dogs',
        genre: 'Criminal',
        releaseDate: new Date(1991, 1, 1),
        rating: 79,
        runtime: 124,
        comment: 'as21313kamsd',
    },
];

export interface MovieContextType {
    movieList: ReadonlyArray<Movie>;
    /** movie to be edited or created */
    editableMovie: Movie;
    setEditableMovieId: (movieId: string) => void;
    emptyEditableMovie: () => void;
    updateMovie: (movie: Movie) => void;
    createMovie: (movie: Movie) => void;
    deleteMovie: (movieId: string) => void;
    orderByHandler: (orderType: OrderBy) => void;
}

export const MovieContext = React.createContext<MovieContextType>(null);

export interface MovieContextProviderProps {
    children: React.ReactNode;
}

const newMovie: Movie = {
    id: NEW_MOVIE_ID,
    image: '',
    name: '',
    genre: '',
    releaseDate: null,
    rating: NaN,
    runtime: NaN,
    comment: '',
};

export const MovieContextProvider: React.FC<
    MovieContextProviderProps
> = props => {
    const [moviesList, setMoviesList] = React.useState(moviesData);
    const [editableMovie, setEditableMovie] = React.useState(null);

    // const orderByHandler = (orderType: OrderBy) => {
    // switch (orderType) {
    //     case OrderBy.Release:
    //         const newArrRelease = movies.sort((a, b) =>
    //             a.releaseDate > b.releaseDate ? 1 : 0,
    //         );
    //         //Without slice direct state changing doesn't work :c
    //         setMoviesState(newArrRelease.slice(0));
    //         break;
    //     case OrderBy.Score:
    //         const newArr = movies.sort((a, b) =>
    //             a.rating > b.rating ? 1 : 0,
    //         );
    //         setMoviesState(newArr.slice(0));
    //         break;
    //     case OrderBy.Popularity:
    //         //[DI]: undefined
    //         break;
    // }
    // };

    const context: MovieContextType = React.useMemo(
        () => ({
            movieList: moviesList,
            editableMovie,
            setEditableMovieId: (movieId: string) => {
                const movie = [...moviesList, newMovie].find(
                    item => item.id === movieId,
                );
                setEditableMovie(movie);
            },
            emptyEditableMovie: () => setEditableMovie(null),
            updateMovie: (movie: Movie) => {
                console.log('updateMovie: ', movie);
                setMoviesList(
                    moviesList.map(m => (m.id === movie.id ? movie : m)),
                );
            },
            createMovie: (movie: Movie) => {
                console.log('createMovie: ', movie);
                setMoviesList([
                    ...moviesList,
                    { ...movie, id: generateUUID() },
                ]);
            },
            deleteMovie: (movieId: string) =>
                setMoviesList(moviesList.filter(mv => mv.id !== movieId)),
            orderByHandler: () => undefined,
        }),
        [moviesList, editableMovie],
    );

    return (
        <MovieContext.Provider value={context}>
            {props.children}
        </MovieContext.Provider>
    );
};
