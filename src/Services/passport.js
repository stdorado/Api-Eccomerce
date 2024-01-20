import passport from 'passport';
import GoogleStrategy from "passport-google-oauth20"
import LocalStrategy from 'passport-local';
import UserManager from '../dao/DaoDataBase/UserManager.js';
import { hashPassword } from '../utils.js';
import bcrypt from "bcrypt"

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_SECRET_GOOGLE,
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
            fromGoogle: true,
          });
        } else {
          if (!user.fromGoogle) {
            user.fromGoogle = true;
            await user.save();
          }
        }

        return done(null, user);
      } catch (err) {
        console.error(`Error en la autenticación con Google: ${err.message}`);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserManager.findById(id);

    if (!user) {
      return done(null, false); // Usuario no encontrado
    }

    let userInfo = {};
    if (user.fromGoogle) {
      userInfo = {
        id: user.id,
        email: user.email,
        first_Name: user.first_Name,
        last_Name: user.last_Name,
        authMethod: 'Google',
      };
    } else {
      userInfo = {
        id: user.id,
        email: user.email,
        first_Name: user.first_Name,
        last_Name: user.last_Name,
        authMethod: 'Local',
      };
    }

    done(null, userInfo);
  } catch (err) {
    done(err);
  }
});

export default passport;