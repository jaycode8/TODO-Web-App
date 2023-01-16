const express = require('express');
const router = express.Router();
let multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcrypt');

const conn = require('../connections/connections');

const { 
    getAll,
    getPending,
    getDoneTasks ,
    postSetStatus,
    postCreateTodo,
    getEditForm,
    postEditTask,
    deleteTask,
    addUser,
    userAuthentication,
    editUserForm,
    updateUser,
    logoutUser
} = require('./Controllers/todos');

const {
    getAdminDashboard,
    fetchData,
    delUser
} = require('./Controllers/adminController');
const { Router } = require('express');

//============== multer upload =================
let storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'public/uploads');
    },
    filename:(req,file,cb) =>{
        const ext = file.mimetype.split('/')[1];
        cb(null,`${file.fieldname}-${Date.now()}.${ext}`);
    }
});
let upload = multer({storage:storage});

//========= RESTFULL API end-point routes ===================
router.get('/me', (req,res) =>{
    let passwords = '12345';
    let newPass = ''
    const salt = 10;
    bcrypt.hash(passwords,salt,(err,passd)=>{
        newPass = passd
        let passwords2 = '12345';
        bcrypt.compare(passwords2,newPass, (err,resp)=>{
            if (resp == true){res.send('correct')}
            else{res.send(newPass)}
        })
    })
    // res.send('hello there')
})

router.get('/admin/:adminID', getAdminDashboard);

router.get('/fetchData/:userId', fetchData);

router.get('/deleteUser/:admID/:userId',delUser)

router.get('/all/:id', getAll);

router.get('/pending/:id', getPending);

router.get('/doneTasks/:id', getDoneTasks );

router.post('/setStatus/:id', postSetStatus);

router.post('/createTodo/:userID', postCreateTodo);

router.get('/:id', getEditForm);

router.post('/editTask/:id/:userID', postEditTask);

router.get('/del/:id/:userID', deleteTask);

router.post('/addUser',upload.single('myFile'), addUser);

router.post('/authUser', userAuthentication);

router.get('/logout/:id', logoutUser);

router.get('/editUser/:id', editUserForm);

router.post('/updateUser/:id',upload.single('myFile'), updateUser);


router.use((req, res) => res.render('error404'));

module.exports = router;