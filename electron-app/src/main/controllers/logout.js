import bcrypt from 'bcryptjs'

import client from '../client'

export const logout = async (id, password) => {
  try {
    const loggedInMember = await client.member.findUnique({
      where: { id: id }
    })
    if (!loggedInMember) {
      throw new Error('Team member not found.')
    }

    let isValidPassword = false
    try {
      isValidPassword = await bcrypt.compare(password, loggedInMember.password)
    } catch (error) {
      throw new Error('Login failed. Password comparison error')
    }

    if (!isValidPassword) {
      throw new Error('Login failed. Invalid password')
    }

    return loggedInMember.name
  } catch (error) {
    console.error(error)
  }
}
