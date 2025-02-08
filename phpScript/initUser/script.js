const perfilFt = document.getElementById("perfilFt");
const fileI = document.getElementById("fileI");
const baixoDiv = document.getElementById("baixo");
const publicaBtn = document.getElementById("pub");
const voltar = document.getElementsByClassName("voltar")[0];

var metodoUp = 'perfil';
var pessoa;

window.addEventListener('load',async () => {
    arrumaFotos();
    pessoa = await verifica();
    pessoa = pessoa.username;
    if(document.title != pessoa){
        publicaBtn.style.display = "none";
    }
});

voltar.addEventListener('click',() => {
    window.location.href = "index.html";
});

perfilFt.addEventListener('click',() => {
    if(document.title == pessoa){
        metodoUp = 'perfil';
        fileI.click();
    }
});

publicaBtn.addEventListener('click',() => {
    metodoUp = 'subir';
    fileI.click();
});

fileI.addEventListener('change',(event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file',fileI.files[0]);
    formData.append('m',metodoUp);

    fetch('phpScript/upload.php',{
        method:'POST',
        body:formData
    }).then(response => response.json())
    .then(() => {
        window.location.reload();
    })
    .catch(error => {
        console.log(error);
    });
    
});

async function arrumaFotos(){
    const fotos = await getFiles();
    const qntFotos = Object.keys(fotos).length;
    let contador = 0;
    let texto = "";

    texto += "<div class='fotins'>";

    for (let i = 0; i < qntFotos; i++) {
        contador++;
        texto += "<img src='../"+document.title+"/uploads/"+fotos[i]+"'>";
        if(contador==4){
            contador=0;
            texto += "</div>";
            texto += "<div class='fotins'>";
        }
    }

    texto += "</div>";
    baixoDiv.innerHTML = texto;
}

async function verifica(){
    try {
        const response = await fetch('phpScript/check.php');
        const data = await response.json();

        if(!data.loggedIn){
            window.location.href = "login.html"
            return null;
        }else{
            return data;
        }


    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getFiles(){
    try{
        const response = await fetch('phpScript/check.php',{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'arquivos=true&usuario='+document.title
        });
        const data = await response.json();

        return data;

    }catch(error){
        console.log(error);
        return null;
    }
}