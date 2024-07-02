const pool = require("./db");

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables", error);
  } finally {
    client.release();
    pool.end();
    process.exit(0); // Ensure the process exits after completion
  }
};

createTables();
