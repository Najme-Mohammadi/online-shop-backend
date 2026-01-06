import AuthService from "./auth.service.js";
async function register(req, res) {
  try {
    const { email, password, username } = req.body;

    // validation حداقلی (وظیفه کنترلر)
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await AuthService.register({
      email,
      password,
      username,
    });

    return res.status(201).json(result);
  } catch (err) {
    if (err.code === "EMAIL_EXISTS") {
      return res.status(400).json({ error: "Email already exists" });
    }

    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ error: "Identifier and password are required" });
    }

    const result = await AuthService.login({ identifier, password });

    return res.status(200).json(result);
  } catch (err) {
    if (err.code === "INVALID_CREDENTIALS") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
export default {
  register,
  login
}