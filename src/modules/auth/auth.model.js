import prisma from "../../prisma/client.js";
class User {
  static async createUser(email, password) {
    return await prisma.user.create({ data: { email, password } });
  }

  static async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }
}

export default User;