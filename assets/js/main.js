/*=============== SHOW MENU ===============*/
const navmenu = document.getElementById("nav-menu"),
  navtoggle = document.getElementById("nav-toggle"),
  navclose = document.getElementById("nav-close");

/*===============  MENU show ===============*/
if (navtoggle) {
  navtoggle.addEventListener("click", () => {
    navmenu.classList.add("show-menu");
  });
}

/*===============  MENU hidden ===============*/

if (navclose) {
  navclose.addEventListener("click", () => {
    navmenu.classList.remove("show-menu");
  });
}
/*=============== REMOVE MENU MOBILE ===============*/
const navlink = document.querySelectorAll(".nav--link");
navlink.forEach((e) => {
  e.addEventListener("click", () => {
    navmenu.classList.remove("show-menu");
  });
});
/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects--container", {
  effect: "coverflow",
  speed: 500,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    1200: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
  mousewheel: true,
  mousewheel: {
    sensitivity: 0.6,
  },
  keyboard: true,
});

/*=============== SWIPER TESTIMONIAL ===============*/
var swiperTestimonial = new Swiper(".testimonial--container", {
  speed: 600,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
/*=============== EMAIL JS ===============*/
const contactform = document.getElementById("contact-form"),
  contactname = document.getElementById("contact-name"),
  contactemail = document.getElementById("contact-email"),
  contactproject = document.getElementById("contact-project"),
  contactmessage = document.getElementById("contact-message"),
  submitBtn = document.getElementById("contact-submit");

// initialize emailJS
emailjs.init("Ck8LMr6wqLTkFg4iU");

// Email validation function
function isValidEmail(email) {
  // يتحقق إن الإيميل بالشكل الصحيح
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const sendemail = (e) => {
  e.preventDefault();

  // validation
  if (
    contactname.value.trim() === "" ||
    contactemail.value.trim() === "" ||
    contactproject.value.trim() === ""
  ) {
    contactmessage.classList.remove("color--blue");
    contactmessage.classList.add("color--red");
    contactmessage.textContent = "Write all the input fields";
    return;
  }

  // validate email format
  if (!isValidEmail(contactemail.value)) {
    contactmessage.classList.remove("color--blue");
    contactmessage.classList.add("color--red");
    contactmessage.textContent = "Please enter a valid email address.";
    return;
  }

  // Disable button while sending
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // send Email
  emailjs
    .sendForm(
      "service_j1yqivn",
      "template_btev6uo",
      "#contact-form",
      "Ck8LMr6wqLTkFg4iU"
    )
    .then(() => {
      // show success message
      contactmessage.classList.remove("color--red");
      contactmessage.classList.add("color--blue");
      contactmessage.textContent = "Message sent successfully ✔️";

      // empty form fields
      contactform.reset();

      // return button to normal
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";

      // hide message after 5 seconds
      setTimeout(() => {
        contactmessage.textContent = "";
      }, 5000);
    })
    .catch((error) => {
      console.error(error);

      contactmessage.classList.add("color--red");
      contactmessage.textContent = "Something went wrong ❌";

      // return button to normal
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";

      // hide message after 5 seconds
      setTimeout(() => {
        contactmessage.textContent = "";
      }, 5000);
    });
};

contactform.addEventListener("submit", sendemail);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 58;
    const sectionId = current.getAttribute("id");

    const sectionLink = document.querySelector(
      ".nav--menu a[href*='" + sectionId + "']"
    );

    if (!sectionLink) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionLink.classList.add("active--link");
    } else {
      sectionLink.classList.remove("active--link");
    }
  });
};

window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/
/*========== SHOW SCROLL UP ==========*/
const scrollUp = () => {
  const scrollUpBtn = document.getElementById("scroll-up");

  if (window.scrollY >= 350) {
    scrollUpBtn.classList.add("show-scroll");
  } else {
    scrollUpBtn.classList.remove("show-scroll");
  }
};

window.addEventListener("scroll", scrollUp);

/*========== SCROLL TO TOP ==========*/
document.getElementById("scroll-up").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// smooth movement
function smoothScrollTo(targetY, duration = 800) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(0, startY + distance * progress);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll(".nav--link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    smoothScrollTo(target.offsetTop);
  });
});
/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const body = document.body;

themeButton.addEventListener("click", () => {
  // toggle dark-theme
  body.classList.toggle("dark-theme");

  // تغيير الأيقونة بين القمر والشمس
  if (body.classList.contains("dark-theme")) {
    themeButton.classList.replace("ri-moon-line", "ri-sun-line");
  } else {
    themeButton.classList.replace("ri-sun-line", "ri-moon-line");
  }
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
const title = document.querySelector(".testimonial--description");

const text = `“Remon made the whole thing fun and easy. The quality was
top-notch and he really paid attention to every little detail.
Loved working with him!”`;

title.textContent = ""; // نفرّغ النص

let i = 0;

function typeWriter() {
  if (i < text.length) {
    title.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

typeWriter();

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  easing: "cubic-bezier(0.5, 0, 0, 1)",
});

sr.reveal(".home--data , .testimonial--content ,.footer--container");
sr.reveal(".home--info div", { delay: 600, origin: "bottom", interval: 100 });
sr.reveal(".skills--content:nth-child(1)", { origin: "left" });
sr.reveal(".skills--content:nth-child(2)", { origin: "right" });
sr.reveal(".qualification--content", { interval: 100 });
sr.reveal(".qualification--content , .services--card", { interval: 100 });
sr.reveal(
  ".projects--container .swiper-button-next ,.contact--content:nth-child(1)",
  {
    origin: "right",
    distance: "-50px",
  }
);
sr.reveal(
  ".projects--container .swiper-button-prev , .contact--content:nth-child(2)",
  {
    origin: "left",
    distance: "-50px",
  }
);
sr.reveal(".projects--container .swiper-pagination", {
  origin: "top",
  distance: "50px",
});
