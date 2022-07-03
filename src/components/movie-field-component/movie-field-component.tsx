import { useMemo, useRef, useState } from 'react';
import './movie-field-component.scss';
import makeBEM from 'easy-bem';

interface MovieFieldProps {
    name: string;
    value: string;
    baseKey: string;
    regexValidation?: string;
    small?: boolean;
    multiline?: boolean;
    submitInvoked: boolean;
    onChange(value: string): void;
    onChangeValid(isValid: boolean, name: string): void;
}



const bem = makeBEM('movie-field');

const MovieField: React.FC<MovieFieldProps> = props => {
    const inputRef = useRef<HTMLInputElement>();
    const [errorMsg, setErrorMsg] = useState<string>(null);
    const changeErrorMsg = newErrorMsg => {
        if (errorMsg != newErrorMsg)
        {
            setErrorMsg(newErrorMsg);
        }
        props.onChangeValid(newErrorMsg == null, props.name);    
    };

    const validationHandler = value => {
        if (props.regexValidation != null) {
            if (value.match(props.regexValidation) == null) {
                changeErrorMsg(
                    value == null ? 'Field is required' : 'Invalid value',
                );
            } else {
                changeErrorMsg(null);
            }
        }
    }
    const changeHandler = event => {
        let newValue = event.target.value;
        validationHandler(newValue);
        props.onChange(newValue);
    };

    if (props.submitInvoked){
        validationHandler(props.value);
    }

    return (
        <div className={bem()}>
            <label className={bem('label')}>{props.name}</label>
            {props.multiline ? (
                <textarea
                    className={
                        bem('input', { small: props.small ?? false }) +
                        (errorMsg == null ? '' : ' input-error')
                    }
                    key={props.baseKey + '_' + props.name}
                    onChange={changeHandler}
                    defaultValue={props.value}
                ></textarea>
            ) : (
                <input
                    ref={inputRef}
                    key={props.baseKey + '_' + props.name}
                    onChange={changeHandler}
                    className={
                        bem('input', { small: props.small ?? false }) +
                        (errorMsg == null ? '' : ' input-error')
                    }
                    defaultValue={props.value}
                ></input>
            )}
            <label className={bem('error', { hidden: errorMsg == null })}>
                {errorMsg}
            </label>
        </div>
    );
};

export default MovieField;
