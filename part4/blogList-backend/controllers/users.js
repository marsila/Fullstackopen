const bcrypt = require('bcrypt')
const usersRouter =require('express').Router()
const User = require('../models/user')
const { error } = require('../utils/logger')

usersRouter.post('/',async(request,response)=> {
    const {username,name,password}=request.body
    console.log(`password length: ${password.length}`);
    if(password.length < 3){
        return response.status(400).json({error:`password must be at least 3 characters long`})
    }
    const passwordHash = await bcrypt.hash(password,10)

    const user = new User({username,name,passwordHash})

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

usersRouter.get('/',async(request,response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.get('/:id',async(request,response) => {
    const users = await User.findById(request.params.id).populate('blogs')
    response.json(users)
})

module.exports = usersRouter

