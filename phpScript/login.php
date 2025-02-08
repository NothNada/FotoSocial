<?php
    session_start();

    if(!file_exists("bancoFoda.db")){
        $db = new SQLite3('bancoFoda.db');
        $db->exec("CREATE TABLE usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, senha TEXT)");
    }

    $usuario = $_POST['username'];
    $senha = $_POST['password'];
    $metodo = $_POST['m'];

    if(preg_match('/\s/', $senha) || preg_match('/\s/', $usuario)){
        echo json_encode(['error' => true, 'msg' => 'Pelo amor de Deus escreve direito']);
    }

    $db = new SQLite3("bancoFoda.db");

    $q = $db->prepare("SELECT * FROM usuarios WHERE nome=:nome");
    $q->bindValue(':nome',$usuario,SQLITE3_TEXT);
    $result = $q->execute();

    if ($metodo == "save"){
        if($row = $result->fetchArray(SQLITE3_ASSOC)){
            echo json_encode(['error' => true, 'msg' => 'Usuario ja cadastrado']);
        }else{
            $q1 = $db->prepare("INSERT INTO usuarios (nome,senha) VALUES (:nome,:senha)");
            $q1->bindValue(':nome',$usuario,SQLITE3_TEXT);
            $q1->bindValue(':senha',password_hash($senha,PASSWORD_DEFAULT),SQLITE3_TEXT);
            if($q1->execute()){
                mkdir('../'.$usuario);
                mkdir('../'.$usuario.'/uploads');

                $conteudo = file_get_contents('initUser/index.html');
                $conteudo = str_replace(':USUARIO:', $usuario, $conteudo);
                $arquivoHTML = fopen('../'.$usuario.'/index.html','w');
                fwrite($arquivoHTML,$conteudo);

                copy('initUser/script.js','../'.$usuario.'/script.js');
                copy('initUser/style.css','../'.$usuario.'/style.css');

                copy('initUser/perfil.png','../'.$usuario.'/uploads/perfil.png');

                echo json_encode(['error' => false, 'msg' => 'Usuario cadastrado com suuuucesso!']);
                $_SESSION['username'] = $usuario;
            }else{
                echo json_encode(['error' => true, 'msg' => $db->lastErrorMsg()]);
            }
        }
    }

    if ($metodo == "login"){
        if($row = $result->fetchArray(SQLITE3_ASSOC)){
            if(password_verify($senha,$row['senha'])){
                $_SESSION['username'] = $usuario;
                echo json_encode(['error' => false, 'msg' => 'Login bem sucedido']);
            }else{
                echo json_encode(['error' => true, 'msg' => 'Verifique o nome ou a senha!']);
            }
        }else{
            echo json_encode(['error' => true, 'msg' => 'Verifique o nome ou a senha!']);
        }
    }

    // $arquivo = fopen('senhas.txt','a+');
    // fwrite($arquivo,$usuario."-".$senha."\n");
    // fclose($arquivo);

    $db->close();
?>