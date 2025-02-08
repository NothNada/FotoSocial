<?php
    session_start();

    if(!file_exists("bancoFoda.db")){
        $db = new SQLite3('bancoFoda.db');
        $db->exec("CREATE TABLE usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT)");
    }

    if(isset($_POST['usuarios'])){
        $db = new SQLite3('bancoFoda.db');
        $result = $db->query('SELECT nome FROM usuarios');
        $arrayNomes = [];
        if($result){
            while($row = $result->fetchArray(SQLITE3_ASSOC)){
                $arrayNomes[] = $row['nome'];
            }
            echo json_encode($arrayNomes);
        }else{
            echo "erro:".$db->lastErrorMsg();
        }
        exit;
    }

    if(isset($_POST['arquivos'])){
        $arquivos = scandir('../'.$_POST['usuario'].'/uploads/');
        $arquivos = array_diff($arquivos,array('.','..','perfil.png'));

        $arrayArquivos = [];

        foreach($arquivos as $arquivo){
            $arrayArquivos[] = $arquivo;
        }

        echo json_encode($arrayArquivos);

        exit;
    }

    if(isset($_SESSION['username'])){
        echo json_encode(['loggedIn' => true, 'username' => $_SESSION['username']]);
    }else{
        echo json_encode(['loggedIn' => false, 'username' => '']);
    }

?>