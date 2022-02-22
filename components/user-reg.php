<?
include_once './db.php';
$userLogin = $_POST['login'];
$userName = $_POST['name'];
$userPass = $_POST['pass'];
$photoName = $_FILES['photo']['name'];
$ext = pathinfo($photoName, PATHINFO_EXTENSION);
$imgPath = $ext ? "./img/avatar/$userLogin.$ext" : './img/avatar/default.jpg';
move_uploaded_file($_FILES['photo']['tmp_name'], ".$imgPath");
userReg($userLogin, $userName, $userPass, $imgPath);
header('Location: /?route=login');
?>