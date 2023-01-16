const conn = require('../../connections/connections');
let session = require('express-session');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;


//================= Controllers =============================

const getAll =(req,res) =>{
    const userID = req.params.id;
    conn.query(`SELECT * FROM users WHERE user_id = ${userID}`, (err, user) => {
        if (err) {
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else {
            let getAll = 'SELECT * FROM myTodo WHERE usersID = ? ORDER BY dateOfCreation desc';
            conn.query(getAll,[userID],(err,rows)=>{
                if(err){
                    res.render('error500',{
                        warning: err.message,
                        title: err.message,
                        classes:'hidden'
                    });
                }
                else{
                    res.render('todos', {
                        title: 'all Todos',
                        data: rows,
                        head: 'MY TODO LIST',
                        user: userID,
                        userInfo: user
                    });
                }
            })
        };
    });
};

const getPending = (req,res) =>{
    const userID = req.params.id;
    let peddingTask = "SELECT * FROM myTodo WHERE todoStatus = ? AND usersID = ? ORDER BY dateOfCreation desc;"
    let selectStatus = 'pending';
    conn.query(peddingTask, [selectStatus, userID], (err, rows) => {
        if (err) {
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else {
            res.render('pending', {
                title: 'pending tasks',
                head: 'PENDING TASKS',
                data: rows,
                user: userID
            });
        }
    })
};

const getDoneTasks = (req,res) =>{
    const userID = req.params.id;
    let completedTask = "SELECT * FROM myTodo WHERE todoStatus = ? AND usersID = ? ORDER BY dateOfCreation desc;"
    let selectCompleted = 'completed';
    conn.query(completedTask, [selectCompleted, userID], (err, rows) => {
        if (err) {
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else {
            res.render('completed', {
                title: 'completed tasks',
                head: 'COMPLETED TASKS',
                data: rows,
                user: userID
            });
        }
    })
}

const postSetStatus = (req,res) =>{
    const id = req.params.id;
    let status = 'completed'
    conn.query(`SELECT * FROM myTodo WHERE id = ${id}`,(err,rows)=>{
        if(err){
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else{
            let todoStatus = rows[0].todoStatus;
            if(todoStatus == status){
                status = 'pending';
                conn.query(`UPDATE myTodo SET todoStatus = '${status}' WHERE id = ${id}`,(err,rows)=>{
                    if(err){
                        res.render('error500',{
                            warning: err.message,
                            title: err.message,
                            classes:'hidden'
                        });
                    }
                    else{
                        res.redirect('back')
                        console.log(req.params.id)
                    };
                });
            }
            else{
                conn.query(`UPDATE myTodo SET todoStatus = '${status}' WHERE id = ${id}`,(err,rows)=>{
                    if(err){
                        res.render('error500',{
                            warning: err.message,
                            title: err.message,
                            classes:'hidden'
                        });
                    }
                    else{
                        res.redirect(req.get('referer'))
                    };
                });
            };
        };
    });
};

const postCreateTodo = (req,res) =>{
    let newTodo = req.body.newTodo;
    const userid = req.params.userID;
    conn.query(`INSERT INTO myTodo (todoname, usersID) VALUES ("${newTodo}", ${userid})`, (err, rows) => {
        if (err) {
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else {
            res.redirect(`/all/${userid}`);
        };
    });
};

const getEditForm = (req,res) =>{
    const id = req.params.id;
    conn.query(`SELECT * FROM myTodo WHERE id = ${id}`, (err, rows) => {
        if (err) {
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else {
            res.render('edit', {
                todo: rows,
                title: 'edit Todo'
            });
        };
    });
};

const postEditTask = (req,res) =>{
    const editTodoName = req.body.editTodoName;
    const id = req.params.id;
    const userid =req.params.userID;
    const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    conn.query(`UPDATE myTodo SET todoname = '${editTodoName}', dateOfCreation = '${datetime}' WHERE id = ${id}`, (err, rows) => {
        if (err) {
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else {
            res.redirect(`/all/${userid}`);
        };
    });
};

const deleteTask = (req,res) =>{
    const id = req.params.id;
    const userid =req.params.userID;
    conn.query(`DELETE FROM myTodo WHERE id = ${id}`, (err, rows) => {
        if (err) {
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else {
            conn.query(`SELECT * FROM users WHERE user_id = ${userid}`,(err,user)=>{
                if(user[0].userName == 'ADMIN'){
                    res.redirect(`/admin/${userid}`);
                }
                else{
                    res.redirect(`/all/${userid}`);
                }
            })
        };
    });
};

const addUser = (req,res,next) =>{
    const file = req.file;
    const userName = req.body.userName;
    const phone = req.body.phone_number;
    const password = req.body.passwords;
    bcrypt.hash(password, saltRounds, (err,hashedPassword) =>{
        if(!file){
            res.render('error500',{
                warning: 'You must choose a profile picture to complete regestration',
                title: 'file error',
                classes:'hidden'
            });
        }
        else{
            conn.query(`SELECT * FROM users WHERE userName = "${userName}"`,(err,rows) =>{
                if(err){
                    res.render('error500',{
                        warning:err.message,
                        title: err.message,
                        classes:'visible'
                    });
                }
                else{
                    if(userName == "ADMIN" || userName == "admin" || userName == "Admin"){
                        res.render('error500',{
                            warning:'User already exists',
                            title: 'user exists',
                            classes:'visible'
                        });
                    }
                    else{
                        if(rows == ''){
                            conn.query(`INSERT INTO users (userName, phone, userPassword, profile_pic) VALUES ("${userName}","${phone}","${hashedPassword}","${file.filename}")`, (err,rows)=>{
                                if(err){
                                    res.render('error500',{
                                        warning:err.message,
                                        title: err.message,
                                        classes:'visible'
                                    });
                                }
                                else{
                                    res.redirect('/');
                                };
                            });
                        }
                        else{
                            res.render('error500',{
                                warning:'User already exists',
                                title: 'user exists',
                                classes:'visible'
                            });
                        };
                    };
                };
            });
        };
    })
};

const userAuthentication = (req,res) =>{
    const user = req.body.username;
    const password = req.body.password;
    conn.query(`SELECT * FROM users WHERE userName = "${user}"`,(err,rows,results) =>{
        bcrypt.compare(password, rows[0].userPassword, (err, resPass)=>{
            if(resPass == false){
                res.render('error500',{
                    warning: 'username or password missmatch',
                    title: 'no user',
                    classes:'visible'
                });
            }
            else{
                if (rows == ''){
                    res.render('error500',{
                        warning:'User does not exist',
                        title: 'No user found',
                        classes:'visible'
                    });
                }
                else{
                    session = req.session;
                    session.userid = rows[0].user_id;
                    if (user == "ADMIN"){
                        res.redirect(`/admin/${session.userid}`);
                    }
                    else{
                        res.redirect(`/all/${session.userid}`);
                    }
                }
            };
        })
    });
};

const editUserForm = (req,res)=>{
    const userID = req.params.id;
    conn.query(`SELECT * FROM users WHERE user_id = ${userID}`, (err,rows) =>{
        if(err){
            res.render('error500',{
                warning: err.message,
                title: err.message,
                classes:'hidden'
            });
        }
        else{
            res.render('userEditForm',{
                user:rows
            });
        };
    });
};

const updateUser = (req,res) =>{
    const userID = req.params.id;
    const file = req.file;
    const userName = req.body.userName;
    const phone = req.body.phone_number;
    const password = req.body.passwords;
    bcrypt.hash(password, saltRounds, (err,newPassword) =>{
        conn.query(`SELECT * FROM users WHERE user_id = ${userID}`, (err,rows) =>{
            if(err){
                res.render('error500',{
                    warning: err.message,
                    title: err.message,
                    classes:'hidden'
                });
            }
            else{
                const innitialImg = rows[0].profile_pic;
                if(!file){
                    conn.query(`UPDATE users SET userName = "${userName}", phone = "${phone}", userPassword = "${newPassword}" WHERE user_id = ${userID}`, (err,rows)=>{
                        if(err){
                            res.render('error500',{
                                warning: err.message,
                                title: err.message,
                                classes:'hidden'
                            });
                        }
                        else{
                            res.redirect(`/all/${userID}`);
                        };
                    });
                }
                else{
                    conn.query(`UPDATE users SET userName = "${userName}", phone = "${phone}", userPassword = "${newPassword}", profile_pic = "${file.filename}" WHERE user_id = ${userID}`, (err,rows)=>{
                        if(err){
                            res.render('error500',{
                                warning: err.message,
                                title: err.message,
                                classes:'hidden'
                            });
                        }
                        else{
                            fs.unlinkSync(`./public/uploads/${innitialImg}`);
                            res.redirect(`/all/${userID}`);
                        };
                    });
                };
            };
        });
    })
};

const logoutUser = (req,res)=>{
    req.session.destroy();
    res.redirect('/');
}


module.exports = {
    getAll,
    getPending,
    getDoneTasks, 
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
};