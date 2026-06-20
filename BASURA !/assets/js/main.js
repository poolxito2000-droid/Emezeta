// Variables globales
let currentTrackIndex = 0;
const tracks = [
    { id: 'track1', title: 'Mix Discoteca', src: 'assets/music/DEMOOOOO MIX FT.wav' },
    { id: 'track2', title: 'Enero Mix', src: '' },
    { id: 'track3', title: 'Febrero Mix', src: '' },
    { id: 'track4', title: 'Marzo Mix', src: '' }
];

// Elementos del DOM
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentTrackTitle = document.getElementById('currentTrackTitle');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const contactForm = document.getElementById('contactForm');
const playBtns = document.querySelectorAll('.track-play-btn');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menu al hacer click en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Activar enlace según sección
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id') || '';
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Reproductor de música
function loadTrack(index) {
    currentTrackIndex = index;
    currentTrackTitle.textContent = tracks[index].title;
    audioPlayer.src = tracks[index].src;
    playTrack();
}

function playTrack() {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseTrack() {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function togglePlay() {
    if (audioPlayer.paused) {
        playTrack();
    } else {
        pauseTrack();
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
}

function updateProgress() {
    const { duration, currentTime } = audioPlayer;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    if (duration) {
        audioPlayer.currentTime = (clickX / width) * duration;
    }
}

// Eventos del reproductor
playBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        loadTrack(index);
    });
});

playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextTrack);
progressBar.addEventListener('click', setProgress);

// Formulario de contacto
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    alert(`¡Gracias ${name}! Tu mensaje ha sido enviado. Te contactaré pronto.`);
    contactForm.reset();
});

console.log('🎵 DJ Emezeta Website Cargado!');
