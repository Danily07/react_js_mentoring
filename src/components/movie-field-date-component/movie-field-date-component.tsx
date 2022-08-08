import { useState } from 'react';
import './movie-field-date-component.scss';
import makeBEM from 'easy-bem';
import { Movie } from '../main-component/main-component';
import React from 'react';

interface MovieDateFieldProps {
    field: keyof Movie;
    label: string;
    baseKey: string;
    value: string;
    small?: boolean;
    required: boolean;
    hideErrorMessage?: boolean;
    onChange(value: string, isValid: boolean, name: keyof Movie): void;
}

const bem = makeBEM('movie-field-date');

const MovieDateField: React.FC<MovieDateFieldProps> = props => {
    const [errorMsg, setErrorMsg] = useState<string>(null);
    const DATE_FORMAT = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';

    // initialization effect: send initial validation status to parent component
    React.useEffect(
        () => {
            const errorMessage = getValidationError(props.value?.toString(), props.required);
            props.onChange(props.value?.toString(), !errorMessage, props.field);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    /** find first validation error */
    const getValidationError = (value: string, required: boolean) => {
        if (value == null && required) {
            return 'Field is required';
        }

        if (value.match(DATE_FORMAT) == null) {
            return 'Invalid date';
        }

        return null;
    };
    
    React.useEffect(() => {
        if (!props.hideErrorMessage) {
            const errorMessage = getValidationError(props.value?.toString(), props.required);
            setErrorMsg(errorMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.hideErrorMessage]);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const errorMessage = getValidationError(newValue, props.required);
        setErrorMsg(errorMessage);
        props.onChange(newValue, !errorMessage, props.field);
    };

    return (
        <div className={bem()}>
            <label className={bem('label')}>{props.label}</label>
            <input
                className={
                    bem('picker', { small: props.small ?? false }) +
                    (errorMsg == null ? '' : ' input-date-error')
                }
                type="date"
                key={props.baseKey + '_' + props.label}
                onChange={changeHandler}
                value={props.value == null ? '' : props.value?.substring(0, 10)}
            ></input>
            {errorMsg && <label className={bem('error')}>{errorMsg}</label>}
        </div>
    );
};

export default MovieDateField;
