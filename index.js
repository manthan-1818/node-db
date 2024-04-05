const express = require("express");
const mongoose = require("mongoose");
const DemoModel = require("./Schema/user");
require("./Connections/db");
const upload = require('./config/multerConfig'); // Corrected file path
const Image = require('./Schema/image');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// GET route to retrieve data
app.get("/", async (req, res) => {
  try {
    const data = await DemoModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to add a new user
app.post("/add", async (req, res) => {
  try {
    console.log(req.body); 
    const { name, email } = req.body;

    // Check if name and email are provided
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const newUser = new DemoModel({ name, email });
    await newUser.save();
    res.redirect("/");
  } catch (error) {
    console.error("Add user error:", error.message);
    res.status(400).send(error.message);
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

// Upload file 
app.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Save the file to the upload folder
    const filePath = `uploads/${req.file.originalname}`;
    fs.writeFileSync(filePath, req.file.buffer);

    // Create a new image document
    const image = new Image({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      path: filePath, // Save the file path in the database
      image: req.file.buffer // Save the binary data in the database
    });

    // Save the image data to the database
    await image.save();

    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
