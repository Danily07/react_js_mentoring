import { useState } from 'react';
import './movie-field-date-component.scss';
import makeBEM from 'easy-bem';
import { Movie } from '../main-component/main-component';

interface MovieDateFieldProps {
    filed: keyof Movie;
    label: string;
    baseKey: string;
    value: Date;
    small?: boolean;
    required: boolean;
    onChange(value: string, isValid: boolean, filed: keyof Movie): void;
}

const bem = makeBEM('movie-field-date');

const MovieDateField: React.FC<MovieDateFieldProps> = props => {
    const [errorMsg, setErrorMsg] = useState<string>(null);
    const DATE_FORMAT = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';
    const changeErrorMsg = newErrorMsg => {
        if (errorMsg != newErrorMsg) {
            setErrorMsg(newErrorMsg);
        }
        props.onChangeValid(newErrorMsg == null, props.label);
    };

    const validationHandler = value => {
        if (value == null && props.required) {
            changeErrorMsg('Field is required');

            return true;
        } else if (value.match(DATE_FORMAT) == null) {
            changeErrorMsg('Invalid date');

            return false;
        } else {
            changeErrorMsg(null);

            return true;
        }
    };

    const changeHandler = event => {
        if (validationHandler(event.target.value)) {
            props.onChange(new Date(event.target.value));
        }
    };

    if (props.submitInvoked) {
        validationHandler(props.value?.toISOString().substring(0, 10));
    }

    return (
        <div className={bem()}>
            <label className={bem('label')}>{props.label}</label>
            <input
                className={
                    bem('picker', { small: props.small ?? false }) +
                    (errorMsg == null ? '' : ' input-date-error')
                }
                defaultValue={props.value?.toISOString().substring(0, 10)}
                type="date"
                key={props.baseKey + '_' + props.label}
                onChange={changeHandler}
            ></input>
            <label className={bem('error', { hidden: errorMsg == null })}>
                {errorMsg}
            </label>
        </div>
    );
};

export default MovieDateField;
