//index.js
(function () {
    //TABS
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

    //FAQ
    let faqs = $('.jsFaq');

    faqs.on('click', function (e){
        $this = $(this);
       faqs.not($this).removeClass('active');
        $this.toggleClass('active');
    });

    $(window).on('click', function (e){
       let target = e.target;

       if(!target.closest('.faq__item')){
           faqs.removeClass('active');
       }
    });


    //SWIPERS
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
        on: {
            init: function (event, args) {
                let arr = this.slides.filter(i => i.classList.contains('pslide_visible'));
                syncSliderPrice(arr);
            },
            slideChange: function () {
                let arr = this.slides.filter(i => i.classList.contains('pslide_visible'));
                syncSliderPrice(arr);
            },
        },
    });

    window.swiperPrice = swiperPrice;

    $('.pcomp__item').on('click', function (e) {
        swiperPrice.slideTo(this.dataset.id);
    });


    const resultsSwiperThumbs = new Swiper('.rthumbs__container', {
        spaceBetween: 20,
        slidesPerView: 6,
        watchSlidesVisibility: true,
    });

    const resultsSwiper = new Swiper('.rslider', {
        spaceBetween: 40,
        effect: 'fade',
        navigation: {
            nextEl: '.rthumbs__next',
            prevEl: '.rthumbs__prev',
        },
        thumbs: {
            swiper: resultsSwiperThumbs
        },
    });

    const dsliders = document.querySelectorAll('.dslider');

    dsliders.forEach(function (dslider,index) {

        new Swiper(dslider, {
            navigation: {
                nextEl: '.dslider_'+(index+1)+' .dslider__next',
                prevEl: '.dslider_'+(index+1)+' .dslider__prev'
            },
        });
    });

    const revsSwiper = new Swiper('.revs__container', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.revs__next',
            prevEl: '.revs__prev',
        },
    });

    const weSwiper = new Swiper('.we__container', {
        slidesPerView: 4,
        autoplay: {
            delay: 5000,
        },
    });


    //TIPPY
    tippy(document.querySelectorAll('.how .jsTippy'),
        {
            content: (reference) => reference.getAttribute('title'),
            trigger: 'click',
            theme: 'light',
        });

    //FUNCTIONS
    function syncSliderPrice(arr) {
        $('.pcomp__item').removeClass('active');

        arr.forEach(function (item) {
            $('.pcomp__item[data-id=' + item.dataset.id + ']').addClass('active');
        });


    }
}());