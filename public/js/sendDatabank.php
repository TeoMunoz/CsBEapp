<?php

$owner = isset($_POST['owner']) ? $_POST['owner'] : '';
$car = isset($_POST['car']) ? $_POST['car'] : '';
$licensePlate = isset($_POST['licensePlate']) ? $_POST['licensePlate'] : '';
$entryDate = isset($_POST['entryDate']) ? $_POST['entryDate'] : '';
$exitDate = isset($_POST['exitDate']) ? $_POST['exityDate'] : '';

try {

    $conection = new PDO('mysql:host=localhost;port=3306;dbname=csbeapp', 'root', '');
    $conection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXEPTION);
    $conection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    
    echo json_encode('ok :)');

    $pdo = $conection->prepare('INSERT INTO reservation(owner, car, licensePlate, entryDate, exityDate) VALUES(?, ?, ?, ?, ?)');
    $pdo->bindParam(1, $owner);
    $pdo->bindParam(2, $car);
    $pdo->bindParam(3, $licensePlate);
    $pdo->bindParam(4, $entryDate);
    $pdo->bindParam(5, $exitDate);
    $pdo->execute() or die(print($pdo->errorInfo()));

} catch (PDOException $error) {
    echo $error->getMessage();
    die();
}