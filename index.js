const express = require("express");
const mongoose = require("mongoose");
const DemoModel = require("./Schema/schema");
const upload = require("./multerConfig"); // Import Multer configuration
require("./Connections/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// GET route to retrieve data
app.get("/", async (req, res) => {
  try {
    const data = await DemoModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to add a new user with file upload
app.post("/add", upload.single('avatar'), async (req, res) => {
  try {
    const { name, email } = req.body;
    const avatar = req.file.path; // Get the path of the uploaded file
    const newUser = new DemoModel({ name, email, avatar });
    await newUser.save();
    res.redirect("/");
  } catch (error) {
    res.status(400).send("Error adding user");
  }
});

// PATCH route to update data
app.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updatedData = req.body;

    const updatedUser = await DemoModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    console.log(updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).send("Update error");
  }
});

// DELETE route to delete a user
app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await DemoModel.findByIdAndDelete(id);
    console.log(deleteUser);
    res.json(deleteUser);
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).send("Delete error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
