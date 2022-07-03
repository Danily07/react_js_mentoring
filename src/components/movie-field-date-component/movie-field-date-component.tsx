import { useState } from 'react';
import './movie-field-date-component.scss';
import makeBEM from 'easy-bem';

interface MovieDateFieldProps {
    name: string;
    baseKey: string;
    value: Date;
    small?: boolean;
    required: boolean;
    submitInvoked: boolean;
    onChange(value: Date): void;
    onChangeValid(isValid: boolean, name: string): void;
}

const bem = makeBEM('movie-field-date');

const MovieDateField: React.FC<MovieDateFieldProps> = props => {
    const [errorMsg, setErrorMsg] = useState<string>(null);
    const DATE_FORMAT = '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';
    const changeErrorMsg = newErrorMsg => {
        if (errorMsg != newErrorMsg)
        {
            setErrorMsg(newErrorMsg);
        }
        props.onChangeValid(newErrorMsg == null, props.name);    
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
    }

    const changeHandler = event => {
        if (validationHandler(event.target.value)){
            props.onChange(new Date(event.target.value));
        }
    };

    if (props.submitInvoked){
        validationHandler(props.value?.toISOString().substring(0, 10));
    }

    return (
        <div className={bem()}>
            <label className={bem('label')}>{props.name}</label>
            <input
                className={
                    bem('picker', { small: props.small ?? false }) +
                    (errorMsg == null ? '' : ' input-date-error')
                }
                defaultValue={props.value?.toISOString().substring(0, 10)}
                type="date"
                key={props.baseKey + '_' + props.name}
                onChange={changeHandler}
            ></input>
            <label className={bem('error', { hidden: errorMsg == null })}>
                {errorMsg}
            </label>
        </div>
    );
};

export default MovieDateField;
