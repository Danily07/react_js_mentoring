import { RootState } from './movieStore';

export const selectMovies = (state: RootState) => state.movieReducer.movieList;
export const selectEditableMovie = (state: RootState) => state.movieReducer.editableMovie;
