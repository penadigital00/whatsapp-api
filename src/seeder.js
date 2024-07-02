const pool = require("./db");
const bcrypt = require("bcrypt");

const seedData = async () => {
  const client = await pool.connect();
  try {
    const saltRounds = 10;
    const hashedPassword1 = await bcrypt.hash("password1", saltRounds);
    const hashedPassword2 = await bcrypt.hash("password2", saltRounds);
    const hashedPassword3 = await bcrypt.hash("password3", saltRounds);

    await client.query(
      `
      INSERT INTO users (username, email, password) VALUES
      ('user1', 'user1@example.com', $1),
      ('user2', 'user2@example.com', $2),
      ('user3', 'user3@example.com', $3)
      ON CONFLICT (username) 
      DO UPDATE SET 
        email = EXCLUDED.email, 
        password = EXCLUDED.password,
        updated_at = NOW();
    `,
      [hashedPassword1, hashedPassword2, hashedPassword3]
    );

    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data", error);
  } finally {
    client.release();
    pool.end();
    process.exit(0); // Ensure the process exits after completion
  }
};

seedData();
