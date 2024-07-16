const jwt = require("jsonwebtoken");
const {pool} = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = result.rows[0];

      if (!user) {
        return res.status(404).json({ msg: "User tidak ditemukan" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(404).json({ msg: "Password salah" });
      }

      const accessToken = jwt.sign(
        { user_id: user.id, username, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10m",
        }
      );

      res.json({
        msg: "success login",
        token: accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: error.message,
      });
    }
  },
};
