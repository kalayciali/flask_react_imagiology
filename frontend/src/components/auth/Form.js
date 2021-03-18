import React from 'react'
import { Field } from 'react-final-form'

import Button from 'react-bootstrap/Button'
import { Form as BtsForm } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl'
import Widget from '../../components/widget/Widget.js';
import cx from 'classnames';
import s from './Form.module.scss';
import { Link } from 'react-router-dom'

import InputAdapter from '../formHelpers/InputAdaptor.js';
import FormFeedbackAdapter from '../formHelpers/FormFeedbackAdapter.js';

import {
  validateRequired,
  validateEmail,
    validateMinLength,
  composeValidators
} from '../formHelpers/validators'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Form = ({
  formID,
  handleSubmit,
  hasSubmitErrors,
  hasValidationErrors,
  meta,
  reset,
  pristine,
  submitError,
  submitFailed,
  submitting,
  values,
    formType,
  ...rest
}) => {
    const formTitle = formType === "Login" ? "log in" : "sign up"
    return (
        <div className={s.root}>
            <Row>
                <Col xs={{span: 10, offset: 1}}
                    sm={{span: 6, offset: 3}}
                    lg={{span:4, offset: 4}}
                >
                    <Widget className={s.widget}>
                        <h3 className="text-center">{formTitle}</h3>

                          <BtsForm onSubmit={handleSubmit} className="mt">
                            <BtsForm.Group>
                              <BtsForm.Label htmlFor={`${formID}-email`}>Email</BtsForm.Label>
                              <Field
                                name="email"
                                component={InputAdapter}
                                validate={composeValidators(validateRequired(), validateEmail())}
                                valid={meta => meta.visited && meta.valid} 
                                id={`${formID}-email`}
                                aria-describedby={`${formID}-email-help`}
                                size="lg"
                                type="email"
                                placeholder="Your Email Address"
                              />
                              <FormFeedbackAdapter name="email" />
                              <BtsForm.Control.Feedback type="valid">
                                  You entered valid email.
                              </BtsForm.Control.Feedback>
                            </BtsForm.Group>

                            <BtsForm.Group>
                              <BtsForm.Label htmlFor={`${formID}-password`}>Password</BtsForm.Label>
                              <Field
                                name="password"
                                component={InputAdapter}
                                validate={composeValidators(
                                  validateRequired(),
                                  validateMinLength(
                                    8,
                                    <React.Fragment>
                                      Your password must be at least <strong>8</strong> characters long.
                                    </React.Fragment>
                                  )
                                )}
                                id={`${formID}-password`}
                                invalid={meta =>
                                  meta.invalid && ((meta.visited && !meta.pristine) || meta.touched)
                                } // override to validate during input
                                valid={meta => meta.visited && meta.valid} 
                                placeholder="Your Password"
                                size="lg"
                                type="password"
                              />
                              <FormFeedbackAdapter name="password" />
                              <BtsForm.Control.Feedback type="valid">
                                  valid password
                              </BtsForm.Control.Feedback>
                            </BtsForm.Group>

                          <Button
                            type="submit"
                            size="lg"
                            disabled={pristine || submitting}
                            className="btn btn-dark btn-lg btn-block"
                          >
                              Submit
                          </Button>
                        </BtsForm>
                    </Widget>
                </Col>
            </Row>
        </div>
)

}

export default Form

