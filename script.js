const backgrounds = [
  "/assets/HomeBG.jpg",
  "/assets/HomeBG.jpg",
  "/assets/HomeBG.jpg",
];

let currentBgIndex = 0;
let carouselInterval;
let resumeTimeout;

const carouselContainer = document.getElementById("carousel-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function updateCarousel() {
  carouselContainer.style.transform = `translateX(-${currentBgIndex * 100}%)`;
}

function nextSlide() {
  currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
  updateCarousel();
}

function prevSlide() {
  currentBgIndex =
    currentBgIndex === 0 ? backgrounds.length - 1 : currentBgIndex - 1;
  updateCarousel();
}

// Start auto slide
function startAutoSlide() {
  carouselInterval = setInterval(nextSlide, 4000);
}

// Stop auto slide
function stopAutoSlide() {
  clearInterval(carouselInterval);
  clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(startAutoSlide, 10000); // Resume after 10s
}

// Init
startAutoSlide();

// Buttons
nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  nextSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
});

let isMenuOpen = false;
let scrolled = true;
let showNavbar = true;
let lastScrollY = 0;

const navbar = document.getElementById('navbar');
const logo = document.getElementById('logo');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const backdrop = document.getElementById('backdrop');

function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  mobileMenu.classList.toggle('translate-x-full', !isMenuOpen);
  mobileMenu.classList.toggle('translate-x-0', isMenuOpen);
  backdrop.classList.toggle('hidden', !isMenuOpen);
  document.body.style.overflowX = isMenuOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  isMenuOpen = false;
  mobileMenu.classList.add('translate-x-full');
  mobileMenu.classList.remove('translate-x-0');
  backdrop.classList.add('hidden');
  document.body.style.overflowX = '';
}

function handleScroll() {
  const currentScrollY = window.scrollY;
  scrolled = currentScrollY > 50;
  showNavbar = !(currentScrollY > lastScrollY && currentScrollY > 100);

  // Update navbar background and padding
  navbar.classList.toggle('bg-gray-100', scrolled);
  navbar.classList.toggle('py-3', scrolled);
  navbar.classList.toggle('md:py-8', scrolled);
  navbar.classList.toggle('bg-cover', !scrolled);
  navbar.classList.toggle('bg-center', !scrolled);
  navbar.classList.toggle('py-25', !scrolled);
  navbar.classList.toggle('sm:py-25', !scrolled);
  navbar.style.backgroundImage = scrolled ? 'none' : "url('/assets/nav-bg.svg')";

  // Update logo size
  logo.classList.toggle('h-8', scrolled);
  logo.classList.toggle('sm:h-10', scrolled);
  logo.classList.toggle('h-10', !scrolled);
  logo.classList.toggle('sm:h-16', !scrolled);

  // Update navbar visibility
  navbar.classList.toggle('translate-y-0', showNavbar);

  lastScrollY = currentScrollY;
}

menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu);
window.addEventListener('scroll', handleScroll);

const videoPopup = document.getElementById("videoPopup");
  const videoOverlayTrigger = document.getElementById("videoOverlayTrigger");
  const closeVideo = document.getElementById("closeVideo");
  const videoIframe = document.getElementById("videoIframe");

  videoOverlayTrigger.addEventListener("click", () => {
    videoPopup.classList.remove("hidden");
    videoPopup.classList.add("flex");
    videoIframe.src = "https://www.youtube.com/embed/6_2565hnCmI?autoplay=1";
  });

  closeVideo.addEventListener("click", () => {
    videoPopup.classList.add("hidden");
    videoPopup.classList.remove("flex");
    videoIframe.src = ""; // Stop video
  });

  document.addEventListener('DOMContentLoaded', () => {
  // Product Carousel
  let currentProductSlide = 0;
  const productCarousel = document.getElementById('product-carousel');
  const productPrevBtn = document.getElementById('product-prev-btn');
  const productNextBtn = document.getElementById('product-next-btn');
  const productSlides = productCarousel ? productCarousel.children : [];
  const totalProductSlides = productSlides.length;

  function updateProductCarousel() {
    const isMobile = window.innerWidth < 768; // md breakpoint
    const slideWidth = isMobile ? 100 : 100 / 3; // 1 card in mobile, 3 in desktop
    const maxSlides = isMobile ? totalProductSlides : Math.ceil(totalProductSlides / 3);
    currentProductSlide = Math.max(0, Math.min(currentProductSlide, maxSlides - 1));
    productCarousel.style.transform = `translateX(-${currentProductSlide * slideWidth}%)`;
  }

  function productNextSlide() {
    const isMobile = window.innerWidth < 768;
    const maxSlides = isMobile ? totalProductSlides : Math.ceil(totalProductSlides / 3);
    if (currentProductSlide < maxSlides - 1) {
      currentProductSlide++;
      updateProductCarousel();
    }
  }

  function productPrevSlide() {
    if (currentProductSlide > 0) {
      currentProductSlide--;
      updateProductCarousel();
    }
  }

  if (productNextBtn) {
    productNextBtn.addEventListener('click', productNextSlide);
    productNextBtn.addEventListener('touchstart', productNextSlide);
  } else {
    console.error('productNextBtn element not found');
  }
  if (productPrevBtn) {
    productPrevBtn.addEventListener('click', productPrevSlide);
    productPrevBtn.addEventListener('touchstart', productPrevSlide);
  } else {
    console.error('productPrevBtn element not found');
  }

  // Update carousel on window resize
  window.addEventListener('resize', updateProductCarousel);

  // Initial carousel position
  updateProductCarousel();
});


document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS for animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true,
    });
  } else {
    console.error('AOS library not loaded');
  }

  // Testimonial Carousel
  const testimonials = [
    {
      stars: 5,
      text: 'Amazing organic products! The quality is unmatched, and the delivery is always on time.',
      name: 'John Doe',
      role: 'Happy Customer',
    },
    {
      stars: 4,
      text: 'Really impressed with the variety and freshness of the products. Highly recommend!',
      name: 'Jane Smith',
      role: 'Food Blogger',
    },
    {
      stars: 5,
      text: 'The best organic store I’ve ever shopped at. Customer service is fantastic!',
      name: 'Mike Johnson',
      role: 'Regular Buyer',
    },
  ];

  let currentTestimonialIndex = 0;
  const testimonialStars = document.getElementById('testimonial-stars');
  const testimonialText = document.getElementById('testimonial-text');
  const testimonialName = document.getElementById('testimonial-name');
  const testimonialRole = document.getElementById('testimonial-role');
  const testimonialPrev = document.getElementById('testimonial-prev');
  const testimonialNext = document.getElementById('testimonial-next');

  function updateTestimonial() {
    const testimonial = testimonials[currentTestimonialIndex];
    testimonialStars.innerHTML = [...Array(5)].map((_, i) => `<span>${i < testimonial.stars ? '★' : '☆'}</span>`).join('');
    testimonialText.textContent = testimonial.text;
    testimonialName.textContent = testimonial.name;
    testimonialRole.textContent = testimonial.role;
  }

  if (testimonialNext) {
    testimonialNext.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      updateTestimonial();
    });
    testimonialNext.addEventListener('touchstart', () => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
      updateTestimonial();
    });
  } else {
    console.error('testimonialNext element not found');
  }

  if (testimonialPrev) {
    testimonialPrev.addEventListener('click', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial();
    });
    testimonialPrev.addEventListener('touchstart', () => {
      currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial();
    });
  } else {
    console.error('testimonialPrev element not found');
  }

  // Initialize first testimonial
  updateTestimonial();
});

 document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll("#counter-section h2[data-target]");
    let hasAnimated = false;

    function animateCounter(counter) {
      const target = +counter.getAttribute("data-target");
      const duration = 2000;
      const frameRate = 60;
      const increment = target / (duration / (1000 / frameRate));
      let current = 0;

      const update = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current) + "k+";
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + "k+";
        }
      };

      update();
    }

    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight);
    }

    function handleScroll() {
      const section = document.getElementById("counter-section");
      if (!hasAnimated && isInViewport(section)) {
        counters.forEach(counter => animateCounter(counter));
        hasAnimated = true;
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll);
  });