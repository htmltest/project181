$(function(){
    $(document).on("click", "[data-product-id]", function() {
        $.fancybox.close();
        $.fancybox.open({
            baseClass: 'site-popup site-popup--form',
            type: 'ajax',
            src: app.pathToTemplate + 'ajax/order.php?PRODUCT_ID=' + this.dataset.productId,
            afterLoad: function () {
                app.movingPlaceholder('.js-moving-placeholder', 'moving-placeholder');
            }
        });
        return false;
    });

    $("[data-fancybox]").fancybox({
        afterLoad: function( instance, slide ) {
            if (this.opts.baseClass === 'fancybox-container--product-card') {
                cardSliderInit();
            }
        }
    });

    cardSliderInit();

    $('body').on('click', '.js-catalog-item__pictures-small a', function(e) {
        var curIndex = $(this).index();
        $('.js-catalog-item__pictures-big').slick('slickGoTo', curIndex);
        e.preventDefault();
    });
});

function cardSliderInit() {
    $('.js-catalog-item__pictures-big').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        prevArrow: '<button type="button" class="catalog-item__slider-arrow catalog-item__slider-arrow--prev"></button>',
        nextArrow: '<button type="button" class="catalog-item__slider-arrow catalog-item__slider-arrow--next"></button>'
    }).on('setPosition', function(event, slick) {
        $('.catalog-item__pictures-small a.active').removeClass('active');
        $('.catalog-item__pictures-small a').eq($('.js-catalog-item__pictures-big').slick('slickCurrentSlide')).addClass('active');
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.catalog-item__pictures-small a.active').removeClass('active');
        $('.catalog-item__pictures-small a').eq(nextSlide).addClass('active');
    });
}