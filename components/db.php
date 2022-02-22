<?
function pdo() {
$dbname = 'php10-00';
$dbuser = 'root';
$pass = '';
$host = 'localhost';
return new PDO("mysql:host=$host; dbname=$dbname", $dbuser,$pass);
}
function userReg($login, $name, $pass, $photo) {
    $pdo = pdo();
    $name = htmlspecialchars($name);
    $login = htmlspecialchars($login);
    $pass = password_hash($pass, PASSWORD_DEFAULT);
    $query = "INSERT INTO users (login, name, pass, photo) VALUES (?,?,?,?)";
    $driver = $pdo->prepare($query);
    $result = $driver ->execute([$login, $name, $pass, $photo]);
    return $result;
}
function userAuth($login, $pass) {
    $pdo = pdo();
    session_start();
    $query = "SELECT * FROM `users` WHERE login=?";
    $driver = $pdo -> prepare($query);
    $result = $driver -> execute([$login]);
    $user = $driver->fetch(PDO::FETCH_ASSOC);
    if ($user['login'] == $login and password_verify($pass, $user['pass'])) {
        $_SESSION['login'] = $user['login'];
        $_SESSION['name'] = $user['name'];
        $_SESSION['photo'] = $user['photo'];
    }
}
function addComment($login,$photo,$comment,$time) {
    $pdo = pdo();
    $query = "INSERT INTO comments (login, photo, comment, time) VALUES (?,?,?,?)";
    $driver = $pdo->prepare($query);
    $result = $driver -> execute([$login,$photo,$comment,$time]);
    return $result;
}

function getComments() {
    $pdo = pdo();
    $query = "SELECT * FROM comments";
    $driver = $pdo->prepare($query);
    $result = $driver->execute();
    $comments = $driver->fetchAll(PDO::FETCH_ASSOC);
    return $comments;
}
function delComment($id) {
    $pdo = pdo();
    $query = "DELETE FROM `comments` WHERE id=?";
    $driver = $pdo->prepare($query);
    $result = $driver->execute([$id]);
    return $result;
}
function selectComment($id) {
    $pdo = pdo();
    $query = "SELECT * FROM `comments` WHERE id=?";
    $driver = $pdo->prepare($query);
    $result = $driver->execute([$id]);
    $comment = $driver->fetch(PDO::FETCH_ASSOC);
    return $comment;
}
function updateComment($id, $comment){
    $pdo = pdo();
    $query = "UPDATE comments SET comment=? WHERE id=?";
    $driver = $pdo->prepare($query);
    $result = $driver->execute([$comment,$id]);
    return $result;
}
?>