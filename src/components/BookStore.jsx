import BookList from './BookList'
import BookDetail from './BookDetail'
import { Col, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getBooksAction } from '../redux/actions'
import { useState, useEffect } from 'react'

const BookStore = () => {
  const [bookSelected, setBookSelected] = useState(null) // initially is null since we haven't selected a book yet!

  const booksInStock = useSelector((state) => state.book.stock)
  const dispatch = useDispatch()

  // componentDidMount = async () => {
  //   // I'll still need to dispatch the getBooksAction creator from somewhere!
  //   this.props.getBooks()
  // }

  useEffect(() => {
    dispatch(getBooksAction())
  }, [])

  const changeBook = (book) => setBookSelected(book)

  return (
    <Row>
      <Col md={4}>
        <BookList
          books={booksInStock} // this is the stock array from the Redux Store
          bookSelected={bookSelected}
          changeBook={changeBook}
        />
      </Col>
      <Col md={8}>
        <BookDetail bookSelected={bookSelected} />
      </Col>
    </Row>
  )
}

export default BookStore
// in order to let BookStore dispatch the getBooksAction action creator
// we need to connect it to the Redux Store...!
