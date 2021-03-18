import React from 'react';
import {
    useHistory,
    useParams,
} from "react-router-dom"

import {
    useDispatch,
} from 'react-redux'


export default function Modal() {
    let history = useHistory();
    let { id } = useParams();
    let image = { id: 1, fname: "hellowwww" }

    if (!image) return null;

    let back = e => {
        e.stopPropagation();
        history.goBack();
    }

    return (
        <div
            onClick={back}
        >
            <div className="modal">
                <h1>{image.fname}</h1>
            </div>
        </div>
    )
}
