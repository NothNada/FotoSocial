const logBtn = document.getElementsByClassName("btn")[1];
const divBoasVindas = document.getElementsByClassName("boas")[0];
const divBaixo = document.getElementById("baixo");
const suaBtn = document.getElementsByClassName("btn")[0];
const sairBtn = document.getElementsByClassName("btn")[2];

logBtn.addEventListener('click',() => {
    window.location.href = "login.html";
});

window.addEventListener("load",async () => {
    await arrumaUsuarios();
    colocaEvento();

    let retorno = await verifica();
    if(retorno.loggedIn){
        logBtn.setAttribute('style','opacity: 0;visibility: hidden;')
        divBoasVindas.innerHTML = "Bem-Vindo "+retorno.username;
    }
});

sairBtn.addEventListener('click',()=>{
    fetch('phpScript/sair.php').finally(fim => {
        window.location.href = "index.html";
    });
});

suaBtn.addEventListener('click',async () => {
    let retorno = await verifica();
    window.location.href = retorno.username;
});

async function colocaEvento(){
    const divsUsers = document.getElementsByClassName("usu");

    for(let i=0;i<divsUsers.length;i++){
        divsUsers[i].addEventListener('click',()=>{
            window.location.href = divsUsers[i].getAttribute('name');
        });
    }
}

async function arrumaUsuarios(){
    const users = await getUsers();
    const qntUsers = Object.keys(users).length;
    let contador = 0;
    let texto = "";

    texto += "<div class='usus'>";

    for(let i=0;i<qntUsers;i++){
        contador++;
        texto += "<div class='usu' name='"+users[i]+"'>";
        texto += "<img src='"+users[i]+"/uploads/perfil.png' width='100px'>";
        texto += "<h1>"+users[i]+"</h1>";
        texto += "</div>";
        if(contador==4){
            contador = 0;
            texto += "</div>";
            texto += "<div class='usus'>";
        }
    }

    texto += "</div>";
    divBaixo.innerHTML = texto;

}

async function verifica(){
    var retorno;
    await fetch('phpScript/check.php').then(data => data.json())
    .then(data => {
        if(!data.loggedIn){
            window.location.href = "login.html";
        }else{
             retorno = data;
        }
    })
    .catch(error => console.error(error));

    return retorno;
}

async function getUsers(){
    try {
        const response = await fetch('phpScript/check.php',{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'usuarios=true'
        });
        const data = await response.json();

        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}