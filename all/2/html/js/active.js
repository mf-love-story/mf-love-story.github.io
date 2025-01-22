(function($) {
    "use strict";

    /*----------------------------
    START - Method for assign custom_js controls
    ------------------------------ */
    function custom_js() {

        var windowH = $(window).height();

        $('.home-area').css('height', windowH);
        // Sticky Menu
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > windowH) {
                $('nav').addClass("sticky");
            } else {
                $('nav').removeClass("sticky");
            }
        });

    }

    // call custom_js method when window resize
    $(window).on('resize', function() {
        custom_js();
    });
    // call custom_js method & init preloader when window load
    $(window).on('load', function() {
        custom_js();
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });

    });

    /*----------------------------
    START - Magnific Popup method activation
    ------------------------------ */
    $('.maginfic').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
    });

    // navbar collapse activation
    $('.nav li a').on('click',function() {
        $('.collapse').removeClass('in');
    });

    /*----------------------------
    START - One page MENU scrolling JS activation
    ------------------------------ */
    $('.nav').onePageNav({
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        currentClass: 'active',
        filter: '',
        easing: 'swing',
        begin: function() {
            //I get fired when the animation is starting
        },
        end: function() {
            //I get fired when the animation is ending
        },
        scrollChange: function() {
            //I get fired when you enter a section and I pass the list item of the section
        }
    });

    /*----------------------------
    START - Animation JS activation
    ------------------------------ */
    $(".appointment li a").on('click',function() {
        $('html,body').animate({
                scrollTop: $("#appointment").offset().top - 90
            },
            'slow');
    });

    /*----------------------------
    START - Slider activation
    ------------------------------ */
    // Header background slider activation
    $('.home-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        lazyLoad: 'ondemand',
        lazyLoadBuffer: 0,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
    });

    // Testimonial slider activation
    $('.testimonial-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        cssEase: 'linear',
        arrows: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToscroll: 1,
        prevArrow: '<button type="button" class="left-arrow slick-prev fa fa-angle-right"></button>',
        nextArrow: '<button type="button" class="right-arrow slick-next fa fa-angle-left"></button>',
    });

    // Dress section slider activation
    $('.dress-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        cssEase: 'linear',
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        slidesToscroll: 1,
        fade: true
    });

    // Brand section slider activation
    // Gallery section slider activation
    $('.brand-slider, .gallery-slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        cssEase: 'linear',
        arrows: false,
        autoplay: true,
        slidesToShow: 5,
        slidesToscroll: 1,
        fade: false,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });


    /*----------------------------
    START - WOW JS activation
    ------------------------------ */
    var wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: true, // default
        live: true // default
    })
    // initiate wow
    wow.init();

    /*----------------------------
    START - jQuery Tubular activation
    ------------------------------ */
    if ($.fn.YTPlayer) {
        if (!device.tablet() && !device.mobile()) {
            $('#home').addClass(
                'big-background-default-image');
            $(".tubular").YTPlayer();
        } else {
            //jQuery will add the default background to the preferred class 
            $('#home').addClass(
                'big-background-default-image');
        }
    }

    /*----------------------------
    START - Scroll to Top activation
    ------------------------------ */
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) { // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200); // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200); // Else fade out the arrow
        }
    });

    $(document).on('click', '#return-to-top', function() { // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    });


    /* =================================
    ===  CONTACT FORM          ====
    =================================== */
    $("#contact-form").on('submit', function(e) {
        e.preventDefault();
        var name = $("#first_name").val() + " " + $("#last_name").val() + " (" + $("#phone_number").val() + ")";
        var email = $("#email_address").val();
        var subject = $("#contact_reason").val() + " - " + $("#contact_method").val() + " - " + $("#contact_time").val() + " (" + $("#time_zone").val() + ")";
        var message = $("#message").val();
        var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

        function isValidEmail(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
            $.ajax({
                type: "POST",
                url: "php/sendmail.php",
                data: dataString,
                success: function() {
                    $('.success').fadeIn(1000);
                    $('.error').fadeOut(500);
                }
            });
        } else {
            $('.error').fadeIn(1000);
            $('.success').fadeOut(500);
        }

        return false;
    });

})(jQuery);
