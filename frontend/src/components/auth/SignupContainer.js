import React from 'react'
import { useDispatch } from 'react-redux';

import { signupActions } from '../../store/actions/signup.js'
import FormContainer from '../formHelpers/FormContainer.js'
import Form from './Form';

export default function SignupContainer(props) {
    const dispatch = useDispatch()

    const onSubmitClick = (userData) => {
        dispatch(signupActions.request(userData))
    }

    return (
        <FormContainer
            onSubmitClick={onSubmitClick}
            component={Form}
            formType="Signup"
        >
        </FormContainer>
    )
}
