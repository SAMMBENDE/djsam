$(document).ready(function () {
  $(window).scroll(function () {
    // sticky navbar on scroll script
    if (this.scrollY > 20) {
      $('.navbar').addClass('sticky')
    } else {
      $('.navbar').removeClass('sticky')
    }

    // scroll-up button show/hide script
    if (this.scrollY > 500) {
      $('.scroll-up-btn').addClass('show')
    } else {
      $('.scroll-up-btn').removeClass('show')
    }
  })

  //GALERY SECTION

  const swiper = new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 20, // spacing between slides
    slidesPerView: 1, // default for mobile
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      // When window width is >= 768px (tablet+)
      768: {
        slidesPerView: 2,
      },
      // When window width is >= 1024px (desktop)
      1024: {
        slidesPerView: 3,
      },
    },
  })

  // slide-up script
  $('.scroll-up-btn').click(function () {
    $('html').animate({ scrollTop: 0 })
    // removing smooth scroll on slide-up button click
    $('html').css('scrollBehavior', 'auto')
  })

  $('.navbar .menu li a').click(function () {
    // applying again smooth scroll on menu items click
    $('html').css('scrollBehavior', 'smooth')
  })

  // toggle menu/navbar script
  $('.menu-btn').click(function () {
    $('.navbar .menu').toggleClass('active')
    $('.menu-btn i').toggleClass('active')
  })

  // typing text animation script
  var typed = new Typed('.typing', {
    strings: ['Loop-Master', 'Grand Maitre'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  })

  var typed = new Typed('.typing-2', {
    strings: ['DjSaM ?'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  })

  // owl carousel script
  $('.carousel').owlCarousel({
    margin: 20,
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  })
})

AOS.init({
  duration: 1200,
})

/* AudioPlayer */
