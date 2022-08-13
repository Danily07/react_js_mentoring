import { RootState } from './movieStore';

export const selectMovies = (state: RootState) => state.movieList;
export const selectEditableMovie = (state: RootState) => state.editableMovie;
