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

  // Image Lightbox
  const imageModal = document.getElementById('lightbox')
  const imageModalImg = document.getElementById('lightbox-img')
  const imageClose = imageModal.querySelector('.close')

  document.querySelectorAll('.gallery-image').forEach((img) => {
    img.addEventListener('click', () => {
      imageModal.style.display = 'flex'
      imageModalImg.src = img.src
    })
  })

  imageClose.addEventListener('click', () => {
    imageModal.style.display = 'none'
  })

  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) imageModal.style.display = 'none'
  })

  // Video Modal
  const videoModal = document.getElementById('videoModal')
  const videoFrame = document.getElementById('videoFrame')
  const videoClose = document.getElementById('videoClose')

  document.querySelectorAll('.video-thumbnail').forEach((div) => {
    div.addEventListener('click', () => {
      const videoUrl = div.getAttribute('data-video')
      // Embed YouTube or local video
      if (videoUrl.includes('youtube') || videoUrl.includes('vimeo')) {
        videoFrame.src = videoUrl + '?autoplay=1'
      } else {
        videoFrame.outerHTML = `<video id="videoFrame" controls autoplay style="width:100%; max-height:80vh;"><source src="${videoUrl}" type="video/mp4">Your browser does not support the video tag.</video>`
      }
      videoModal.style.display = 'flex'
    })
  })

  videoClose.addEventListener('click', () => {
    videoModal.style.display = 'none'
    // Reset iframe or video
    videoFrame.src = ''
    videoModal.querySelector('video')?.remove()
    videoModal.innerHTML +=
      '<div class="video-wrapper"><iframe id="videoFrame" frameborder="0" allowfullscreen></iframe></div>'
  })

  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoClose.click()
    }
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
