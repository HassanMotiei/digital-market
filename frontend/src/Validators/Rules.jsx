const requiredValue = 'REQUIRED_VALUE'
const minLengthValue = 'MIN_LENGTH_VALUE'
const maxLengthValue = 'MAX_LENGTH_VALUE'
const emailValue = 'EMAIL_VALUE'

export const requiredValidator = () => ({
  value: requiredValue,
})

export const minLengthValidator = (minLength) => ({
  value: minLengthValue,
  minLength,
})

export const maxLengthValidator = (maxLength) => ({
  value: maxLengthValue,
  maxLength,
})

export const emailValidator = () => ({
  value: emailValue,
})

export default {
  requiredValue,
  minLengthValue,
  maxLengthValue,
  // patternValue,
  emailValue,
}
