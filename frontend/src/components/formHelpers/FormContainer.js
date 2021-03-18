import React from 'react'
import { Form } from 'react-final-form'
import { nanoid } from 'nanoid'


export default function FormContainer(props) {
    // Create unique formID for label/input for/id attribute pairs
    const formID = nanoid()

    return (
      <Form
        onSubmit={props.onSubmitClick}
        subscription={{
          hasSubmitErrors: true,
          hasValidationErrors: true,
          pristine: true,
          submitError: true,
          submitFailed: true,
          submitting: true
        }} // Subscription Performance Optimization
        component={props.component}
          formType={props.formType}
        formID={formID}
      />
    )
}


