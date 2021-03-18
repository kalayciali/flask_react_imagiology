import React from 'react';
import { Header } from './Header.js'

function AppLayout(props) {
    return (
        <div className="app-layout">
            <Header></Header>
            {props.children}
        </div>
    )
}

export default AppLayout;
