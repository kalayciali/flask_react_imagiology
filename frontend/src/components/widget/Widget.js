import React from 'react';
import cx from 'classnames';

import s from './Widget.module.scss'

export default function Widget(props) {
    const isTitleSting = props.title && typeof props.title === 'string'

    const title = isTitleSting ? (
        <h5 className={s.title}>{props.title}</h5>
    ) : (
        <header className={s.title}>{props.title}</header>
    )

    return (
        <section className={cx(s.head, props.className)}>
            {title}
            <div>{props.children}</div>
        </section>
    )
}

