import Rules from './Rules'
import Regex from './Regex'

const Validator = (value, validations) => {
  const validationResults = validations.map((validation) => {
    if (validation.value === Rules.requiredValue) {
      return value.trim().length === 0
    }
    if (validation.value === Rules.minLengthValue) {
      return value.trim().length < validation.minLength
    }
    if (validation.value === Rules.maxLengthValue) {
      return value.trim().length > validation.maxLength
    }
    if (validation.value === Rules.emailValue) {
      return !Regex.testEmail(value)
    }
    return true
  })

  return validationResults.every((result) => result === false)
}

export default Validator
