import passport from 'passport';
import GitHubStrategy from 'passport-github';
import LocalStrategy from 'passport-local';
import UserManager from '../dao/UserManager.js';
import { hashPassword } from '../utils.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserManager.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use('local-register', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const { nombre, apellido } = req.body;

    try {
      const existingUser = await UserManager.findOne({ email });

      if (existingUser) {
        return done(null, false, { message: 'El correo electrónico ya está registrado' });
      }

      // Encripta la contraseña utilizando la función de utils.js
      try {
        const hashedPassword = await hashPassword(password);
        const newUser = new UserManager({ email, password: hashedPassword, nombre, apellido });

        await newUser.save();
        return done(null, newUser);
      } catch (hashError) {
        return done(hashError);
      }
    } catch (error) {
      return done(error);
    }
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile._json.email;

    // Busca el usuario en la base de datos por su email
    const user = await UserManager.findOne({ email });

    if (user) {
      // El usuario ya existe, puedes autenticarlo
      return done(null, user);
    } else {
      // Si no existe crea una nueva cuenta
      const newUser = new UserManager({
        email: email,
      });

      await newUser.save();
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
}));

export default passport;