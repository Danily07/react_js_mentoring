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

const EditMovie: React.FC<EditMovieProps> = props => {
    const { onSubmit } = props;

    const [curItem, setCurItem] = React.useState({ ...props.movie });

    //[DI]: for changing input key after every reset
    const [baseKey, setBaseKey] = React.useState(generateUUID());
    const [validationStatus, setValidationStatus] = React.useState<{
        [field: string]: boolean;
    }>({
        TITLE: false,
        // 'RELEASE DATE': false,
        'POSTER URL': false,
        RATING: false,
        GENRE: false,
        RUNTIME: false,
        OVERVIEW: false,
    });

    const [hideErrorMessage, setHideErrorMessage] = React.useState(true);

    const submitHandler = React.useCallback(() => {
        // hide validation errors until user click 'Submit'
        setHideErrorMessage(false);
        if (values(validationStatus).every(status => status)) {
            onSubmit(curItem);
        }
    }, [onSubmit, validationStatus, curItem]);

    const resetHandler = React.useCallback(() => {
        setCurItem({ ...props.movie });
    }, [props.movie]);

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
                            label="TITLE"
                            baseKey={baseKey}
                            value={curItem.name}
                            rules={{ '.+': 'Field is required' }}
                            hideErrorMessage={hideErrorMessage}
                            onChange={(
                                value: string,
                                isValid: boolean,
                                fieldName: string,
                            ) => {
                                setCurItem({
                                    ...curItem,
                                    name: value,
                                });
                                setValidationStatus({
                                    ...validationStatus,
                                    [fieldName]: isValid,
                                });
                            }}
                        ></MovieField>
                        {/* <MovieDateField
                            name="RELEASE DATE"
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
                            label="POSTER URL"
                            baseKey={baseKey}
                            value={curItem.image}
                            rules={{ '.+': 'Field is required' }}
                            hideErrorMessage={hideErrorMessage}
                            onChange={(
                                value: string,
                                isValid: boolean,
                                fieldName: string,
                            ) => {
                                setCurItem({
                                    ...curItem,
                                    image: value,
                                });
                                setValidationStatus({
                                    ...validationStatus,
                                    [fieldName]: isValid,
                                });
                            }}
                        />
                        <MovieField
                            label="RATING"
                            baseKey={baseKey}
                            value={
                                isNaN(curItem.rating)
                                    ? ''
                                    : curItem.rating.toString()
                            }
                            rules={{
                                '.+': 'Field is required',
                                '(^[1-9]$)|(^[0-9]{2}$)|(^100$)':
                                    'Invalid rating value',
                            }}
                            hideErrorMessage={hideErrorMessage}
                            small={true}
                            onChange={(
                                value: string,
                                isValid: boolean,
                                fieldName: string,
                            ) => {
                                setCurItem({
                                    ...curItem,
                                    rating: parseInt(value),
                                });
                                setValidationStatus({
                                    ...validationStatus,
                                    [fieldName]: isValid,
                                });
                            }}
                        />
                    </div>
                    <div className={bem('field-line')}>
                        <MovieGenreField
                            label="GENRE"
                            baseKey={baseKey}
                            value={curItem.genre}
                            onChange={value =>
                                setCurItem({
                                    ...curItem,
                                    genre: value,
                                })
                            }
                        />
                        <MovieField
                            label="RUNTIME"
                            baseKey={baseKey}
                            rules={{
                                '.+': 'Field is required',
                                '^[1-9][0-9]{0,2}$': 'Invalid runtime value',
                            }}
                            hideErrorMessage={hideErrorMessage}
                            value={
                                isNaN(curItem.runtime)
                                    ? ''
                                    : curItem.runtime.toString()
                            }
                            small={true}
                            onChange={(
                                value: string,
                                isValid: boolean,
                                fieldName: string,
                            ) => {
                                setCurItem({
                                    ...curItem,
                                    runtime: parseInt(value),
                                });
                                setValidationStatus({
                                    ...validationStatus,
                                    [fieldName]: isValid,
                                });
                            }}
                        />
                    </div>
                    <MovieField
                        label="OVERVIEW"
                        baseKey={baseKey}
                        value={curItem.comment}
                        onChange={(
                            value: string,
                            isValid: boolean,
                            fieldName: string,
                        ) => {
                            setCurItem({
                                ...curItem,
                                comment: value,
                            });
                            setValidationStatus({
                                ...validationStatus,
                                [fieldName]: isValid,
                            });
                        }}
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
