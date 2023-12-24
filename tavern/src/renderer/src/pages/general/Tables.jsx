import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectLoggedInMembers } from '../../redux/memberSlice'

const Tables = () => {
  const loggedInMembers = useSelector(selectLoggedInMembers)

  console.log('logged in from tables page: ', loggedInMembers) // test
  return (
    <div>
      <h1>Tables Page</h1>
      <Link to="/">Home</Link>
    </div>
  )
}

export default Tables
