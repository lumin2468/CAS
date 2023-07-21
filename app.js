const express = require('express');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan')
const path=require('path');
const ejs=require('ejs');
engine = require('ejs-mate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Import the Mongoose models
const {
  Department,
  Directorate,
  District,
  BankDetails,
  Scheme,
  CashBookRegister,
  CashBookEntry,
  Fund,
  User,
  FinancialYear,
  Designation
} =require('./models/schema')


// Create the Express app
const app = express();
app.use(morgan('tiny'))
app.use(express.json())
app.use(mongoSanitize())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')))
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Admin:8r2orA6FnbbZZXOS@cluster0.s121j0z.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define routes
app.get('/cas', (req, res) => {
  res.render('index');
});


app.post('/cas/login', [
  body('email').isEmail(),
  body('password').notEmpty(),
  body('userType').notEmpty(),
], async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, userType } = req.body;
    console.log(req.body.userType);

      // Find the designation by name
      const designation = await Designation.findOne({ name: userType });
      if (!designation) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Find the user by email and designation
      const user = await User.findOne({ email, designation: designation._id }).populate('designation');
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        designation: user.designation,
      },
    };
    
    jwt.sign(payload, 'LCu7Ugc54QD3pbaD52pbSIa45tkgbqLT', { expiresIn: '1h' }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// // Example route to get all departments
app.get('/cas/departments', async (req, res) => {
  try {
    const departments = await Department.find()
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/cas/departments', async (req, res) => {
  try {
    console.log(req.body)
    const {name}=req.body
    const departments = new Department({name})
    departments.save()
    res.send(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/cas/departments/:id', async (req, res) => {
  try {
    console.log(req.params)
    const {id}=req.params
    console.log(id)
    res.status(200).json("working");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/cas/directorate', async (req, res) => {
  try {
   
    const directorate = await Directorate.find()
    const departments = await Department.find()
    const data=[directorate, departments]
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// ... Define more routes for other resources ...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
