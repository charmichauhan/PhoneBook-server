var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var React = require('react');
var app = express();
require('babel-core/register');
var randtoken = require('rand-token');
var Temps = require('./models/token');
var _ = require('lodash');
// var passport = require('passport'),
//     LocalStrategy = require('passport-local');
// var expressSession = require('express-session');
// var flash = require('flash');

// app.use(expressSession({secret: 'mySecretKey'}));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(cors());
// app.use(require('flash')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '')));
// app.use(passport.initialize());

//*******************passport************************
//
// passport.serializeUser(function(user, done) {
//     done(null, user._id);
// });
//
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
// app.post('/data', passport.authenticate('signup', {
//         successRedirect: '/',
//         failureRedirect: '/data'
//     })
// );

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
// app.post('/login/data', passport.authenticate('login', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/login/data'
//     })
// );

//********Registration**************
// const MONGODB_URI = 'mongodb://charmic:lanetteam1@ds257627.mlab.com:57627/logindemo';
// mongoose.connect(MONGODB_URI);
mongoose.connect('mongodb://localhost:27017/PhoneBook');
const User=require('./models/user.js');

// var createHash = function(password){
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
// }
// passport.use('signup', new LocalStrategy({
//         passReqToCallback : true
//     },
//     function(req, res, username, password, done) {
//         findOrCreateUser = function(){
//             // find a user in Mongo with provided username
//             User.findOne({'email':req.body.email},function(err, user) {
//                 // In case of any error return
//                 if (err){
//                     console.log('Error in SignUp: '+err);
//                     return done(err);
//                 }
//                 // already exists
//                 if (user) {
//                     console.log('User already exists');
//                     res.send({message: "created", data: user});
//                     // return done(null, false,
//                     //     req.flash('message','User Already Exists'));
//                 } else {
//                     // if there is no user with that email
//                     // create the user
//                     var user = req.body;
//                     console.log('user', user)
//                     const newUser = new User(user);
//                     // Generate a 32 character alpha-numeric token:
//                     var token = randtoken.generate(32);
//                     newUser.token = token;
//                     console.log('newUSer',newUser);
//                     // set the user's local credentials
//                     // newUser.username = username;
//                     // newUser.password = createHash(password);
//                     // newUser.email = req.param('email');
//                     // save the user
//                     // newUser.save(function(err) {
//                     //     if (err){
//                     //         console.log('Error in Saving user: '+err);
//                     //         throw err;
//                     //     }
//                     //     console.log('User Registration succesful');
//                     //     return done(null, newUser);
//                     // });
//
//                     newUser.save(function (err, result) {
//                         if (err) {
//                             return res.send({msg: err});
//                         } else {
//                             //res.send({msg: "Registered successfully", user: newUser})
//                             console.log('Registered successfully')
//                             // Create a verification token for this user
//                             var token = new Temps();
//                             token._userId = result._id;
//                             token.token = result.token;
//                             console.log('saved---', token.token);
//                             // Save the verification token
//                             token.save(function (err) {
//                                 if (err) {
//                                     return res.send({msg: err});
//                                 }
//                                 console.log('saved----', token)
//                             });
//                         }
//                     });
//                 }
//             });
//         };
//
//         // Delay the execution of findOrCreateUser and execute
//         // the method in the next tick of the event loop
//         process.nextTick(findOrCreateUser);
//     })
// )

app.post('/data', function(req, res) {
    var user = req.body;
    console.log('user', user)
    const newUser = new User(user);
    // Generate a 32 character alpha-numeric token:
    var token = randtoken.generate(32);
    newUser.token = token;
    console.log('newUSer',newUser);

    User.findOne({firstName: req.body.firstName}, function (err, result) {
        if (err) {
            return res.send(err)
        }
        console.log('result', result)
        if (result === null) {
            newUser.save(function (err, result) {
                if (err) {
                    return res.send({msg: err});
                } else {
                    //res.send({msg: "Registered successfully", user: newUser})
                    console.log('Registered successfully')
                    // Create a verification token for this user
                    var token = new Temps();
                    token._userId = result._id;
                    token.token = result.token;
                    console.log('saved---', token.token);
                    // Save the verification token
                    token.save(function (err) {
                        if (err) {
                            return res.send({msg: err});
                        }
                        console.log('saved----', token)
                    });
                }
            });
        } else {
            res.send({msg: 'already exist'})
        }
        console.log('result2---',result);
    })
});

//----------------------- put

app.put('/data/:id',function (req, res) {
    var test = req.body ;
    console.log('req.body', req.body);
    var query = req.params.id;
    var update = {
        '$set':
            {
                firstName: test.firstName,
                lastName: test.lastName,
                password: test.password,
                PhoneNumber:test.PhoneNumber,
                DOB: test.DOB
            }};
    var options = {new : true};
    User.findOneAndUpdate(query, update, options, function (err, test2) {
        if(err){
            throw err;
        }
        res.json(test2)
    })
});
app.get('/data/:id',function (req, res) {
    User.find({_id: req.params.id},function (err,result) {
        if(err){
            return res.send({msg:err});
        }
        res.send({user:result});
    })
})

//---------------get Data
app.get('/data',function (req,res) {
    User.find(function (err,test1) {
        if(err)
        {
            throw err;
        }
        res.send(test1);
    });
});

//------------------Delete Data
app.delete('/data/:id',function (req,res) {
    var query={_id:req.params.id};
    User.remove(query,function (err,test1) {
        if(err)
        {
            console.log("# API delete Error",err);
        }
        res.json(test1);
    });
});

app.get('/data/:id',function (req, res) {
    User.find({_id: req.params.id},function (err,result) {
        if(err){
            return res.send({msg:err});
        }
        res.send({user:result});
    })
});

//*******************Login***********************

// var isValidPassword = function(user, password){
//     return bcrypt.compareSync(password, user.password);
// }
// passport.use('login', new LocalStrategy({
//         passReqToCallback : true
//     },
//     function(req, username, password, done) {
//         // check in mongo if a user with username exists or not
//         console.log('----=====')
//         User.findOne({ email:  req.body.email },
//             function(err, user) {
//                 console.log('----=====')
//                 // In case of any error, return using the done method
//                 if (err)
//                     return done(err);
//                 // Username does not exist, log error & redirect back
//                 if (!user){
//                     console.log('User Not Found with email ');
//                     return done(null, false,
//                         req.flash('message', 'User Not found.'));
//                 }
//                 // User exists but wrong password, log the error
//                 if (!isValidPassword(user, password)){
//                     console.log('Invalid Password');
//                     return done(null, false,
//                         req.flash('message', 'Invalid Password'));
//                 }
//                 console.log('----=====')
//                 // User and password both match, return user from
//                 // done method which will be treated like success
//                 user.token = randtoken.generate(32);
//                 user.save(function (err, res, result) {
//                     if (err) {
//                         return res.send({msg: err.message});
//                     }
//                     console.log("Successful login.");
//                     var token = new Temps();
//                     token._userId = result._id;
//                     token.token = result.token;
//                     console.log('token', token)
//                     console.log('saved---', token._userId);
//                     console.log('newuser', result.token)
//                     // Save the verification token
//                     res.send({user: user.toJSON(), token: result.token, msg: "successful login"});
//                 });
//
//                 return done(null, user);
//             }
//         );
//     }));

app.post('/login/data', function(req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (!user) {
            return res.send({msg: 'The username ' + req.body.username + ' is invalid'});
        }
        user.token = randtoken.generate(32);
        user.save(function (err, result) {
            if (err) {
                return res.send({msg: err.message});
            }
            console.log("Successful login.");
            var token = new Temps();
            token._userId = result._id;
            token.token = result.token;
            console.log('token', token)
            console.log('saved---', token._userId);
            console.log('newuser', result.token)
            // Save the verification token
            res.send({user: user.toJSON(), token: result.token, msg: "successful login"});
        });
    });
});

app.listen(5500,function (err) {
    if(err){
        return console.log(err);
    }
    console.log("API Server Is running on 5500");
});
module.exports = app;