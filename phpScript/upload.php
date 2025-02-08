<?php
session_start();

if($_POST['m']=='perfil'){
    $fileName = basename($_FILES["file"]["name"]);
    $fileType = pathinfo($fileName, PATHINFO_EXTENSION);
    $newFileName = uniqid() . $fileName . '.' . $fileType; // Gera um nome único para o arquivo
    $targetFilePath = "../" . $_SESSION['username'] . "/uploads" . $newFileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        echo json_encode(['error' => false, 'msg' => $targetFilePath]);
    } else {
        echo json_encode(['error' => true, 'msg' => '']);
    }
    unlink('../'. $_SESSION['username'] . "/uploads/" . 'perfil.png');
    rename($targetFilePath,'../'. $_SESSION['username'] . "/uploads/" . 'perfil.png');
    
}else if($_POST['m'] == 'subir'){
    $fileName = basename($_FILES["file"]["name"]);
    $fileType = pathinfo($fileName, PATHINFO_EXTENSION);
    $newFileName = uniqid() . $fileName . '.' . $fileType; // Gera um nome único para o arquivo
    $targetFilePath = "../" . $_SESSION['username'] . "/uploads/" . $newFileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        echo json_encode(['error' => false, 'msg' => $targetFilePath]);
    } else {
        echo json_encode(['error' => true, 'msg' => '']);
    }
}

?>