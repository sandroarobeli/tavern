import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { useListMembersQuery } from '../../redux/apiSlice'
import {
  listMembers,
  selectAllMembers,
  selectMemberError,
  selectMemberStatus
} from '../../redux/memberSlice'

const Login = () => {
  // const [members, setMembers] = useState([])
  const dispatch = useDispatch()

  const allMembers = useSelector(selectAllMembers)
  const memberStatus = useSelector(selectMemberStatus)
  const memberError = useSelector(selectMemberError)
  // use allMembers for useEffect dependency, or make sure to refresh invalidate cache
  // for synchronous UI update...

  useEffect(() => {
    dispatch(listMembers())
  }, [dispatch])

  console.log('allMembers: ', allMembers)

  return (
    <div>
      <h1>Login Page</h1>
      {memberStatus === 'isFetching' && <h1 className="text-4xl text-green-600">LOADING...</h1>}
      {memberStatus === 'isError' && <h1 className="text-4xl text-red-600">{memberError}</h1>}
      {memberStatus === 'isSuccess' && (
        <h1 className="text-4xl text-orange-600">Katie sucked my cock</h1>
      )}
    </div>
  )
}

export default Login
