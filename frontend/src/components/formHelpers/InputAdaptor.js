import React from 'react'
import { Form as BtsForm } from 'react-bootstrap';

const InputAdapter = ({
  input,
  meta,
  invalid = meta => meta.touched && meta.invalid,
  valid = () => false, 
  ...rest
}) => {
    return <BtsForm.Control {...input} {...rest} 
        isInvalid={invalid(meta)} 
        isValid={valid(meta)} 
        className="no-border"
    />

} 

export default InputAdapter

