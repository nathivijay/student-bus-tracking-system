import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/CURD", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected succesful.");
  })
  .catch((e) => console.log(e));

const StudentSchema = new mongoose.Schema({
  student_pin: { type: Number, required: true },
  student_name: { type: String, required: true },
  bus_number: { type: String, required: true },
  password: { type: String, required: true },
});

const AdminSchema = new mongoose.Schema({
  admin_pin: { type: Number, required: true },
  admin_name: { type: String, required: true },
  password: { type: String, required: true },
});

const BusSchema = new mongoose.Schema({
  bus_number: { type: String, required: true },
  driver_name: { type: String, required: true },
  location: { type: String, required: true },
});

// Create Models
const StudentModel = mongoose.model("students", StudentSchema);
const AdminModel = mongoose.model("admins", AdminSchema);
const BusModel = mongoose.model("buses", BusSchema);

//MiddleWare function for token authentication
const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "MY_SECRET_TOKEN", async (error, payload) => {
        if (error) {
          response.status(401);
          response.send("Invalid JWT Token");
        } else {
          request.username = payload.username;
          next();
        }
      });
    }
};

//MiddleWare function for role authentication
const authorizeRole = (requiredRole) => {
  return (request, response, next) => {
    if (request.role !== requiredRole) {
      response.status(403).send("Access Denied");
    } else {
      next();
    }
  };
};

// API 1 adding students
app.post("/add-student", async (req, res) => {
  try {
    const { student_pin, student_name, bus_number, password } = req.body;
    if (!student_pin || !student_name || !bus_number || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const student = await StudentModel.findOne({ student_pin });
    if (student) {
      return res.status(400).json({ error: "student already register" }); // User exist
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new StudentModel({
      student_pin,
      student_name,
      bus_number,
      password: hashedPassword,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// API 2 adding admin
app.post("/add-admin", async (req, res) => {
  try {
    const { admin_pin, admin_name, password } = req.body;
    if (!admin_pin || !admin_name || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const admin = await StudentModel.findOne({ admin_pin });
    if (admin) {
      return res.status(400).json({ error: "adim already register" }); // Admin exist
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminModel({
      admin_pin,
      admin_name,
      password: hashedPassword,
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// API 3 adding bus
app.post("/add-bus", async (req, res) => {
  try {
    const { bus_number, driver_name, location } = req.body;
    if (!bus_number || !driver_name || !location) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const bus = await StudentModel.findOne({ bus_number });
    if (bus) {
      return res.status(400).json({ error: "bus already register" }); // Bus exist
    }
    const newBus = new BusModel({ bus_number, driver_name, location });
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (error) {
    console.error("Error adding bus:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// API 4 get student details
app.get("/get-all-student-details", async (req, res) => {
  try {
    const students = await StudentModel.find({}, { password: 0 });
    res.json({ students });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// API 5 get admin deatils
app.get("/get-all-admin-deatils", async (req, res) => {
  try {
    const admins = await AdminModel.find({}, { password: 0 });
    res.json({ admins });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// API 6 get bus details
app.get("/get-all-bus-details", async (req, res) => {
  try {
    const buses = await BusModel.find();
    res.json({ buses });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// API 7 get all
app.get("/get-all-data", async (req, res) => {
  try {
    const students = await StudentModel.find({}, { password: 0 });
    const admins = await AdminModel.find({}, { password: 0 });
    const buses = await BusModel.find();

    console.log("Students:", students);
    console.log("Admins:", admins);
    console.log("Buses:", buses);

    res.json({ students, admins, buses });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// API 8 student login
app.post("/student-login", async (req, res) => {
  const { student_pin, password } = req.body;

  try {
    // Find the student by `student_pin`
    const student = await StudentModel.findOne({ student_pin });

    if (!student) {
      return res.status(404).json({ error: "Invalid User" }); // User doesn't exist
    }
    const isPasswordMatch = await bcrypt.compare(password, student.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid Password" }); // Password doesn't match
    }
    const payload = {
      student_pin: student_pin,
    };
    const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
    res
      .status(200)
      .json({
        message: "Login Successful",
        user: { student_pin, student_name: student.student_name },
        jwtToken,
      });
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API 9 admin login
app.post("/admin-login", async (req, res) => {
  const { admin_pin, password } = req.body;

  try {
    // Find the admin by `admin_pin`
    const admin = await AdminModel.findOne({ admin_pin });

    if (!admin) {
      return res.status(404).json({ error: "Invalid User" }); // User doesn't exist
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid Password" }); // Password doesn't match
    }
    const payload = {
      admin_pin: admin_pin,
    };
    const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
    res
      .status(200)
      .json({
        message: "Login Successful",
        user: { admin_pin, admin_name: admin.admin_name },
        jwtToken,
      });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API 10 delete Student
app.delete("/remove-student", async (req, res) => {
  const { student_pin } = req.body;
  try {
    const deletedStudent = await StudentModel.findOneAndDelete({ student_pin });

    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student removed successfully", deletedStudent });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API 11 delete Admin
app.delete("/remove-admin", async (req, res) => {
  const { admin_pin } = req.body;

  try {
    const deletedAdmin = await AdminModel.findOneAndDelete({ admin_pin });

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res
      .status(200)
      .json({ message: "Admin removed successfully", deletedAdmin });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API 12 delete Bus
app.delete("/remove-bus", async (req, res) => {
  const { bus_number } = req.body;

  try {
    const deletedBus = await BusModel.findOneAndDelete({ bus_number });

    if (!deletedBus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    res.status(200).json({ message: "Bus removed successfully", deletedBus });
  } catch (error) {
    console.error("Error deleting bus:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API 13 update student
app.put('/update-student', async (req, res) => {
  const { student_pin, bus_number } = req.body;

  try {
      const updatedStudent = await StudentModel.findOneAndUpdate(
          { student_pin }, // Find by student_pin
          { bus_number }, // Update these fields
          { new: true } // Return the updated document
      );

      if (!updatedStudent) {
          return res.status(404).json({ error: 'Student not found' });
      }

      res.status(200).json({ message: 'Student updated successfully', updatedStudent });
  } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API 14 update admin
app.put('/update-admin', async (req, res) => {
  const { admin_pin, admin_name } = req.body;

  try {
      const updatedAdmin = await AdminModel.findOneAndUpdate(
          { admin_pin }, // Find by admin_pin
          { admin_name }, // Update admin_name
          { new: true } // Return the updated document
      );

      if (!updatedAdmin) {
          return res.status(404).json({ error: 'Admin not found' });
      }

      res.status(200).json({ message: 'Admin updated successfully', updatedAdmin });
  } catch (error) {
      console.error("Error updating admin:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API 15 update bus
app.put('/update-bus', async (req, res) => {
  const { bus_number, driver_name, location } = req.body;

  try {
      const updatedBus = await BusModel.findOneAndUpdate(
          { bus_number }, // Find by bus_number
          { driver_name }, // Update these fields
          { new: true } // Return the updated document
      );

      if (!updatedBus) {
          return res.status(404).json({ error: 'Bus not found' });
      }

      res.status(200).json({ message: 'Bus updated successfully', updatedBus });
  } catch (error) {
      console.error("Error updating bus:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Bus Tracking

const busLocationSchema = new mongoose.Schema({
    driverId: String,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now },
});

const BusLocation = mongoose.model('BusLocation', busLocationSchema);

// API 16 updating bus location
app.put('/api/location', async (req, res) => {
  const { driverId, latitude, longitude } = req.body;
  console.log(latitude,longitude)
  console.log(driverId)
  try {
    const location = await BusLocation.findOneAndUpdate(
      { driverId }, // Find by bus_number
      { latitude, longitude }, // Update these fields
      { new: true } // Return the updated document
    );
    if (!location) {
      return res.status(404).json({ error: "Bus not found" });
    }
      res.status(200).json({ success: true });
  } catch (error) {
      res.status(500).json({ success: false, error });
  }
});

// API 17 getting bus loaction by id
app.get('/api/location/:driverId', async (req, res) => {
  const { driverId } = req.params;
  try {
      const location = await BusLocation.findOne({ driverId }).sort({ timestamp: -1 });
      res.status(200).json(location);
  } catch (error) {
      res.status(500).json({ success: false, error });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
