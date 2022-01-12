const db = require("../Shared/mongo");

const bcrypt = require("bcrypt");

const services = {

    async register(req, res){
        try {
        
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
          
            console.log("registerUser method is called");
            let result = await db.users.find({},{id : 1, _id : 0})
                                        .sort({id : -1}).limit(1)
                                        .toArray();
            
            console.log(result[0].id);
            let newId = result[0].id + 1;

            const data = await db.users.insertOne({id : newId, ...req.body});
            console.log(data);
           
           // res.send({id : newId, ...req.body});
           res.end("You are Registered Successfully. Please login and continue.")
        } catch (error) {
            console.log("Error while registering user : ", error);
            res.sendStatus(500);  
        }
    },

    async login(req, res){
        try {
           
            console.log("Login menthod is called.");
            //Check EmailId exists or not
            const user  = await db.users.findOne({email : req.body.email});
            console.log(user);
            if(!user)
                return res.send({message : "User does not exists"});

            //Compare password
            const isValid = await bcrypt.compare(req.body.password, user.password);
            console.log(isValid);

            if(!isValid)
              return res.send({message : "Email or Password Invalid"});

            res.send({message : "Logged in Successfully", userId : user.id, name : user.name}); 
           
        } catch (error) {
            console.log("Error while login user : ", error);
            res.sendStatus(500);  
        }
    }  


}

module.exports = services;
