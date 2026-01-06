import bcrypt from "bcrypt";
import prisma from "../../prisma/client.js";

class User {
  /**
   * Create a new user with hashed password, profile, role, and default settings
   */
  static async createUser({ email, password, username }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        username: username || email,
        role: { connect: { name: "user" } },
        profile: {
          create: {
            firstName: username || email,
          },
        },
        userSettings: {
          create: {
            language: "fa",
            theme: "light",
            currency: "IRR",
          },
        },
      },
      include: {
        role: true,
        profile: true,
        userSettings: true,
      },
    });
  }

  /**
   * Find user by email or username (for login)
   */
  static async findByIdentifier(identifier) {
    const isEmail = identifier.includes("@");

    return prisma.user.findFirst({
      where: {
        OR: [
          { email: isEmail ? identifier : undefined },
          { username: !isEmail ? identifier : undefined },
        ],
      },
      include: {
        role: true,
        profile: true,
        userSettings: true,
      },
    });
  }

  /**
   * Compare plain password with hashed password
   */
  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Return safe user object (no sensitive data)
   */
  static safeUser(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role.name,
      profile: user.profile,
      userSettings: user.userSettings,
    };
  }
}

export default User;
