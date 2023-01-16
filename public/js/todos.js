
let profileCover = document.querySelector(".profile-cover");
let allBtn = document.getElementById("all-btn");
let userModal = document.querySelector(".user-modal");
let todos = document.querySelector(".todos");
let searchBtn = document.getElementById("search-btn");
let searchForm = document.getElementById("search-form");
let closeBtn = document.getElementById("close");
let newTaskBtn = document.getElementById("new-task-btn");
let newTaskForm = document.getElementById("new-task-form");
let newTaskCloseBtn = document.getElementById("new-task-close");

const showMenu = (selectedTask) => {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.toggle("mwaani");
};

searchBtn.onclick = () => {
	searchForm.classList.toggle('active');
};

closeBtn.onclick = () => {
	searchForm.classList.remove('active');
};

profileCover.addEventListener('click', () => {
    if (userModal.style.display == '') {
        userModal.style.display = 'grid';
        todos.classList.add('inactive');
        allBtn.classList.remove("active");
        profileCover.classList.add("active");
    } else {
        userModal.style.display = '';
        todos.classList.remove('inactive');
        allBtn.classList.add("active");
        profileCover.classList.remove("active");
    }
});

allBtn.onclick = () => {
	userModal.style.display = "none";
	todos.classList.remove("inactive");
	profileCover.classList.remove("active");
	allBtn.classList.add("active");
};

newTaskBtn.onclick = () => {
	newTaskForm.classList.toggle('active');
};
  
newTaskCloseBtn.onclick = () => {
	newTaskForm.classList.remove('active');
};

const checked = () =>{
    var array1 = [];
    let inputs = document.querySelectorAll('.completed input');
    array1.push(inputs);
    array1.map(i =>{
        for (let x = 0; x < i.length; x++) {
            let input = i[x];
            input.checked = true
        };
    });
};

window.onload = checked;