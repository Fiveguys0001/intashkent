    <?
    $dir = scandir('./img/slide/');
    ?>
    <main class="main">
        <section class="head">
            <h2 class="head__title">Slider</h2>
            <p class="head__date">22.02.2022</p>
        </section>
        <div class="slider">
            <div class="slider__line">
                <? foreach ($dir as $key => $value) :
                    if (pathinfo($value, PATHINFO_EXTENSION) == 'jpg' || pathinfo($value, PATHINFO_EXTENSION) == 'gif' or pathinfo($value, PATHINFO_EXTENSION) == 'png') : ?>
                        <img src="../img/slide/<?= $value ?>" alt="" class="slider__img">
                <? endif;
                endforeach;?>
            </div>
            <div class="slider__controls">
                <button class="slider__prev slider__btn"><i class="far fa-chevron-left"></i></button>
                <button class="slider__next slider__btn"><i class="far fa-chevron-right"></i></button>
            </div>
        </div>
    </main>