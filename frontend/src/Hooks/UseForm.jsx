import {useCallback, useReducer} from 'react'

export const UseForm = (initInput, initFormIsValid) => {
  const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE': {
        let isFormValid = true
        for (let inputID in state.inputs) {
          if (inputID === action.inputID) {
            isFormValid = isFormValid && action.isValid
          } else {
            isFormValid = isFormValid && state.inputs[inputID].isValid
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputID]: {
              value: action.value,
              isValid: action.isValid,
            },
          },
          isFormValid: isFormValid,
        }
      }
      default: {
        return state
      }
    }
  }

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInput,
    isFormValid: initFormIsValid,
  })

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value,
      isValid,
      inputID: id,
    })
  }, [])

  return [formState, onInputHandler]
}
