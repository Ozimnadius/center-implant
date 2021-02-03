//index.js
(function () {

    let $jsTabs = $('.jsTabs');

    $jsTabs.each(function (x, i) {
        let $jsTab = $(i),
            $tabs = $jsTab.find('.jsTab'),
            $sws = $jsTab.find('.jsSw');

        $sws.on('click', function (e) {
            let sw = $(this),
                index = $sws.index(sw),
                tab = $($tabs[index]);

            $sws.removeClass('active');
            $tabs.removeClass('active');
            sw.addClass('active');
            tab.addClass('active');

        });

    });


    tippy(
        document.querySelectorAll('.how .jsTippy'),
        {
            content: (reference) => reference.getAttribute('title'),
            trigger: 'click',
            theme: 'light',
        });

    const swiperPrice = new Swiper('.price__container', {
        slidesPerView: '3',
        spaceBetween: 20,
        watchSlidesVisibility: true,
        slideVisibleClass: 'pslide_visible',
        // Navigation arrows
        navigation: {
            nextEl: '.price__next',
            prevEl: '.price__prev',
        },
        on:{
            emit : function (event, args) {
                let arr = this.slides.filter(i=>i.classList.contains('pslide_visible'));
                syncSliderPrice(arr);
            },
            slideChange: function () {
                let arr = this.slides.filter(i=>i.classList.contains('pslide_visible'));
                syncSliderPrice(arr);
            },
        },
    });


    window.swiperPrice = swiperPrice;

    $('.pcomp__item').on('click', function (e){
       swiperPrice.slideTo(this.dataset.id);
    });

    function syncSliderPrice(arr){
        $('.pcomp__item').removeClass('active');

        arr.forEach(function (item){
            $('.pcomp__item[data-id='+item.dataset.id+']').addClass('active');
        });


    }

}());