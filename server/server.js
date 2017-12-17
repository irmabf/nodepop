'use strict';
const _ = require('lodash');
const express = require('express');
const bodyParser= require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Ad} = require('./models/Ad');
const {User} = require('./models/User');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//ADs routes

/**Post new ad */

app.post('/ads', authenticate,(req, res)=>{
    var ad = new Ad({
        name: req.body.name,
        sale:req.body.sale,
        price:req.body.price,
        _seller: req.user._id

    });

    ad.save().then((doc)=>{
        res.send(doc);
    }, (e)=>{
        res.status(400).send(e);
    });
});

/**Get all ads */

app.get('/ads', authenticate, (req,res)=>{
    Ad.find().then((ads)=>{
        res.send(ads);
    },(e)=>{
        res.status(400).send(e);
    });
});

/**Get ad by id */
app.get('/ads/:id',(req,res)=>{
    var id = req.params.id;

   if (!ObjectID.isValid(id)){
       return res.status(404).send();
   }

   Ad.findById(id).then((ad)=>{
        if(!ad){
            return res.status(404).send();
        }

        res.send({ad});
   }).catch((e)=>{
       res.status(400).send();
   });
});

/**Get delete ads by id */

app.delete('/ads/:id', (req, res)=>{
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Ad.findByIdAndRemove(id).then((ad)=>{
        if (!ad){
            return res.status(404).send();
        }
        res.send({ad});
    }).catch((e)=>{
        res.status(400).send();
    });
});

//POST /users

/**Post users */
app.post('/users', (req,res)=>{
    var body = _.pick(req.body,['name','email','password']);
    var user = new User(body);

    user.save().then(()=>{
        return user.generateAuthToken();
     
    }).then((token)=>{
        res.header('x-auth', token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
});


/**Get current user */
app.get('/users/me', authenticate, (req,res)=>{
   res.send(req.user);
});

//POST /users/login {email,password}

/**Post login */

app.post('/users/login', (req,res)=>{
    var body = _.pick(req.body,['email','password']);
    
    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user);  
        });
    }).catch((e)=>{
        res.status(400).send();
    });
});

/**Delete current user */
app.delete('/users/me/token', authenticate, (req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
    });
});

app.listen(port, ()=>{
    console.log(`App started at port ${port}`);
});

module.exports = {app};