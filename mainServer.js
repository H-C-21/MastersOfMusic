const userSchema = require(__dirname + "/models/user.js");
const contactSchema = require(__dirname + "/models/contact.js");
const teacherSchema = require(__dirname + "/models/teacher.js");
const coursesSchema = require(__dirname + "/models/course.js");
const userRoute = require('./routes/userRoutes.js');
const bodyParser = require("body-parser");

const express = require('express');
const path = require('path');
const app = express();
const ejs = require("ejs");

const mongoose = require("mongoose");
const connectDb = require('./data/db.js');
const session=require("express-session");

const { homedir } = require('os');
const user = require('./models/user.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(express.json());



app.set("view engine", "ejs");
app.set('views','./views');
connectDb();
app.use(session({
    secret: "Key sign",
    resave: false,
    saveUninitialized: false,
    
}))

app.use((req,res,next)=>{
    if(req.session.isLoggedin){
        if(req.session.role==="user"){
        id = req.session.user._id
        userSchema.findOne({_id: id}).then((current) =>{
            req.session.user = current
            return next()
        })
    }

    if(req.session.role==="teacher"){
        id = req.session.user._id
        teacherSchema.findOne({_id: id}).then((current) =>{
            req.session.user = current
            return next()
        })
    }

    

}
    else{
        req.session.isLoggedin = false
        return next()
    }
})


app.get("/login", (req, res) => {
    
    if(req.session.isLoggedin == true){
    res.redirect("/");
    }
    else{
        res.render("login", { error: null });
    
    }
})
app.get('/upload-course', (req, res) => {
    return res.render('upload-course');
})
app.get('/register', (req, res) => {

     
    if(req.session.isLoggedin == true){
    res.render("homepage", {user:req.session.user,auth:true});
    }
    else{
        res.render("register", { user: null, error: null,auth:false });
    }
    

})

app.get('/hhh', (req,res) => {
    res.render('homeheader')
})

app.get('/wishlist', (req, res) => {
    if (req.session.isLoggedin == true){
        
         userSchema.findOne({username : req.session.user.username}).then( user =>  {
            
            user.populate({
                path: 'wishlist',
                populate:{
                    path: 'teacher'

                }
            }).then(()=>{
                
            res.render('wishlist',{user: user})
        })}
        )}
        
    

    else res.render("login", { error: null });
})

app.get('/yourcourses', (req, res) => {
    if (req.session.isLoggedin == true){
        
         userSchema.findOne({username : req.session.user.username}).then( user =>  {
            
            user.populate({
                path: 'purchased',
                populate:{
                    path: 'teacher'

                }
            }).then(()=>{
                
            res.render('yourcourses',{user: user})
        })}
        )}
        
    

    else res.render("login", { error: null });
})

app.get('/instructor', async (req, res) => {
    if(req.session.isLoggedin == true){
        res.render("instructor",{user:req.session.user,auth:req.session.isLoggedin});
        }
        else{
            res.render("instructor",{auth:false})
        }
})

app.get("/spotlight", async (req, res) => {
        if(req.session.isLoggedin){
            res.render("spotlight",{user:req.session.user,auth:true});
        }
        else{
            res.render("spotlight",{auth:false})
        }
})


app.get("/add-to-wl/:course", async (req, res) => {
    if(req.session.isLoggedin){
        
        courseid = req.params.course
        
        
        
        user2 = req.session.user
        
        wishlist = user2.wishlist
        ind = wishlist.indexOf(courseid)
        
        if(ind == -1){
            wishlist.push(courseid)
        }

        if(user2.purchased.indexOf(courseid) == -1){
        
        await userSchema.findByIdAndUpdate(user2._id,{wishlist:wishlist},{new:true}).then(()=>{
                    console.log("Added To Wishlist")
                    res.redirect("/coursedescpage/"+courseid)
                }
            )}
        
        else{
            res.redirect("/coursedescpage/"+courseid)
        }
                
        

    }
    else{
        res.render('login', { error: null });
    }

})

app.get("/", (req, res) => {
    // req.session.isLoggedin
    if(req.session.isLoggedin == true){
        res.render("homepage",{user:req.session.user,auth:req.session.isLoggedin});
        }
        else{
            res.render("homepage",{auth:false})
        }
})

app.get("/homepage", (req, res) => {
    // req.session.isLoggedin
    if(req.session.isLoggedin == true){
        res.render("homepage",{user:req.session.user,auth:req.session.isLoggedin});
        }
        else{
            res.render("homepage",{auth:false})
        }
})




app.get("/contactus", (req, res) => {
    
    if(req.session.isLoggedin == true){
        res.render("contactus",{user:req.session.user,auth:req.session.isLoggedin});
        }
        else{
            res.render("contactus",{auth:false})
        }
});

app.get("/checkout", (req, res) => {
    if(req.session.isLoggedin == true){
    res.render("homepage",{user:req.session.user,auth:req.session.isLoggedin});
    }
    else
    res.render("login",{error: null})
})

app.get("/checkout/:coursename", (req, res) => {
    
    if(req.session.isLoggedin == true){
    user1 = req.session.user
    courseid = req.params.coursename

    coursesSchema.findOne({_id: courseid}).then((doc) => {
        if (!doc) {
            res.render("/")  // 404 page sey replace krdena
        } else{
            
            doc.populate('teacher','fullname').then((fin1)=>{
            res.render("checkout",{user: req.session.user,course:fin1})     
        })}
    });     
}

    else
    res.render("login",{error: "You must be logged in"})
})

app.post("/remove-wishlist/:Id",async (req,res)=>{
    
    
    cid = req.params.Id
    
    await coursesSchema.findOne({_id : cid}).then((purchased_course)=>{
        if(!purchased_course){
                res.render("homepage",{user:req.session.user,auth:req.session.isLoggedin})
            }
            else{
                doc = req.session.user
                let wishlist = doc.wishlist
                
                    let index = wishlist.indexOf(purchased_course._id);
                    wl1 = wishlist.splice(index, 1);
                    
                    userSchema.findByIdAndUpdate(doc._id,{wishlist:wishlist},{new:true}).then(()=>{
                   
                    userSchema.findOne({username : doc.username}).then(user =>  {
                        user.populate({
                            path: 'wishlist',
                            populate:{
                                path: 'teacher'
                            }
                        }).then(()=>{                           
                            return res.json({message:"Removed From Wishlist", status: 201})
                    })
                })
                    
                    
                })
                

                
       
            }

        })
    
})



app.get('/teacher-profile',(req, res) => {
    return res.render('teacher-profile');
})

app.get('/upload-course',(req, res) => {
    return res.render('upload-course');
})

app.get('/student-profile',(req, res) => {
    return res.render('student-profile');
})

app.get('/manage-courses',(req, res) => {
    return res.render('manage-courses');
})


app.get('/admin-profile',(req, res) => {
    return res.render('admin-profile');
})
app.get('/forgotPassword',(req, res) => {
    return res.render('forgotPassword');
})

app.get('/manage-user/users', async (req, res) => {
    const users = await userSchema.find({});
    res.render('manage-user', { users: users });
})


app.get('/manage-user/teachers', async (req, res) => {
    const teachers = await teacherSchema.find({});
    res.render('manage-teacher', { teachers: teachers });
})

app.get('/manage-user/users/:id', async (req, res) => {
    const id = req.params.id;
    await userSchema.findByIdAndDelete(id);
    const users = await userSchema.find({});
    res.render('manage-user', { users: users });

})


app.get('/manage-user/teachers/:id', async (req, res) => {
    const id = req.params.id;
    const teacher = teacherSchema.findById(id);
    await teacherSchema.findByIdAndDelete(id);

    await coursesSchema.deleteMany({ teacher: teacher._id })

    const teachers = await teacherSchema.find({});
    res.render('manage-teacher', { teachers: teachers });

})

app.get('/manage-user/query', async (req, res) => {
    const queries = await contactSchema.find({});

    res.render('manage-contactus', { queries: queries });

})

app.get('/manage-user/query/:id', async (req, res) => {
    const id = req.params.id;
    await contactSchema.findByIdAndDelete(id);
    const queries = await contactSchema.find({});

    res.render('manage-contactus', { queries: queries });

})

// app.post('/Create', async (req, res) => {
//     const email = req.body.name;
//     const password = req.body.password;

//     userSchema.findOne({ email:email }).then((user)=>{
//         console.log(user)
//         if(!user){

//         }
//         userSchema.findByIdAndUpdate(user._id, { password: password }).then(()=>{
//             console.log('Password Changed')
//             res.redirect('login')
//     })
//     })
// })  

// app.get('/Create' , async(req , res)=>{
//     res.render('register');
// })

app.post('/Create', async (req, res) => {
    const username = req.body.username; // Use the correct field name (username) from your form
    const newPassword = req.body.password; // Use the correct field name (password) from your form
    
  
    try {
      // Find the user by username (or email, depending on your schema)
      const user = await userSchema.findOne({ username: username });
  
      if (!user) {
        // Handle the case where the user is not found
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's password
      user.password = newPassword;
  
      // Save the updated user
      await user.save();
  
      
    //   return res.redirect('/Create');
    res.render('register');
    } catch (error) {
      // Handle errors (e.g., database errors)
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while resetting the password' });
    }
  });

app.get('/coursepage/:courseid/:num', async (req, res) => {
    if(req.session.isLoggedin){
        user12 = req.session.user
        id = req.params.courseid
        num = req.params.num
        console.log(num)
        
        

        await coursesSchema.findOne({_id:id}).then((course) =>{

            let buy = user12.purchased.indexOf(id)
            if(buy === -1){
               return res.redirect('/coursedescpage/'+courseid)
                }

            else{console.log(course)   
                 res.render('coursepage',{user:user12,
                                           auth:true,
                                           course:course,
                                           number:num})
                 }
             
                })
            }
            else {redirect('/')
            }
        })


app.get('/coursedescpage/:courseid', (req, res) => {

    
    courseid = req.params.courseid

    coursesSchema.findOne({_id: courseid}).then((course) => {
        if (!course) {
            res.render("/")  // 404 page sey replace krdena
        } else{
            course.populate('teacher').then((course)=>{
                
                if(req.session.isLoggedin){
                    res.render("coursedescpage",{user:req.session.user,course:course,auth:true,})     
                }
                else{
                    res.render("coursedescpage",{user: null,course:course,auth:false})
                }
            }
        )}
    });
})


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

app.get("/catalogue", async (req, res) => {
    rock = []
    beginner = []
    await coursesSchema.find({}).then( async (course) => {
            
        populatedcourse = []
        for(let i = 0; i < course.length; i++){          
           await course[i].populate('teacher').then((ct)=>{
                populatedcourse.push(ct)
            })
        }

        
        rock = populatedcourse.filter(obj => {
            return obj.category === "rock"
          })
        shuffleArray(rock)

          
        beginner = populatedcourse.filter(obj => {
            return obj.category === "beginner"
          })
        shuffleArray(beginner)
        
        metal = populatedcourse.filter(obj => {
            return obj.category === "metal"
          })
        shuffleArray(metal)
        
        blues = populatedcourse.filter(obj => {
            return obj.category === "blues"
          })
          shuffleArray(blues)

        ukulele = populatedcourse.filter(obj => {
            return obj.category === "ukulele"
        })
        shuffleArray(ukulele)
        
        
        
        });
        
        if(req.session.isLoggedin == true){
        res.render("catalogue",{rock:rock,
                                beginner:beginner,
                                metal:metal,
                                blues:blues,
                                ukulele:ukulele,
                                role:req.session.role,
                                user:req.session.user,
                                auth:req.session.isLoggedin});
        }
        else{
            res.render("catalogue",{rock:rock,
                                    beginner:beginner,
                                    metal:metal,
                                    blues:blues,
                                    ukulele:ukulele, 
                                    auth:false})
        }
    });

app.post("/purchase/:coursename",(req,res) =>{
    
    cuser = req.session.user
    cid = req.params.coursename
    

userSchema.findOne({username: cuser.username}).then((doc) => {
   if(!doc){       
       res.render("homepage",{user:req.session.user,auth:false})
    } 
    
    else {
        
        coursesSchema.findOne({_id : cid}).then((purchased_course)=>{
            if(!purchased_course){
                res.render("homepage",{user:req.session.user,auth:true})
                }
                else{
                    let purchased_arr = doc.purchased
                    let wishlist = doc.wishlist

                    if(wishlist.includes(purchased_course._id)){
                        let index = wishlist.indexOf(purchased_course._id);
                        wl1 = wishlist.splice(index, 1);
                        
                        userSchema.findByIdAndUpdate(doc._id,{wishlist:wishlist},{new:true}).then(()=>{
                        console.log("Removed From Wishlist")
                        })
                    }

                    if (purchased_arr.includes(purchased_course._id)){
                        console.log('Already Purchased The Course');
                        return res.render("homepage",{user:req.session.user,auth:true})
                      }

                   

                    purchased_arr.push(purchased_course._id)
                    userSchema.findByIdAndUpdate(doc._id, {purchased: purchased_arr},{new:true}).then((rslt) => {
                    
                        res.redirect('/homepage')       
                })}

            })}

     
   })
})


app.use("/", userRoute);

app.post('/submit',  async(req, res) => {
    
    const full_name = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.userType;
    // const pno = req.body.phno
    const password = req.body.password;
    console.log(req.body);
    // const confirm_password = req.body.confirm_password;
   

   
    if (role == 'user') {    
       
        const user = await userSchema.findOne({username :username});
        console.log(user);
        if(user){
            console.log("firsr");
            // console.log(user);
            return res.status(404).send({ message: 'Username is already taken'});
        }
        const newUser = new userSchema({
            fullname: full_name,
            username: username,
            email: email,
            password: password
          });
        
          // Save the user object to the database
          newUser.save()
            .then(savedUser => {
              console.log('User saved:', savedUser);
              // You can send a response here or perform additional actions
            })
            .catch(error => {
              console.error('Error saving user:', error);
              // Handle the error appropriately
            });
            return res.status(200).send({message : "User saved successfully "});
            return res.redirect('/')
    }

    else {
        const user = await teacherSchema.findOne({username :username});
        console.log("f" + user);
        if(user){
            console.log("here");
            return res.status(404).send({ message: 'Username is already taken'});
        }
        const newUser = new teacherSchema({
            fullname: full_name,
            username: username,
            email: email,
            password: password
          });
        
          // Save the user object to the database
          newUser.save()
            .then(savedUser => {
              console.log('User saved:', savedUser);
              // You can send a response here or perform additional actions
            })
            .catch(error => {
              console.error('Error saving user:', error);
              // Handle the error appropriately
            });
            console.log("here");

            return res.status(200).send({message : "User saved successfully"});



    }}
)


app.post('/login', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.userType;
    console.log(req.body);
    if(role == 'admin'){
        req.session.admin = true
        res.redirect('admin')
    }
    if (role == 'user') {
        console.log("first");
        userSchema.findOne({username: username}).then((usercollection) => {
            if (!usercollection) {
                console.log("Invalid Username")
                // return res.render('./login.ejs', { error: 'Wrong Password.', user: null });
                console.log("second");
                return res.status(404).send({message : "user not found"})
            } else {
                
                if(usercollection.password === password) {
                
                req.session.isLoggedin = true;
                req.session.role = "user"
                req.session.user = usercollection;
                

                console.log(req.session)
                return res.status(200).send({message : "login successfully "});

                return req.session.save((err) => {
                // console.log(err);
                    
                
                  });
                //   return res.status(200).send({message : "login successfully "});
            
                }
                else{
                    console.log("Wrong Password");
                    return res.status(404).send({mesage : "password is wrong"});
                    // return res.render('./login.ejs', { error: 'Wrong Password.', user: null });

                }
            }

            res.render('./login.ejs', { error: 'Invalid Username.', user: null });
        })
    
    }

    else {

        teacherSchema.findOne({username: username}).then((teachercollection) => {
            if (!teachercollection) {
                console.log("Invalid Username")
            } else {
                
                if(teachercollection.password === password) {
                req.session.isLoggedin = true;
                req.session.role = "teacher" 
                req.session.user = teachercollection;
                
                console.log(req.session)
                return res.status(200).send({message : "login successfully "});
                // return req.session.save((err) => {
                // console.log(err);
                // return res.redirect("/");
                //   });
            
                 }
                else{
                    console.log("Wrong Password");
                    return res.render('./login.ejs', { error: 'Wrong Password.', user: null });

                }
            }

            res.render('./login.ejs', { error: 'Invalid Username.', user: null });
        })
        

    }

});

app.get('/search',async (req,res) => {
    
   search = req.query.squery
   console.log(search)
//    let pattern=new RegExp(search,"i");
   coursesSchema.find({$or:
    [{ title: { $regex: search, $options: "i" }}, 
    ]}).then((result)=>{
        return res.json(result);
    })
   
})

app.get("/logout", (req, res) => {
    req.session.destroy();
    console.log('over')
    res.redirect("/")


});

app.get('/manage-courses', async (req, res) => {
    const courses = await coursesSchema.find({});
    res.render('manage-courses', { courses: courses });
})


app.get('/manage-courses/:id', async (req, res) => {
    const id = req.params.id;
    await coursesSchema.findByIdAndDelete(id)
    const courses = await coursesSchema.find({});
    res.render('manage-courses', { courses: courses });
})

app.get('*', function(req, res){
    res.status(404).render('pagenotfound');
    
  });

const PORT = 8000;
app.listen(PORT, (req, res) => {
    console.log(`server is listening on PORT number ${PORT}`);
})
