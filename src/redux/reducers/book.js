import { GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_LOADING } from '../actions'

const initialState = {
  stock: [],
  error: false, // this will be used for displaying an error message!
  loading: false, // this will be used for displaying a spinner (loading indicator)
}

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        stock: action.payload,
      }
    case GET_BOOKS_ERROR: {
      return {
        ...state,
        error: true,
      }
    }
    case GET_BOOKS_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}

export default bookReducer
