import { useContext, useState } from 'react';
import MovieField from '../movie-field-component/movie-field-component';
import MovieDateField from '../movie-field-date-component/movie-field-date-component';
import MovieGenreField from '../movie-field-genre-component/movie-field-genre-component';
import './edit-movie-component.scss';
import makeBEM from 'easy-bem';
import { Movie, MovieContext } from '../main-component/main-component';
import { generateUUID } from '../../utils/Uuid-helper';

interface EditMovieProps {
    show: boolean;
    onClose(save: boolean, changedItem: Movie): void;
}

const bem = makeBEM('modal-body');

const EditMovie: React.FC<EditMovieProps> = props => {
    if (!props.show) {
        return null;
    }
    const VALIDATION_FIELDS_COUNT = 5;

    const context = useContext(MovieContext);
    const [curItem, setCurItem] = useState(context);
    //[DI]: for changing input key after every reset
    const [baseKey, setBaseKey] = useState(generateUUID());
    const [fieldsValid, setFieldsValid] = useState<Map<string, boolean>>(new Map());
    const [submitInvoked, setSubmitInvoked] = useState(false);

    const validChangeHandler = (isValid, fieldName) => {
        setFieldsValid(fieldsValid.set(fieldName, isValid));
        let fieldsValidArr = Array.from(fieldsValid.values());
        if (submitInvoked && fieldsValidArr.length == VALIDATION_FIELDS_COUNT)
        {
            setSubmitInvoked(false);
            if (fieldsValidArr.every(isValid => isValid))
            {
                props.onClose(true, curItem);
            }
        }
    };

    return (
        <div
            className="modal-container"
            id="modal-container"
            onClick={e => {
                props.onClose(false, curItem);
                e.stopPropagation();
            }}
        >
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h1 className="modal__title">ADD MOVIE</h1>
                <div className={bem()}>
                    <div className={bem('field-line')}>
                        <MovieField
                            name="TITLE"
                            baseKey={baseKey}
                            value={curItem.name}
                            regexValidation=".+"
                            submitInvoked={submitInvoked}
                            onChangeValid={validChangeHandler}
                            onChange={value =>
                                setCurItem({
                                    ...curItem,
                                    name: value,
                                })
                            }
                        ></MovieField>
                        <MovieDateField
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
                        ></MovieDateField>
                    </div>
                    <div className={bem('field-line')}>
                        <MovieField
                            name="POSTER URL"
                            baseKey={baseKey}
                            value={curItem.image}
                            regexValidation=".+"
                            submitInvoked={submitInvoked}
                            onChangeValid={validChangeHandler}
                            onChange={value =>
                                setCurItem({
                                    ...curItem,
                                    image: value,
                                })
                            }
                        ></MovieField>
                        <MovieField
                            name="RATING"
                            baseKey={baseKey}
                            value={
                                isNaN(curItem.rating)
                                    ? ''
                                    : curItem.rating.toString()
                            }
                            regexValidation="(^[1-9]$)|(^[0-9]{2}$)|(^100$)"
                            small={true}
                            submitInvoked={submitInvoked}
                            onChangeValid={validChangeHandler}
                            onChange={value =>
                                setCurItem({
                                    ...curItem,
                                    rating: parseInt(value),
                                })
                            }
                        ></MovieField>
                    </div>
                    <div className={bem('field-line')}>
                        <MovieGenreField
                            name="GENRE"
                            baseKey={baseKey}
                            value={curItem.genre}
                            onChange={value =>
                                setCurItem({
                                    ...curItem,
                                    genre: value,
                                })
                            }
                        ></MovieGenreField>
                        <MovieField
                            name="RUNTIME"
                            baseKey={baseKey}
                            regexValidation="^[1-9][0-9]{0,2}$"
                            value={
                                isNaN(curItem.runtime)
                                    ? ''
                                    : curItem.runtime.toString()
                            }
                            small={true}
                            submitInvoked={submitInvoked}
                            onChangeValid={validChangeHandler}
                            onChange={value =>
                                setCurItem({
                                    ...curItem,
                                    runtime: parseInt(value),
                                })
                            }
                        ></MovieField>
                    </div>
                    <MovieField
                        name="OVERVIEW"
                        baseKey={baseKey}
                        value={curItem.comment}
                        submitInvoked={submitInvoked}
                        onChangeValid={validChangeHandler}
                        onChange={value =>
                            setCurItem({
                                ...curItem,
                                comment: value,
                            })
                        }
                        multiline={true}
                    ></MovieField>
                </div>
                <button
                    onClick={e => {
                        setCurItem(context);
                        setBaseKey(generateUUID());
                    }}
                    className="modal__btn-reset"
                >
                    RESET
                </button>
                <button
                    onClick={e => {
                        setSubmitInvoked(true);
                        setFieldsValid(new Map());
                    }}
                    className="modal__btn-ok"
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
};

export default EditMovie;
