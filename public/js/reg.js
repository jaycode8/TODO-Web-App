const wote = (e) =>{
    document.querySelector('.cards').classList.toggle('switch');
    e.preventDefault();
};

const img = document.getElementById('img');
const section = document.querySelector('section');
const file = document.getElementById('file');
const uploadBtn = document.querySelector('label');

file.addEventListener('change', () =>{
    const choosedFile = file.files[0];
    if(choosedFile){
        const reader = new FileReader();

        reader.addEventListener('load', () =>{
                img.setAttribute('src', reader.result);
        });
        reader.readAsDataURL(choosedFile);
    };
});

