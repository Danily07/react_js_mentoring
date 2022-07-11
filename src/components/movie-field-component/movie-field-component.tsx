import { keys } from 'ramda';
import React from 'react';
import './movie-field-component.scss';
import makeBEM from 'easy-bem';

interface MovieFieldProps {
    label: string;
    value: string;
    baseKey: string;
    rules?: { [regex: string]: string };
    hideErrorMessage?: boolean;
    small?: boolean;
    multiline?: boolean;
    onChange(value: string, isValid: boolean, name: string): void;
}

const bem = makeBEM('movie-field');

/** find first validation error */
const getValidationError = (
    value: string,
    rules: { [regex: string]: string },
) => {
    const error = keys(rules).find(
        (regex: string) => value.match(regex) === null,
    );

    return error ? rules[error] : null;
};

const MovieField: React.FC<MovieFieldProps> = props => {
    const [errorMsg, setErrorMsg] = React.useState<string>(null);

    // initialization effect: send initial validation status to parent component
    React.useEffect(
        () => {
            const errorMessage = getValidationError(props.value, props.rules);
            props.onChange(props.value, !errorMessage, props.label);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    React.useEffect(() => {
        if (!props.hideErrorMessage) {
            const errorMessage = getValidationError(props.value, props.rules);
            setErrorMsg(errorMessage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.hideErrorMessage]);

    const changeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newValue = event.target.value;
        const errorMessage = getValidationError(newValue, props.rules);
        setErrorMsg(errorMessage);
        props.onChange(newValue, !errorMessage, props.label);
    };

    return (
        <div className={bem()}>
            <label className={bem('label')}>{props.label}</label>
            {props.multiline ? (
                <textarea
                    className={
                        bem('input', { small: props.small ?? false }) +
                        (errorMsg == null ? '' : ' input-error')
                    }
                    key={props.baseKey + '_' + props.label}
                    onChange={changeHandler}
                    value={props.value}
                />
            ) : (
                <input
                    key={props.baseKey + '_' + props.label}
                    onChange={changeHandler}
                    className={
                        bem('input', { small: props.small ?? false }) +
                        (errorMsg == null ? '' : ' input-error')
                    }
                    value={props.value}
                ></input>
            )}
            {errorMsg && <label className={bem('error')}>{errorMsg}</label>}
        </div>
    );
};

export default MovieField;
