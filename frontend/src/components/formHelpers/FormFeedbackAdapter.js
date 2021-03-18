import React from 'react'
import { Form as BtsForm } from 'react-bootstrap';
import { Field } from 'react-final-form'

const FormFeedbackAdapter = ({ name }) => (
  <Field
    name={name}
    subscription={{ error: true, submitError: true }}
      render={({ meta: { error, submitError } }) => 
              (error || submitError) ? 
                  <BtsForm.Control.Feedback type="invalid">{error || submitError}</BtsForm.Control.Feedback> 
                  : null

    }
  />
)

export default FormFeedbackAdapter
