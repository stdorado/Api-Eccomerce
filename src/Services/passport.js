import passport from 'passport';
import GoogleStrategy from "passport-google-oauth20"
import LocalStrategy from 'passport-local';
import UserManager from '../dao/DaoDataBase/UserManager.js';
import { hashPassword } from '../utils.js';

passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const userDB = await UserManager.getUserByEmail(email);
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
    const { first_Name, last_Name } = req.body;
    try {
      const userDB = await UserManager.getUserByEmail(email);
      if (userDB) {
        return done(null, false, { message: 'El correo electrónico ya está registrado' });
      }

      const hashedPassword = await hashPassword(password);
      const newUser = new User({
        email,
        password: hashedPassword,
        first_Name,
        last_Name,
        role: 'User', 
      });

      await newUser.save();
      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
));
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserManager.getUserByEmail(profile.emails[0].value);

    if (!user) {
      user = await UserManager.createOne({
        googleId: profile.id,
        email: profile.emails[0].value,
        first_Name: profile.name.givenName ? profile.name.givenName : 'First name not provided',
        last_Name: profile.name.familyName ? profile.name.familyName : 'Last name not provided',
      });
    }

    return done(null, user);
  } catch (err) {
    console.error(`Error en la autenticación con Google: ${err.message}`);
    return done(err);
  }
}));

//serializadores
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserManager.getUserByEmail(id);
    done(null, {
      id: user.id,
      email: user.email,
      first_Name: user.first_Name,
      last_Name: user.last_Name,
    });
  } catch (err) {
    done(err);
  }
});

export default passport;