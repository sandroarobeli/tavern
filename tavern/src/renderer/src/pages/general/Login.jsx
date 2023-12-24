/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

import { selectLoggedInMembers } from '../../redux/memberSlice'
import { useListMembersQuery, useLoginMutation, useLogoutMutation } from '../../redux/apiSlice'
import Modal from '../../components/Modal'

const Login = () => {
  const navigate = useNavigate()

  const loggedInMembers = useSelector(selectLoggedInMembers)

  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const { data: members, isError: isQueryError, error: queryError } = useListMembersQuery()

  const [login, { isFetching: isLoggingIn }] = useLoginMutation()
  const [logout, { isFetching: isLoggingOut }] = useLogoutMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm()

  // To use findUnique, I need a unique identifier. Name cannot be such a value.
  // So I have to use Id. Therefore since Select dropdown registers "member",
  // under its value attribute, I choose "member.id" as such identifier
  // Thus, in login, while the parameter says member, actual value is id,
  // Which is reflected by login({ id: member, password })
  const submitHandler = async ({ member, password }) => {
    if (member && password && (!isLoggingIn || !isLoggingOut)) {
      try {
        if (loggedInMembers.find((el) => el.id === parseInt(member))) {
          await logout({ id: parseInt(member), password }).unwrap()
        } else {
          await login({ id: parseInt(member), password }).unwrap()
        }

        navigate('/tables')
      } catch (error) {
        setErrorMessage(error)
        setShowModal(true)
        reset()
      }
    }
  }

  const clearError = () => {
    setShowModal(false)
    setErrorMessage(null)
  }

  return (
    <div className="mx-auto font-display">
      <form className="" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="mb-36 text-6xl font-semibold text-center">
          <i>The Tavern</i>
        </h1>

        <div className="mb-10 w-1/2">
          <select
            autoFocus
            name="member"
            className={`focus:ring ${errors.password ? 'ring-red-500' : 'ring-main-active'}`}
            {...register('member', {
              required: 'Please select a team member'
            })}
          >
            <option value="">Team Member</option>
            {members?.map((member) => (
              <option key={member.name} value={member.id} className="">
                {member.name}
              </option>
            ))}
          </select>
          {errors.member && (
            <div className="text-red-500 font-semibold">{errors.member.message}</div>
          )}
        </div>

        <div className="mb-10 w-1/2">
          <input
            type="password"
            placeholder="Password"
            className={`focus:ring ${errors.password ? 'ring-red-500' : 'ring-main-active'}`}
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 7,
                message: 'Password must be at least 7 characters long'
              }
            })}
          />
          {errors.password && (
            <div className="text-red-500 font-semibold">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-36 w-1/2">
          <button
            aria-label="Login"
            className="primary-button"
            disabled={isLoggingIn || isLoggingOut}
          >
            Submit
          </button>
        </div>
        <div className="w-1/2 text-center">
          <Link
            to="/tables"
            className="text-2xl font-semibold text-blue-600 hover:text-primary-700 active:text-primary-800 transition duration-150 ease-in-out"
          >
            Go to Tables
          </Link>
        </div>
      </form>
      <Modal
        title="Error"
        description={queryError || errorMessage}
        titleColor="text-red-500"
        adminModal={false}
        isOpen={isQueryError || showModal}
        onClose={clearError}
      />
    </div>
  )
}

export default Login
