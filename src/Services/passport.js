import passport from 'passport';
import GoogleStrategy from "passport-google-oauth2"
import LocalStrategy from 'passport-local';
import UserManager from '../dao/UserManager.js';
import { hashPassword } from '../utils.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const userDB = await UserManager.findByEmail(email);
      if (!userDB) {
        return done(null, false, { message: 'El correo electrónico no está registrado' });
      }
      const passwordMatch = await bcrypt.compare(password, userDB.password);
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      return done(null, userDB);
    } catch (error) {
      return done(error);
    }
  }
));
 
passport.use('register', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const { first_name, last_name } = req.body;
    try {
      const userDB = await UserManager.findByEmail(email);
      if (userDB) {
        return done(null, false, { message: 'El correo electrónico ya está registrado' });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = new UserManager({ email, password: hashedPassword, first_name, last_name });

      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
));

//estrategia google
passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/google/callback',
  passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
  try {
    const email = profile._json.email;

    const user = await UserManager.findOne({ email });

    if (user) {
      return done(null, user);
    } else {
      const newUser = new UserManager({
        email: email,
        googleId: profile.id,
        displayName: profile.displayName,
      });

      await newUser.save();
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
}));

//serialize un user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//deserialize un User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserManager.getById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


export default passport;