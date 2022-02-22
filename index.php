<?
$page = $_GET['route'];
include_once('./function.php');
include_once('./components/header.php');
include_once('./components/aside.php');
if ($pages[$page]) {
    include_once("./page/$page.php");
}elseif(count($_GET) == 0){
    include_once("./page/main.php");
}else{
    include_once("./page/404.php");
}
include_once('./components/footer.php');
?>