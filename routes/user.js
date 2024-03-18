const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User , Course} = require("../db");
const adminMiddleware = require("../middleware/admin");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password
    await User.create({username,password})
    res.json({
        response:"Success!"
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.get('/courses', userMiddleware,async (req, res) => {
    // Implement listing all courses logic
   const courses_User =await  Course.find({})
   res.json({
    courses : courses_User
   })
});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId
    const userId = req.headers.username
    try{await User.updateOne({
        username:userId
    },{
            "$push":{
                purchasedCourses : courseId
            }
    })
    res.json({
        msg: "The course purchased successfully"
    })}catch(e){
        console.log(e)
    }

});

router.get('/purchasedCourses', userMiddleware,async (req, res) => {
    // Implement fetching purchased courses logic

    const user= await User.findOne({
        username: req.headers.username
    })
    const courses = await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    res.json({coursed_purchased:courses})
});

module.exports = router