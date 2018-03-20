import * as actionType from '../actions/types'
export default function(state = null, action) {
  switch (action.type) {
    case actionType.FETCH_USER:
      return (action.payload !=='')? action.payload: false
    default:
      return state;
  }
}