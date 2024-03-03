import React, {useReducer} from 'react'

import './TestReducer.css'

const countReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {count: state.count + 1}
    case 'MINUS':
      return {count: state.count - 1}
    default:
      return state
  }
}

export default function TestReducer() {
  const [counter, dispatch] = useReducer(countReducer, {count: 0})

  return (
    <div className="bodyTest">
      <h1>{counter.count}</h1>
      <button
        className="buttonTest"
        onClick={() => dispatch({type: 'ADD'})}>
        ADD
      </button>
      <button
        className="buttonTest"
        onClick={() => dispatch({type: 'MINUS'})}>
        Minus
      </button>
    </div>
  )
}
