<?php

if(!file_exists("bancoFoda.db")){
    $db = new SQLite3('bancoFoda.db');
    $db->exec("CREATE TABLE usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT)");
}

// $result = $db->query("SELECT * FROM usuarios");

// if($result){
//     while($row = $result->fetchArray(SQLITE3_ASSOC)){
//         echo "ID:".$row['id']."\n";
//         echo "Nome:".$row['nome']."\n";
//         echo "Senha:".$row['senha']."\n";
//         echo "---------------------------\n";
//     }
// }else{
//     echo "Erro:".$db->lastErrorMsg();
// }

/*
$db->exec("CREATE TABLE usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT)");

$ins = $db->prepare("INSERT INTO usuarios (nome,senha) VALUES (:nome,:senha)");

$nome = "Admin";
$senha = "Admin";

$ins->bindValue(':nome',$nome,SQLITE3_TEXT);
$ins->bindValue(':senha',$senha,SQLITE3_TEXT);

if($ins->execute()){
    echo "Funcionou";
}else{
    echo "Erro:".$db->json_last_error_msg();
}
*/

?>