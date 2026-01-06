import jwt from "jsonwebtoken";
import User from "./auth.model.js"; // فقط مدل را ایمپورت می‌کنیم

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

class AuthService {
  /**
   * ثبت نام کاربر
   * @param {object} param0
   * @param {string} param0.email
   * @param {string} param0.password
   * @param {string} [param0.username]
   */
  static async register({ email, password, username }) {
    // بررسی اینکه ایمیل قبلاً ثبت نشده باشد
    const existingUser = await User.findByIdentifier(email);
    if (existingUser) {
      const err = new Error("Email already exists");
      err.code = "EMAIL_EXISTS";
      throw err;
    }

    const user = await User.createUser({ email, password, username });

    // ساخت توکن JWT
    const token = this.generateToken(user);

    return {
      token,
      user: User.safeUser(user),
    };
  }

  /**
   * لاگین کاربر با ایمیل یا یوزرنیم
   * @param {object} param0
   * @param {string} param0.identifier
   * @param {string} param0.password
   */
  static async login({ identifier, password }) {
    const user = await User.findByIdentifier(identifier);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.code = "INVALID_CREDENTIALS";
      throw err;
    }

    const isValid = await User.comparePassword(password, user.passwordHash);
    if (!isValid) {
      const err = new Error("Invalid credentials");
      err.code = "INVALID_CREDENTIALS";
      throw err;
    }

    const token = this.generateToken(user);

    return {
      token,
      user: User.safeUser(user),
    };
  }

  /**
   * ساخت توکن JWT
   * @param {object} user
   */
  static generateToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        role: user.role.name,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
}

export default AuthService;
