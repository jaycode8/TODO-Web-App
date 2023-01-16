const conn = require('../../connections/connections');
const fs = require('fs');

const getAdminDashboard = (req,res) =>{
    const admID = req.params.adminID;
    conn.query(`SELECT * FROM users WHERE user_id = ${admID};`, (err, admin) => {
        if (err) {
            res.send(err);
        }
        else{
            conn.query(`SELECT * FROM users WHERE userName != "ADMIN";`, (err, user) => {
                if (err) {
                    res.send(err);
                }
                else{
                    conn.query('SELECT id,todoname,dateOfCreation,todoStatus,userName FROM myTodo, users WHERE usersID = user_id;', (err,todos)=>{
                        if(err){
                            res.send(err);
                        }
                        else{
                            res.render('admin',{
                                title : 'Admin Dashboard',
                                admin: admin,
                                users: user,
                                data: todos
                            });
                        };
                    });
                };
            });
        };
    });
};

const fetchData = (req,res) =>{
    const user = req.params.userId;
    conn.query(`SELECT todoname,todoStatus FROM myTodo WHERE usersID = ${user}`, (err,rows)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(rows);
        };
    });
};


const delUser = (req,res) =>{
    const admID = req.params.admID;
    const userID = req.params.userId;
    conn.query(`SELECT * FROM myTodo WHERE usersID = ${userID}`, (err,rows) =>{
        if(err){
            res.send(err);
        }
        else{
            if(rows == ''){
                conn.query(`SELECT * FROM users WHERE user_id = ${userID}`, (err,newUsers) =>{
                    if(err){
                        res.send(err);
                    }
                    else{
                        let profilePic = newUsers[0].profile_pic;
                        conn.query(`DELETE FROM users WHERE user_id = ${userID}`, (err,newUsers) =>{
                            if(err){
                                res.send(err);
                            }
                            else{
                                fs.unlinkSync(`./public/uploads/${profilePic}`);
                                res.redirect(`/admin/${admID}`);
                            }
                        })
                    }
                })
            }
            else{
                conn.query(`DELETE FROM myTodo WHERE usersID = ${userID}`, (err,rows) =>{
                    if(err){
                        res.send(err);
                    }
                    else{
                        conn.query(`SELECT * FROM users WHERE user_id = ${userID}`, (err,newUsers) =>{
                            if(err){
                                res.send(err);
                            }
                            else{
                                let profilePic = newUsers[0].profile_pic;
                                conn.query(`DELETE FROM users WHERE user_id = ${userID}`, (err,newUsers) =>{
                                    if(err){
                                        res.send(err);
                                    }
                                    else{
                                        fs.unlinkSync(`./public/uploads/${profilePic}`);
                                        res.redirect(`/admin/${admID}`)
                                    };
                                });
                            };
                        });
                    };
                });
            };
            
        };
    });
};

module.exports = {
    getAdminDashboard,
    fetchData,
    delUser
}