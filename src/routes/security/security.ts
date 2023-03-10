import { MongoDBConn } from '@dao/MongoDBConn';
import { UserDao } from '@dao/models/Users/UserDao';
import { Users } from '@server/libs/Users/Users';
import express from 'express';
const router = express.Router();

const userDao = new UserDao(MongoDBConn);
let users:Users;
userDao.init().then(()=>{
  users = new Users(userDao);
});

router.post('/signin',async (req,res) => {
    try {
        const {email,password} = req.body;
        const newUser = await users.newUser(email,password);
        res.status(200).json({msg: `User created with id ${newUser._id}`});

    } catch (error) {
        console.error("/signin error", error);
        res.status(505).json({error: "Error to create new user"});
        
    }

});

router.post('/signon', async (req,res) =>{
    try {
        const {email,password} = req.body;
        const token = await users.loginUser(email,password);
        res.status(200).json(token);

    } catch (error) {
        console.error("/signin error", error);
        res.status(505).json({error: "Error to create new user"});
        
    }
    
})
export default router;