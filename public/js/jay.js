const updateTodo = (id,selectedTask) =>{ 
    let taskName = selectedTask.parentElement.lastElementChild;
    taskName.classList.toggle('checked');
    fetch(`http://localhost:4000/setStatus/${id}`,{
        method :'POST',
        headers : {
            'Content-type' : 'application/json; charset=UTF-8'
        }
    })
        .then(response =>{
            return response.json();
        })
        .then(data =>{
            window.location.reload();
        })
        .catch(err =>{
            console.log(err);
        });
};

