import { useState } from 'react';
import './add-movie-component.css'

interface AddMovieButtonProps {
    onAdd(): void;
}

const AddMovieButton: React.FC<AddMovieButtonProps> = props =>  {
    return <button className='add-movie' onClick={e => props.onAdd()}>+ ADD MOVIE</button>;
}

export default AddMovieButton;
