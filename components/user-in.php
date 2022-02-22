<?

include_once '../function.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
session_destroy();
}else{
    include_once './db.php';
    userAuth($_POST['login'],$_POST['pass']);
}
header('Location:/')
?>