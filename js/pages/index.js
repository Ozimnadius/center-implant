//index.js
(function () {

    $('input[type=tel]').mask('+7 (999) 999-99-99');

    //TABS
    let $jsTabs = $('.jsTabs');

    $jsTabs.each(function (x, i) {
        let $jsTab = $(i),
            $tabs = $jsTab.find('.jsTab'),
            $swsList = $jsTab.find('.jsSws'),
            $sws = $swsList.find('.jsSw');

        $sws.on('click', function (e) {
            let sw = $(this),
                index = $sws.index(sw),
                tab = $($tabs[index]);

            if(sw.hasClass('active')){
                $swsList.toggleClass('open');
            } else{
                $swsList.removeClass('open');
            }
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
        slidesPerView: '1',
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
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 480px
            1200: {
                slidesPerView: '3',
                spaceBetween: 20,
            },
        }
    });

    window.swiperPrice = swiperPrice;

    $('.pcomp__item').on('click', function (e) {
        swiperPrice.slideTo(this.dataset.id);
    });


    const resultsSwiperThumbs = new Swiper('.rthumbs__container', {
        spaceBetween: 20,
        slidesPerView: 3,
        watchSlidesVisibility: true,
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 4,
                spaceBetween: 20
            },
            // when window width is >= 480px
            1200: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
        }
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
        slidesPerView: 1.5,
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 2.5,
            },
            // when window width is >= 480px
            1200: {
                slidesPerView: 4,
            },
        }
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

    //POPUP
    let popup = new Popup();
    $('.jsCall').on('click', function (e){

        let data = {
            template: '.template',
            content: '.callorder'
        }

        let html = new Template(data, this).html();
        popup.open(html);

        $(data.content).validate({
            onfocusout: false,
            submitHandler: function (form) {
                $(form).find('.form__error').removeClass('active');

                let data = $(form).serialize(),
                    url = $(form).attr('action');

                $.ajax({
                    dataType: "json",
                    type: "POST",
                    url: url,
                    data: data,
                    success: function (result) {
                        if (result.status) {
                            $(form).append(new Template({
                                template: '.template',
                                content: '.success'
                            }).html());
                        } else {
                            alert('Что-то пошло не так, попробуйте еще раз!!!');
                        }
                    },
                    error: function (result) {
                        alert('Что-то пошло не так, попробуйте еще раз!!!');
                    }
                });


            },
            invalidHandler: function (event, validator) {
                $(this).find('.form__error').addClass('active');
            },
        });
        $('input[type=tel]').mask('+7 (999) 999-99-99');

    });

    $('.what__form').validate({
        onfocusout: false,
        submitHandler: function (form) {
            let data = $(form).serialize(),
                url = $(form).attr('action');

            $.ajax({
                dataType: "json",
                type: "POST",
                url: url,
                data: data,
                success: function (result) {
                    if (result.status) {

                        let data = {
                            template: '.template',
                            content: '.success'
                        }
                        let html = new Template(data, this).html();
                        popup.open(html);
                    } else {
                        alert('Что-то пошло не так, попробуйте еще раз!!!');
                    }
                },
                error: function (result) {
                    alert('Что-то пошло не так, попробуйте еще раз!!!');
                }
            });


        },
        invalidHandler: function (event, validator) {
            $(this).find('.form__error').addClass('active');
        },
    });

    //SELECT


}());