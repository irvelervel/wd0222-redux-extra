// even before starting to write the reducer function, let's think
// about HOW we want our store to look like...

import { SET_USERNAME } from '../actions'

// previously this was
// const initialState = {
//   // a typical thing for a redux store object is getting split into multiple "chunks" (sub-objects)
//   cart: {
//     // let's put our array into here!
//     content: [],
//   },
//   // cart is a SLICE of the redux store
//   user: {
//     name: '',
//   },
//   // user is another SLICE of the redux store!
// }

const initialState = {
  name: '',
}

// Once you add a lot of cases to your reducer, maybe it becomes worthy to
// split it up into multiple, smaller ones, in order to find your logic blocks
// easier and to simplify the code itself!

// we're going to split our single reducer function into multiple ones
// one per slice!

// we're going to use our initialState to write our reducer function!

// we're passing initialState as the default value of the state argument,
// since on the first run it might be undefined
const userReducer = (state = initialState, action) => {
  // this function should at every usage compute the new version of the state
  switch (action.type) {
    // put all our cases here!
    case SET_USERNAME:
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state // in the case of falling into the default statement,
    // that means we encountered an 'unrecognized' action.type!
    // returning the state as it was from it, will not HARM our app!
    // we're just going to bring no modification to it...
  }
}
// the reducer is a function that will return the new state of the app every time,
// thanks to its two arguments: the current state of the app, and the action
// that just got dispatched (which describes the modification you want to bring in)

export default userReducer
