import React from 'react';
import {
    useSelector,
    useDispatch,
} from 'react-redux'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom"

import cx from 'classnames';
import s from './MainLayout.module.scss'

import Modal from './Modal.js'
import Main from './Main.js'
import Gallery from './Gallery.js'
import Img from './Img.js';


export default function DashboardLayout (props) {

    let location = useLocation();
    let path = location.pathname
    let background = location.state && location.state.background

    const dispatch = useDispatch()

    let modal = background ? <Route path={`${path}/img/:id`} component={ Modal }/> : null

    function nestedRouter() {
        return (
            <div>
                <Switch location={background || location}>
                    <Route exact path={path} component={ Main }></Route>
                    <Route path={`${path}/gallery`} component={ Gallery }></Route>
                    <Route path={`${path}/img/:id`} component={ Img }></Route>
                </Switch>
                {modal}
            </div>
        )
    }

    return (
        <div className={s.root}>
            <div className={s.wrap}>
                <main className={s.content}>
                    {nestedRouter()}
                </main>
            </div>
        </div>
    )
}

