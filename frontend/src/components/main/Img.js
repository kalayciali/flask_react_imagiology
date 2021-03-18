import React from 'react';
import { useParams } from 'react-router-dom';
import {
    useDispatch,
} from 'react-redux'

export default function Img(props) {
    let { id } = useParams();
    let image = { id: 1, fname: "hellowwwwwwwww" }

    if (!image) return <div>Image not found</div>;

    return (
        <div>
            <h1>{image.fname}</h1>
        </div>
    )
}
