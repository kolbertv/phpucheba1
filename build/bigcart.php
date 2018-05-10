<?php
$shopName = 'детский магазин';
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Детский магазин</title>
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

<main class="main bigcartcontent">
    <div class="cart_container">
    
        <h2 class="cart_container__h2">корзина</h2>
    
        <div class="cart_container__row cart_container__header">
            <div class="cart_container__column cart_container__index">#</div>
            <div class="cart_container__column cart_container__image"></div>
            <div class="cart_container__column cart_container__name">имя товара</div>
            <div class="cart_container__column cart_container__price">цена</div>
            <div class="cart_container__column cart_container__qty">кол-во</div>
            <div class="cart_container__column cart_container__subtotal">итого</div>
            <div class="cart_container__column cart_container__delete"></div>
        </div>
    
        <div class="cart_container__row cart_container__itemWrapper">
            <div class="cart_container__column cart_container__index">1</div>
            <div class="cart_container__column cart_container__image"><img class="cart_container__img"
                                                                           src="img/product1-6.jpg" alt=""></div>
            <div class="cart_container__column cart_container__name">имя товара</div>
            <div class="cart_container__column cart_container__price">цена</div>
            <div class="cart_container__column cart_container__qty">
                <input class="cart_container__qtyInput" type="number" step="1" min="0" value="99" title="кол-во">
            </div>
            <div class="cart_container__column cart_container__subtotal">итого</div>
            <div class="cart_container__column cart_container__delete">
                <button class="button cart_container__buttonDelete"></button>
            </div>
        </div>
        <div class="cart_container__row cart_container__itemWrapper">
            <div class="cart_container__column cart_container__index">2</div>
            <div class="cart_container__column cart_container__image"><img class="cart_container__img"
                                                                           src="img/product1-6.jpg" alt=""></div>
            <div class="cart_container__column cart_container__name">имя товара</div>
            <div class="cart_container__column cart_container__price">цена</div>
            <div class="cart_container__column cart_container__qty">
                <input class="cart_container__qtyInput" type="number" step="1" min="0" value="99" title="кол-во">
            </div>
            <div class="cart_container__column cart_container__subtotal">итого</div>
            <div class="cart_container__column cart_container__delete">
                <button class="button cart_container__buttonDelete"></button>
            </div>
        </div>
        <div class="cart_container__row cart_container__itemWrapper">
            <div class="cart_container__column cart_container__index">3</div>
            <div class="cart_container__column cart_container__image"><img class="cart_container__img"
                                                                           src="img/product1-6.jpg" alt=""></div>
            <div class="cart_container__column cart_container__name">имя товара</div>
            <div class="cart_container__column cart_container__price">цена</div>
            <div class="cart_container__column cart_container__qty">
                <input class="cart_container__qtyInput" type="number" step="1" min="0" value="99" title="кол-во">
            </div>
            <div class="cart_container__column cart_container__subtotal">итого</div>
            <div class="cart_container__column cart_container__delete">
                <button class="button cart_container__buttonDelete"></button>
            </div>
        </div>
    
        <div class="cart_container__footer">
            <div class="cart_container__shopping">
                <a class="button cart_container__footerButton" href="index.php">вернуться в магазин</a>
            </div>
            <div class="cart_container__emptySpace"></div>
            <div class="cart_container__clearCart">
                <button class="button  cart_container__footerButton">
                    очистить корзину
                </button>
            </div>
            <div class="cart_container__updateCart">
                <button class="button cart_container__footerButton">
                    обновить корзину
                </button>
            </div>
        </div>
    
    
    </div>
    <div class="cart_collaterals">
        <div class="cart_collaterals__discount">
            <h2 class="cart_collaterals__h2">купон на скидку</h2>
            <div class="cart_collaterals__discound_form">
                <label class="cart_collaterals__couponLabel" for="coupon_code">Введите номер вашего купона на скидку</label>
                <input type="text" id="coupon_code" class="cart_collaterals__inputCoupon" placeholder="Номер купона"
                       name="Номер купона">
                <button type="submit" class="button cart_collaterals__couponButton">Применить купон</button>
            </div>
        </div>
    
        <div class="cart_collaterals__cartTotals">
    
            <h2 class="cart_collaterals__h2">итог</h2>
    
    
            <div class="cart_collaterals__cartSubtotal cart_collaterals__flex">
                <p class="cart_collaterals__col cart_collaterals__cartSubtotalName">Общая стоимость:</p>
                <p class="cart_collaterals__col cart_collaterals__cartSubtotalAmoung">345 рублей</p>
            </div>
    
            <div class="cart_collaterals__shipping cart_collaterals__flex">
                <p class="cart_collaterals__col" >Доставка:</p>
                <div class="cart_collaterals__shippingChange">
                    <p>Платная доставка морем</p>
                    <p>Платная доставка авиа</p>
                    <p>Бесплатная доставка</p>
                </div>
            </div>
    
            <div class="cart_collaterals__totalPrice cart_collaterals__flex cart_collaterals__row">
                <p class="cart_collaterals__col">Итоговая цена:</p>
                <p class="cart_collaterals__col">500 рублей</p>
            </div>
    
            <button class="button cart_collaterals__checkout">
                оформить покупку
            </button>
    
    
        </div>
    
    
    </div>
</main>

<footer>



</footer>

<script src="js/bigcart.js"></script>
</body>
</html>