export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_BOOKS = 'GET_BOOKS'
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR'
export const GET_BOOKS_LOADING = 'GET_BOOKS_LOADING'

// DRY
// Don't
// Repeat
// Yourself

// here you're typically going to write ACTION CREATORS
// an action creator is a function returning an action

export const addToCartAction = (book) => ({
  type: ADD_TO_CART, // this is the type, the only mandatory property
  // the action I'm dispatching here should carry the book into the reducer
  payload: book,
  // the payload is an additional piece of info you want to dispatch your action with!
})

export const removeFromCartAction = (indexToRemove) => {
  return {
    type: REMOVE_FROM_CART,
    payload: indexToRemove,
  }
}

export const setUsernameAction = (nameToSet) => {
  return {
    type: SET_USERNAME,
    payload: nameToSet,
  }
}

// so if we want to perform any async operation and fill our redux store with the result
// e.g. a fetch()
// we're going to do the fetch here, one step before the reducer
// and we're going to provide the reducer already the fetched data to work with!

// so we're going to fetch the data here, in the action creators!
// ...but so far the action creators are just functions straight returning an action
// how can we write an action creator that actually performs real logic?

// for doing this we can leverage ANOTHER WAY of writing an action creator!
// we can write another shape of action creators because we can leverage a redux
// middleware (some sort of a plugin) already embedded into our store, called
// redux-thunk

// this is the alternative way of writing an action creator:
export const addToCartActionWithThunk = (book) => {
  return async (dispatch, getState) => {
    // previously, we were returning ACTIONS from action creators!
    // now we can also return a FUNCTION from our action creators!
    // this function we're allowed to return gets from Redux 2 arguments:
    // 1) the dispatch function
    // 2) a getState function, that when executed will return us the whole redux store
    console.log('dispatched from a thunk action creator!! :D')
    console.log(getState()) // this will give you the actual content of the store
    // you can do any kind of thing here, and after
    // you can dispatch your action
    dispatch({
      type: ADD_TO_CART,
      payload: book,
    })
  }
}

// let's now try to fetch the available books with an action creator!
export const getBooksAction = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_BOOKS_LOADING,
        payload: true,
      })
      let resp = await fetch(
        'https://striveschool-api.herokuapp.com/food-books'
      )
      if (resp.ok) {
        let books = await resp.json()
        //   this.setState({ books }) // <-- this doesn't work anymore
        dispatch({
          type: GET_BOOKS,
          payload: books, // this is the array of 6 books! travelling to the reducer
        })
        // I'm delaying the dispatch of this action
        // because I'm in an async function that is performing a fetch!
        dispatch({
          type: GET_BOOKS_LOADING,
          payload: false,
        })
      } else {
        console.log('error')
        dispatch({
          type: GET_BOOKS_ERROR,
        })
        dispatch({
          type: GET_BOOKS_LOADING,
          payload: false,
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_BOOKS_ERROR,
      })
      dispatch({
        type: GET_BOOKS_LOADING,
        payload: false,
      })
    }
  }
}
