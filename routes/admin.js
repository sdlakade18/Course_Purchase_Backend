const { Router } = require("express");
const adminMiddleware = require("../middleware/admin.js");
const router = Router();
const { Admin ,Course} = require("../db")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    await Admin.create({
        username:username,
        password:password
    })
    res.json({msg:"User created successfully"})

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware,async function(req, res) {
    // Implement course creation logic
    const course_title = req.body.title
    const desc = req.body.description
    const price = req.body.price
    const imagelink = req.body.imagelink;
    const newCourse = await Course.create({title:course_title,
        description:desc,
        price:price,
        imagelink:imagelink})
    res.json({
        msg: "The course created successfully "+newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
    res.json({
        courses : response
    })
});

module.exports = router;