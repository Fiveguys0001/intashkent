<?
include_once '../function.php';
include_once './db.php';
date_default_timezone_set('Asia/Tashkent');
$time = date("H:i");
$comment = htmlspecialchars($_POST['descr']);
addComment($_POST['name'], $_SESSION['photo'],$comment ,$time);
header('Location:/?route=guest')
?>