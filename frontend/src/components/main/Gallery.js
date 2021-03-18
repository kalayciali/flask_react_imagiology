import React from 'react';
import { 
    Link,
    useLocation,
} from 'react-router-dom';
import {
    useDispatch,
} from 'react-redux'

export default function Gallery() {
    let location = useLocation()

    let images = [
        {id: 1, fname: "smt"},
        {id: 2, fname: "hereweare"},
    ]

    return (
        <div>
            {images.map(i => (
                <Link
                    key={i.id}
                    to={{
                        pathname: `/img/${i.id}`,
                        state: { background: location }
                    }}
                >
                    <p>{i.fname}</p>
                </Link>
            ))}
        </div>
    )
}
