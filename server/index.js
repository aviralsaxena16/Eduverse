import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

// Constants
const GOOGLE_CLIENT_ID = "1048064892245-ru5mnl225peivhp9emsvhlj6qum1oo0m.apps.googleusercontent.com";
const JWT_SECRET = "Its Alright";

const app = express();
app.use(express.json());


const client = new OAuth2Client(GOOGLE_CLIENT_ID);

app.use(cors({
  origin: 'http://localhost:5174', // Ensure this matches your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());


await mongoose.connect('mongodb+srv://Aviral:aviral1947%40@eduversecluster.i3xl8.mongodb.net?retryWrites=true&w=majority&appName=EduverseCluster')
.then(() => console.log("Connected to database"))
.catch(err => console.log(err));

const verifyUser=(req,res,next)=>{
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  else{
    jwt.verify(token,'Its Alright',(err,user)=>{
      if(err) return res.status(403).json({ message: 'Token is not valid' });
      req.user = user;
      next();
    })
  }
}

app.get('/home',verifyUser,(req,res)=>{
  return res.send('Success')
})

 app.post('/register', (req, res) => {
  const { name,email, password } = req.body;
  
  // Check if the user already exists
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("Already registered");
      } 
      
      else {
        bcrypt.hash(password,10)
         .then(hashedPassword => {
        User.create({ name:name,email: email, password: hashedPassword})
         .then(newUser => res.json(newUser))
         .catch(err => console.log(err));

 }) }})
    .catch(err => console.log(err));
  })


  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                const token = jwt.sign({ email: user.email }, 'Its Alright', { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true, secure: false });
                res.json("Login successful!");
              } else {
                res.json("Wrong password");
              }
            })
            .catch(err => {
              console.error("Error comparing passwords:", err);
              res.status(500).json("Internal server error");
            });
        } else {
          res.json("No records found!");
        }
      })
      .catch(err => {
        console.error("Error finding user:", err);
        res.status(500).json("Internal server error");
      });
  });


  app.post('/auth/google/callback', async (req, res) => {
    try {
        const { token } = req.body;      
        if (!token) {
            return res.status(400).json({ success: false, message: "Token is required" });
        }
        
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        const { name, email, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
          console.log(picture);
            user = new User({
                name,
                email,
                googleId: payload.sub,
                picture,
                password: ""
            });
            await user.save();
        }

        // Use the same JWT_SECRET as other routes
        const authToken = jwt.sign(
            { id: user._id }, 
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', authToken, { httpOnly: true, secure: false });
        res.json({
            success: true,
            token: authToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });
            
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(400).json({ 
            success: false, 
            message: "Google login failed",
            error: error.message 
        });
    }
});


app.post('/logout',(req,res)=>{
  res.clearCookie('token');
  res.json('Logged out successfully!');
 });

 

function bestmove(board){
    const available = board.map((cell,i)=>cell===''?i:null).filter((cell)=>cell!==null)
    if(available.length===0) return null
    let n=available.length
    return available[Math.floor(Math.random()*available.length)]
}

app.post('/move', (req, res) => {
  const { board } = req.body;
  const aiMove = bestmove(board);
  res.json({ move: aiMove });
});



app.listen(4507,()=>{
    console.log("Server is running on http://127.0.0.1:4507");
});