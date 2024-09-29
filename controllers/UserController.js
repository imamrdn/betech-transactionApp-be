const http = require("http");
const bcrypt = require("../helpers/Hash");
const { sign: createToken } = require("../helpers/Jwt");
const userRepository = require("../repository/UserRepository");

class UserController {
  static async register(req, res) {
    const { fullname, username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password);

      const dataUser = await userRepository.register(
        fullname,
        username,
        email,
        hashedPassword
      );

      if (!dataUser) {
        return res.status(500).json({ message: "Failed to register account" });
      }

      const token = createToken({
        email: dataUser.email,
        id: dataUser.id,
      });

      return res.status(201).json({
        status: http.STATUS_CODES[201],
        message: "Account registered successfully",
        data: {
          user: {
            id: dataUser.id,
            fullname: dataUser.fullname,
            username: dataUser.username,
            email: dataUser.email,
            createdAt: dataUser.createdAt,
            updatedAt: dataUser.updatedAt,
          },
        },
        token: token,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const dataUser = await userRepository.selectByEmail(email);
      if (!dataUser) {
        return res.status(404).json({ message: "Email not found" });
      }

      const verifyPassword = await bcrypt.compare(password, dataUser.password);
      if (!verifyPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = createToken({
        email: dataUser.email,
        id: dataUser.id,
      });

      return res.status(200).json({
        status: http.STATUS_CODES[201],
        message: "Login successfully",
        data: {
          user: {
            id: dataUser.id,
            fullname: dataUser.fullname,
            username: dataUser.username,
            email: dataUser.email,
          },
        },
        token: token,
      });
    } catch (error) {
      console.error("Error logging in user:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = UserController;
