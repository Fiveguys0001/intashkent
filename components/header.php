<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Five Guys</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style/all.css">
    <link rel="stylesheet" href="style/style.css">
    <link rel="shortcut icon" href="../img/IMGGG/FIVE-GUYS.svg">
</head>

<body>
    <div class="wrap">
        <header class="header">
            <a href="/" class="logo"><img src="../img/IMGGG/FIVE-GUYS.svg" alt=""></a>
            <?if(!$_SESSION['login']):?>
            <div class="singIn">
                <a href="?route=registration" class="singIn__link">ORDER</a>
            </div>
            <?else:?>
            <div class="user">
                <div class="user__profile">
                    <img src="<?=$_SESSION['photo']?>" alt="" class="user__profile-img">
                    <h4 class="user__profile-name"><?=$_SESSION['name']?></h4>
                </div>
            </div>
            <?endif;?>
        </header>