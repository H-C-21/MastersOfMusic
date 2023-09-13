const express = require("express");
const {register , forgotPassword , Privacy , coursepage , coursedescpage , instructor , header , spotlight , aboutus , rockcoursedesc ,beginnercoursedesc , description , faq , profile , instructor2 , freelessons , catalogue  ,purchasedhomepage , homepage,uploadcourse, query } = require("../controllers/userController.js");

const router = express.Router();

router.post("/submit", register);

router.get('/forgotPassword' , forgotPassword);
router.get('/Privacy' , Privacy);

router.get('/coursepage' , coursepage);

router.get('/coursedescpage' , coursedescpage);


router.get('/header' , header);

router.post('/create-course',uploadcourse);
router.get('/aboutus' , aboutus);

// router.get('/teacher-profile', teacher-profile);

// router.get('/student-profile', student-profile);

// router.get('/upload-course', upload-course);

router.get('/rockcoursedesc' , rockcoursedesc);

router.get('/beginnercoursedesc' , beginnercoursedesc);

router.get('/description' , description);

router.get('/faq' , faq);
router.get('/profile' , profile);

router.get('/instructor2' , instructor2);

router.get('/freelessons' ,freelessons )

router.get('/catalogue' , catalogue);

router.post('/connect',query);

router.get('/homepage' , homepage);

router.get('/purchase/homepage' , purchasedhomepage);

module.exports = router;
