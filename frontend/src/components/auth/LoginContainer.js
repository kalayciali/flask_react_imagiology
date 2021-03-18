import React from 'react'
import { useDispatch } from 'react-redux';

import { loginActions } from '../../store/actions/login.js'
import FormContainer from '../formHelpers/FormContainer.js'
import Form from './Form.js';

export default function LoginContainer(props) {
    const dispatch = useDispatch()

    const onSubmitClick = (userData) => {
        dispatch(loginActions.request(userData))
    }

    return (
        <FormContainer
            onSubmitClick={onSubmitClick}
            component={Form}
            formType={"Login"}
        >
        </FormContainer>
    )
}
