import isEmail from 'validator/lib/isEmail'

export const composeValidators = (...validators) => (...validatorParams) =>
  validators.reduce(
    (error, validator) => error || validator(...validatorParams),
    undefined
  )

export const validateEmail = (
  msg = 'Please enter a valid email address.'
) => value => (isEmail(value) ? undefined : msg)

export const validateIsNumber = (msg = 'Must be a number.') => value =>
  isNaN(value) ? msg : undefined


export const validateMatch = (fieldName, msg) => (value, allValues) =>
  value !== allValues[fieldName] ? msg : undefined

export const validateMaxLength = (
  maxLength,
  msg = `Must be maximum of ${maxLength}.`
) => val => (val.length > maxLength ? msg : undefined)

export const validateMinLength = (
  minLength,
  msg = `Must be minimum of ${minLength}.`
) => val => (val.length < minLength ? msg : undefined)

export const validateRequired = (msg = 'Required.') => value =>
  // check against length because unfilled checkboxes produces empty array
  value && value.length !== 0 ? undefined : msg

