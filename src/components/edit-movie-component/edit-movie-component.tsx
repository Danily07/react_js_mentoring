import React from 'react';
import MovieField from '../movie-field-component/movie-field-component';
import MovieDateField from '../movie-field-date-component/movie-field-date-component';
import MovieGenreField from '../movie-field-genre-component/movie-field-genre-component';
import './edit-movie-component.scss';
import makeBEM from 'easy-bem';
import { Movie } from '../main-component/main-component';
import { generateUUID } from '../../utils/Uuid-helper';
import { values } from 'ramda';

interface EditMovieProps {
    movie: Movie;
    onSubmit: (movie: Movie) => void;
    onClose: () => void;
}

const bem = makeBEM('modal-body');

type MovieFiledMappingType = Record<keyof Movie, string>;

const movieFiledLabels: Readonly<MovieFiledMappingType> = {
    id: 'identifier',
    name: 'TITLE',
    releaseDate: 'RELEASE DATE',
    image: 'POSTER URL',
    rating: 'RATING',
    genre: 'GENRE',
    runtime: 'RUNTIME',
    comment: 'OVERVIEW',
};

type MovieFiledValidationType = Record<keyof Movie, boolean>;

const movieFiledValidationType: Readonly<MovieFiledValidationType> = {
    id: true,
    name: false,
    releaseDate: true, // [AB] debug MovieDateField then change default value to 'false'
    image: false,
    rating: false,
    genre: false,
    runtime: false,
    comment: false,
};

const EditMovie: React.FC<EditMovieProps> = props => {
    const { onSubmit } = props;

    const [movieState, setMovieState] = React.useState({ ...props.movie });

    const [validationStatus, setValidationStatus] =
        React.useState<MovieFiledValidationType>({
            ...movieFiledValidationType,
        });

    const [hideErrorMessage, setHideErrorMessage] = React.useState(true);

    const handleFiledChange = React.useCallback(
        (value: string, isValid: boolean, field: keyof Movie) => {
            setMovieState(prev => ({
                ...prev,
                [field]: value,
            }));
            setValidationStatus(prev => ({
                ...prev,
                [field]: isValid,
            }));
        },
        [],
    );

    // submit changes or show validation errors
    const submitHandler = React.useCallback(() => {
        if (values(validationStatus).every(status => status)) {
            onSubmit(movieState);
        } else {
            setHideErrorMessage(false);
        }
    }, [onSubmit, validationStatus, movieState]);

    // reset initial state of movie
    const resetHandler = React.useCallback(() => {
        setMovieState({ ...props.movie });
        setValidationStatus({ ...movieFiledValidationType });
    }, [props.movie]);

    //[DI]: for changing input key after every reset
    const baseKey = React.useMemo(() => generateUUID(), []);

    return (
        <div
            className="modal-container"
            id="modal-container"
            onClick={e => {
                props.onClose();
                e.stopPropagation();
            }}
        >
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h1 className="modal__title">ADD MOVIE</h1>
                <div className={bem()}>
                    <div className={bem('field-line')}>
                        <MovieField
                            filed="name"
                            label={movieFiledLabels['name']}
                            baseKey={baseKey}
                            value={movieState.name}
                            rules={{ '.+': 'Field is required' }}
                            hideErrorMessage={hideErrorMessage}
                            onChange={handleFiledChange}
                        />
                        {/* <MovieDateField
                            filed="releaseDate"
                            label={movieFiledLabels['releaseDate']}
                            baseKey={baseKey}
                            required={true}
                            value={curItem.releaseDate}
                            small={true}
                            submitInvoked={submitInvoked}
                            onChangeValid={validChangeHandler}
                            onChange={value =>
                                setCurItem({
                                    ...curItem,
                                    releaseDate: value,
                                })
                            }
                        /> */}
                    </div>
                    <div className={bem('field-line')}>
                        <MovieField
                            filed="image"
                            label={movieFiledLabels['image']}
                            baseKey={baseKey}
                            value={movieState.image}
                            rules={{ '.+': 'Field is required' }}
                            hideErrorMessage={hideErrorMessage}
                            onChange={handleFiledChange}
                        />
                        <MovieField
                            filed="rating"
                            label={movieFiledLabels['rating']}
                            baseKey={baseKey}
                            value={
                                isNaN(movieState.rating)
                                    ? ''
                                    : movieState.rating.toString()
                            }
                            rules={{
                                '.+': 'Field is required',
                                '(^[1-9]$)|(^[0-9]{2}$)|(^100$)':
                                    'Invalid rating value',
                            }}
                            hideErrorMessage={hideErrorMessage}
                            small={true}
                            onChange={handleFiledChange}
                        />
                    </div>
                    <div className={bem('field-line')}>
                        <MovieGenreField
                            filed="genre"
                            label={movieFiledLabels['genre']}
                            baseKey={baseKey}
                            value={movieState.genre}
                            onChange={handleFiledChange}
                        />
                        <MovieField
                            filed="runtime"
                            label={movieFiledLabels['runtime']}
                            baseKey={baseKey}
                            rules={{
                                '.+': 'Field is required',
                                '^[1-9][0-9]{0,2}$': 'Invalid runtime value',
                            }}
                            hideErrorMessage={hideErrorMessage}
                            value={
                                isNaN(movieState.runtime)
                                    ? ''
                                    : movieState.runtime.toString()
                            }
                            small={true}
                            onChange={handleFiledChange}
                        />
                    </div>
                    <MovieField
                        filed="comment"
                        label={movieFiledLabels['comment']}
                        baseKey={baseKey}
                        value={movieState.comment}
                        onChange={handleFiledChange}
                        multiline={true}
                    />
                </div>
                <button onClick={resetHandler} className="modal__btn-reset">
                    RESET
                </button>
                <div onClick={submitHandler} className="modal__btn-ok">
                    SUBMIT
                </div>
            </div>
        </div>
    );
};

export default EditMovie;
