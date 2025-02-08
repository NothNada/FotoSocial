const logBtn = document.getElementsByClassName("btn")[0];
const eyeBtn = document.getElementsByTagName("img")[0];
const passInput = document.getElementsByTagName("input")[1];
const loginBtn = document.getElementsByTagName("button")[2];
const userInput = document.getElementsByTagName("input")[0];
const saveBtn = document.getElementsByTagName("button")[3];
const textAlert = document.getElementById("sla");

eyeBtn.addEventListener('click',() => {
    if(eyeBtn.getAttribute('src') == 'imgs/olho-cruzado.png'){
        eyeBtn.setAttribute('src','imgs/olho.png');
        passInput.setAttribute('type','text');
    }else if(eyeBtn.getAttribute('src') == 'imgs/olho.png'){
        eyeBtn.setAttribute('src','imgs/olho-cruzado.png');
        passInput.setAttribute('type','password');
    }
});

logBtn.addEventListener('click',() => {
    window.location.href = "index.html";
});

loginBtn.addEventListener('click',() => {
    logaSla('login');
});

saveBtn.addEventListener('click',() => {
    logaSla('save');
});

function logaSla(modo){
    let nome = passInput.value;
    let senha = userInput.value;

    if(!nome || !senha){
        alert("Preencha os campos");
        return;
    }

    if(nome.includes(' ') || senha.includes(' ')){
        alert('não pode espaço no nome ou senha');
        return;
    }

    fetch('phpScript/login.php',{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body:'username='+senha+'&password='+nome+'&m='+modo
    }).then(response => response.json())
    .then(data => {
        if(data.error){
            textAlert.innerHTML = data.msg;
        }else{
            window.location.href = senha;
        }
    })
    .catch(error => {
        console.error("Erro:",error);
    });
}

window.addEventListener('load', () => {
    fetch('phpScript/check.php').then(data => data.json())
    .then(data => {
        if(data.loggedIn){
            logBtn.setAttribute('style','opacity: 1;visibility: visible;');
            window.location.href = data.username;
        }else{
            logBtn.setAttribute('style','opacity: 0;visibility: hidden;');
        }
    })
    .catch(error => console.error(error));
});