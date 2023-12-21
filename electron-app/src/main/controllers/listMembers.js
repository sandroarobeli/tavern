import client from '../client'

export const listMembers = async () => {
  try {
    const members = await client.member.findMany({
      orderBy: [
        {
          name: 'asc'
        }
      ],
      select: {
        id: true,
        name: true,
        password: true,
        isAdmin: true
      }
    })
    return members
  } catch (error) {
    console.error(error)
  }
}
