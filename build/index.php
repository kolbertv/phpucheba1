<?php
$shopName = 'детский магазин';
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?php echo($shopName)?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" id=""
          href="https://fonts.googleapis.com/css?family=Open+Sans%3A400%2C300%2C600%2C700%2C800%7CRaleway%3A400%2C300%2C600%2C500%2C700%2C800&amp;subset=latin%2Clatin-ext&amp;ver=1.0.0"
          type="text/css" media="all">
    <link href="https://fonts.googleapis.com/css?family=Pacifico" rel="stylesheet">
    <link rel="stylesheet" href="css/main.css">

</head>

<body>





<header>
    <div class="headerContainer">
        <div class="headerTop">
            <p class="headerTop__item"><a class="headerTop__link" href="my_account.php">личный кабинет</a></p>
            <p class="headerTop__item"><a class="headerTop__link" href="">блог</a></p>
            <p class="headerTop__item"><a class="headerTop__link" href="">хочуха</a></p>
            <p class="headerTop__item"><a class="headerTop__link" href="../bigcart.php">корзина</a></p>
            <p class="headerTop__item"><a class="headerTop__link" href="">логин</a></p>
            <p class="headerTop__item"><a class="headerTop__link" href="">регистрация</a></p>
        </div>
        <div class="headerMiddle">
            <a class="headerMiddle__logoLink" href="../index.php"><?php echo($shopName)?></a>
            <input class="headerMiddle__searchInput" type="text" placeholder="Поиск по всему магазину...">
            <a class="headerMiddle__myAccountLink" href=""></a>
            <a class="headerMiddle__wishList" href=""></a>
            <a class="headerMiddle__myCart headerMiddle__myCart_mod textBlack" href=""><span>0&nbsp</span>товаров/<span>0.00</span>руб</a>

            <div class="dropdownCart dropdownCart_mod">
                <!--<div class="dropdownCart__itemWraper"></div>-->
                <!--<div class="dropdownCart__buttonWrapper">-->
                    <!--&lt;!&ndash;<button class="button dropdownCart__button  dropdownCart__button_mod">Оформить</button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<button class="button dropdownCart__button dropdownCart__button_mod">Корзина</button>&ndash;&gt;-->
                <!--</div>-->
            </div>

        </div>
    </div>

    <nav class="nav" id="nav">
        <p class="nav__item"><a class="nav__link" href="#">главная</a></p>
        <p class="nav__item"><a class="nav__link" href="">одежда</a></p>
        <p class="nav__item"><a class="nav__link" href="">игры</a></p>
        <p class="nav__item"><a class="nav__link" href="">игрушки</a></p>
        <p class="nav__item"><a class="nav__link" href="">обувь</a></p>
        <p class="nav__item"><a class="nav__link" href="">блог</a></p>
        <p class="nav__item"><a class="nav__link" href="">продукты</a></p>
    </nav>

</header>
<main class="main">

    <div class="gallery">
        <div class="gallery__headerWrapper">
            <div class="gallery__headerWrapper__title">последние поступления</div>
            <div class="gallery__headerWrapper__controls">
                <button class="button gallery__headerButton"><</button>
                <button class="button gallery__headerButton">></button>
            </div>
        </div>
        <div class="gallery__itemContainer">
            <div class="gallery__itemWrapper"></div>
        </div>
    </div>

</main>
<footer>



</footer>


<script src="js/main.js"></script>
</body>
</html>