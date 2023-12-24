import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import client from '../client'

export const login = async (id, password, key) => {
  try {
    const existingMember = await client.member.findUnique({
      where: { id: id }
    })
    if (!existingMember) {
      throw new Error('Team member not found.')
    }

    let isValidPassword = false
    try {
      isValidPassword = await bcrypt.compare(password, existingMember.password)
    } catch (error) {
      throw new Error('Login failed. Password comparison error')
    }

    if (!isValidPassword) {
      throw new Error('Login failed. Invalid password')
    }

    let token
    try {
      token = jwt.sign({ memberId: existingMember.id }, key)
    } catch (error) {
      throw new Error('Login failed. Token generation error')
    }

    return {
      id: existingMember.id,
      name: existingMember.name,
      isAdmin: existingMember.isAdmin,
      token: token
    }
  } catch (error) {
    console.error(error)
  }
}
