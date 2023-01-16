const usermodal = document.querySelector('.usermodal');

const lumumba = (arguments) =>{
    let name = document.querySelector('.profileDetails h2');
    let phone = document.querySelector('.profileDetails p');
    let myImg = document.querySelector('.theimage img');
    let passw = document.querySelector('.profileDetails .passw');
    let todosCont = document.querySelector('.todosList');
    let trash = document.querySelector('.profile #trash');
    arguments=arguments.split(',');
    let userId = arguments[0];
    let userName = arguments[1];
    let phoneNo = arguments[2];
    let img = arguments[3];
    let pas = arguments[4];
    let admID = arguments[5];
    name.innerHTML=userName;
    phone.innerHTML=phoneNo;
    myImg.src=`../uploads/${img}`;
    // passw.innerHTML=pas;
    

    fetch(`http://localhost:4000/fetchData/${userId}`,{
        method :'GET',
        headers : {
            'Content-type' : 'application/json; charset=UTF-8'
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data == ''){
                todosCont.innerHTML = `
                
                `
            }
            else{
                data.map(task =>{
                    todosCont.innerHTML += `
                        <ul>
                            <li>${task.todoname}</li>
                            <span class="${task.todoStatus}"></span>
                        </ul>
                    `
                });
            };
            trash.innerHTML = `<a href="/deleteUser/${admID}/${userId}"><i class="fas fa-trash-alt" id="trash"></i></a>`
            usermodal.classList.toggle('amapiano');
        })
        .catch(err =>{
            console.log(err);
        });
};


const ray = (todos) =>{
    console.log(todos.todoname)
}

const lumumba2 = () =>{
    usermodal.classList.toggle('amapiano');
}

const makueni = () =>{
    const modal = document.querySelector('.container .user-modal');
    modal.classList.toggle('lupin');
}


