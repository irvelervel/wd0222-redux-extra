import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import { FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUsernameAction } from '../redux/actions'

// mapStateToProps is a FUNCTION returning an OBJECT
// mapStateToProps is going to decide which parts of the Redux Store you want to "read"
// and make accessible to CartIndicator

const CartIndicator = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')

  const cartLength = useSelector((state) => state.cart.content.length)
  const username = useSelector((state) => state.user.name)
  const areBooksLoading = useSelector((state) => state.book.loading)

  const dispatch = useDispatch()

  return (
    <div className="ml-auto mt-2">
      {areBooksLoading && <Spinner variant="primary" animation="border" />}
      {
        // I'll NOT get a truthy value out of username initially
        // since initially user.name is an '' (empty string)
        username ? (
          <>
            <Button
              className="mr-2"
              color="primary"
              onClick={() => navigate('/cart')}
            >
              <FaShoppingCart />
              <span className="ml-2">{cartLength}</span>
            </Button>
            <span>Hello {username}!</span>
          </>
        ) : (
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              console.log('username submit!', name)
              // I should dispatch an action now!
              // setUsername is the prop that dispatches an action of type SET_USERNAME
              dispatch(setUsernameAction(name))
            }}
          >
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Log in here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        )
      }
    </div>
  )
}

export default CartIndicator

// now we're going to connect CartIndicator to the Redux Store,
// for reading the length of the content array in every given moment
// for doing this, we'll need a function called 'connect'

// connect is going to be used for exporting the component
// ...but how can we tell connect what do we want to read from the Redux Store?

// mapStateToProps and mapDispatchToProps are the two arguments you can invoke 'connect' with!
// mapStateToProps decides which parts of the Redux Store you want to READ ("read" access)
// mapDispatchToProps decides how is this component going to INTERACT with the Redux Store ("write" access)
