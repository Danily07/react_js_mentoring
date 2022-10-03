import { fetchResult } from "../utils/fetchResult";
import { loadSuccessAction } from "./movieActions";

export const loadMoviesListThunk = async (dispatch, getState) => {
    dispatch('LOAD_START');

    try {
      const result = await fetchResult<MovieResponeItem[]>('http://localhost:4000/movies');
      dispatch(loadSuccessAction(result));
    }
    catch(e){
      dispatch('LOAD_FAILURE', e);
    }
}

export interface MovieResponeItem {
  budget: number
  id: number
  overview: string
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  tagline: string
  vote_average: number
  vote_count: number
  genres: string[]
  title: string
}

