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
});

function cardSliderInit() {
    $('.js-catalog-item__pictures-big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        prevArrow: '<button type="button" class="catalog-item__slider-arrow catalog-item__slider-arrow--prev"></button>',
        nextArrow: '<button type="button" class="catalog-item__slider-arrow catalog-item__slider-arrow--next"></button>',
        asNavFor: '.js-catalog-item__pictures-small'
    });
    $('.js-catalog-item__pictures-small').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.js-catalog-item__pictures-big',
        centerMode: true,
        focusOnSelect: true
    });
}