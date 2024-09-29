const { User } = require("../models");

class UserRepository {
  static async register(fullname, username, email, password) {
    try {
      const newUser = await User.create({
        fullname,
        username,
        email,
        password,
      });
      return newUser;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  static async selectByEmail(email) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  }
}

module.exports = UserRepository;
