<?
include_once './db.php';
$comment = htmlspecialchars($_POST['descr']);
updateComment($_POST['change-id'], $comment);
header('Location:/?route=guest');
?>