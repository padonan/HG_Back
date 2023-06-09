const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const logger = require("../../util/logger/logger");
const LocalStrategy = require("passport-local").Strategy;
const jwtUtils = require("../jwt/jwtUtils");
const { comparePassword } = require("../../util/encrypt/hashPassword");
const { storeTokensInRedis } = require("../redis/stroreTokensInredis");
const {
  googleOauthClientId,
  googleOauthSecurePassword,
  googleOauthRedirect,
} = require("../../config/dotenv");
const userServiceInstance = require("../../user/userServiceInstance");

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await userServiceInstance.login(username, password);
        if (!user) {
          return done(null, false);
        }
        const accessToken = jwtUtils.generateAccessToken(user);
        const refreshToken = jwtUtils.generateRefreshToken(user);
        await storeTokensInRedis(accessToken, refreshToken, user);
        return done(null, true, { accessToken, refreshToken });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: googleOauthClientId,
      clientSecret: googleOauthSecurePassword,
      callbackURL: googleOauthRedirect,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // TODO => Service logic
        // User.findOne({ email: profile._json.email })
        //   .then((existingUser) => {
        //     if (existingUser) {
        //       done(null, existingUser);
        //     } else {
        //       new User({ email: profile._json.email, name: profile._json.name, nickname: null, role:"user" })
        //         .save()
        //         .then((user) => done(null, user))
        //         .catch((err) => done(err, null));
        //     }
        //   })
        //   .catch((err) => done(err, null));

        const example = {
          id: 261651,
          name: null,
          nickname: null,
          email: profile._json.email,
          role: "user",
        };

        const accessTokenJwt = jwtUtils.generateAccessToken(example);
        const refreshTokenJwt = jwtUtils.generateRefreshToken(example);
        await storeTokensInRedis(accessTokenJwt, refreshTokenJwt, example);
        return done(null, example, { accessToken, refreshToken });
      } catch (error) {
        logger.error(error);
        return done(error, false);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: ,
//       clientSecret: ,
//       callbackURL: ,
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       return cb(err, user);
//     }
//   )
// );

// passport.use(
//   "instagram",
//   new InstagramStrategy(
//     {
//       clientID: instagramOauthClientId,
//       clientSecret: instagramOauthSecurePassword,
//       callbackURL: instagramOauthRedirect
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       logger.info(accessToken);
//       logger.info(refreshToken);
//       try {
//         // TODO => Service logic
//         // User.findOne({ email: profile._json.email })
//         //   .then((existingUser) => {
//         //     if (existingUser) {
//         //       done(null, existingUser);
//         //     } else {
//         //       new User({ email: profile._json.email, name: profile._json.name, nickname: null, role:"user" })
//         //         .save()
//         //         .then((user) => done(null, user))
//         //         .catch((err) => done(err, null));
//         //     }
//         //   })
//         //   .catch((err) => done(err, null));

//         const example = {
//           id: 261651,
//           name: null,
//           nickname: null,
//           email: profile,
//           role: "user",
//         };

//         const accessTokenJwt = jwtUtils.generateAccessToken(example);
//         const refreshTokenJwt = jwtUtils.generateRefreshToken(example);
//         await storeTokensInRedis(accessTokenJwt, refreshTokenJwt, example);
//         return done(null, example, { accessToken, refreshToken });
//       } catch (error) {
//         logger.error(error);
//         return done(error, false);
//       }
//     }
//   )
// );

module.exports = passport;
