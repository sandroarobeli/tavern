import prisma from '../prisma'

export const listMembers = async () => {
  try {
    const members = await prisma.member.findMany({
      orderBy: [
        {
          name: 'asc'
        }
      ],
      select: {
        name: true,
        password: true, // see if I really need this one
        isAdmin: true
      }
    })
    return members
  } catch (error) {
    console.error(error)
  }
}
