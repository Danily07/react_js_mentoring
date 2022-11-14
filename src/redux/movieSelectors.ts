import { RootState } from './movieStore';

export const selectMovies = (state: RootState) => state.movieList;
export const selectEditableMovie = (state: RootState) => state.editableMovie;
export const selectIsLoading = (state: RootState) => state.loading;
export const selectIsError = (state: RootState) => state.error;
