const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const GEMINI_API_KEY = "AIzaSyBy8i_3JxdbP0VSrQskoQCuOgoC8KoglKo";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shalini@1304",
  database: "placeprep"
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected...");
  }
});

const bcrypt = require("bcrypt");

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, hashedPassword, role], (err, result) => {
    if (err) return res.json({ message: "Error occurred" });
    res.send("User Registered Successfully");
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.send(err);

    if (result.length === 0) {
      return res.json("User doesn't exist");
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json("Wrong password");
    }

    res.json({
      message: "Login successful",
      role: user.role,
      name: user.name,
      email: user.email
    });
  });
});
app.post("/save-result", (req, res) => {
    const { email, quiz_name, score } = req.body;

    const sql = "INSERT INTO quiz_progress (email, quiz_name, score) VALUES (?, ?, ?)";

    db.query(sql, [email, quiz_name, score], (err) => {
        if (err) return res.json("Error saving result");

        res.json("Result saved");
    });
});

app.post("/ask", async (req, res) => {
    const userQuestion = req.body.question;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: userQuestion }]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        console.log(data); // 🔥 VERY IMPORTANT (for debugging)

        if (!data.candidates) {
            return res.json({ answer: "No response from AI" });
        }

        const answer = data.candidates[0].content.parts[0].text;

        res.json({ answer });

    } catch (error) {
        console.log(error);
        res.json({ answer: "Error getting response from server" });
    }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

