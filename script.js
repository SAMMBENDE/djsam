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

  // Initialize Swiper with fade effect
  const swiper = new Swiper('.mySwiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 1400,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
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

// ...existing code...

// Floating music notes animation
function createFloatingNote() {
  const note = document.createElement('div')
  note.className = 'floating-note'
  note.innerHTML = ['🎵', '🎶', '♪', '♫'][Math.floor(Math.random() * 4)]

  // Random position around the audio player
  const audioBox = document.querySelector('.audio-box')
  const rect = audioBox.getBoundingClientRect()
  note.style.left = Math.random() * rect.width + 'px'
  note.style.top = rect.height + 'px'

  audioBox.appendChild(note)

  // Remove note after animation
  setTimeout(() => {
    if (note.parentNode) {
      note.parentNode.removeChild(note)
    }
  }, 3000)
}

let noteInterval

// Start/stop floating notes based on audio state
document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('audioPlayer')

  if (audioPlayer) {
    audioPlayer.addEventListener('play', function () {
      // Create notes every 500ms while playing
      noteInterval = setInterval(createFloatingNote, 500)
    })

    audioPlayer.addEventListener('pause', function () {
      clearInterval(noteInterval)
    })

    audioPlayer.addEventListener('ended', function () {
      clearInterval(noteInterval)
    })
  }
})

// Global Audio Context for player controls
let playerAudioCtx
let playerSource
let playerBassFilter
let playerTrebleFilter
let isPlayerAudioSetup = false

function setupPlayerAudio() {
  if (isPlayerAudioSetup) return

  try {
    const audioPlayer = document.getElementById('audioPlayer')
    if (!audioPlayer) return

    playerAudioCtx = new (window.AudioContext || window.webkitAudioContext)()
    playerSource = playerAudioCtx.createMediaElementSource(audioPlayer)

    // Bass filter (Low-shelf)
    playerBassFilter = playerAudioCtx.createBiquadFilter()
    playerBassFilter.type = 'lowshelf'
    playerBassFilter.frequency.value = 200
    playerBassFilter.gain.value = 0

    // Treble filter (High-shelf)
    playerTrebleFilter = playerAudioCtx.createBiquadFilter()
    playerTrebleFilter.type = 'highshelf'
    playerTrebleFilter.frequency.value = 3000
    playerTrebleFilter.gain.value = 0

    // Connect the audio chain
    playerSource.connect(playerBassFilter)
    playerBassFilter.connect(playerTrebleFilter)
    playerTrebleFilter.connect(playerAudioCtx.destination)

    isPlayerAudioSetup = true
  } catch (error) {
    console.log('Audio processing not supported in this browser')
  }
}

// Player control handlers
document.addEventListener('DOMContentLoaded', function () {
  const bassPlayer = document.getElementById('bassPlayer')
  const treblePlayer = document.getElementById('treblePlayer')

  if (bassPlayer && treblePlayer) {
    bassPlayer.addEventListener('input', function () {
      if (playerBassFilter) {
        playerBassFilter.gain.value = this.value - 10 // Range -10 to +10
      }
    })

    treblePlayer.addEventListener('input', function () {
      if (playerTrebleFilter) {
        playerTrebleFilter.gain.value = this.value - 10 // Range -10 to +10
      }
    })
  }

  // Setup audio when player starts
  const audioPlayer = document.getElementById('audioPlayer')
  if (audioPlayer) {
    audioPlayer.addEventListener('play', function () {
      if (!isPlayerAudioSetup) {
        setupPlayerAudio()
      }
      if (playerAudioCtx && playerAudioCtx.state === 'suspended') {
        playerAudioCtx.resume()
      }
    })
  }
})
