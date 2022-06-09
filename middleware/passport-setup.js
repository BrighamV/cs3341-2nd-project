const dotenv = require('dotenv');
const passport = require('passport');
const mongodb = require('../db/connect');


const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

module.exports = function(passport){
    passport.use(
        new GoogleStrategy({
        //options for the google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'

        },
        async (acessToken, refreshToken, profile, done) => {
            // passport callback function
            console.log(profile)
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                image: profile.photos[0].value
            }


            // console.log("user google id", newUser.googleId)
            // try {
                let user = await mongodb
                .getDB()
                .db()
                .collection('contacts')
                .findOne({ googleId: newUser.googleId })

                // console.log("user",user)

                if(user) { 
                    done(null, user)
                } else {
                    let user = await mongodb
                    .getDB()
                    .db()
                    .collection('contacts')
                    .insertOne(newUser);
                    
                    done(null, user)
                }

            // } catch {
            //     console.error(err)
            // }

        })
    )
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}