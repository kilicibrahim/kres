document.addEventListener('DOMContentLoaded', function() {
  initSmoothScroll();
  initNavbarScroll();
  initGalleryLightbox();
  initFormValidation();
});

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length === 0) return;
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').getAttribute('src');
      const imgAlt = this.querySelector('img').getAttribute('alt');
      
      const lightbox = document.createElement('div');
      lightbox.classList.add('lightbox');
      
      const lightboxContent = `
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img src="${imgSrc}" alt="${imgAlt}">
          <div class="lightbox-caption">${imgAlt}</div>
        </div>
      `;
      
      lightbox.innerHTML = lightboxContent;
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
      });
      
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }
      });
    });
  });
}

function initFormValidation() {
  const contactForm = document.querySelector('#contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');
    
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Lütfen adınızı giriniz');
      isValid = false;
    } else {
      removeError(nameInput);
    }
    
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Lütfen e-posta adresinizi giriniz');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Lütfen geçerli bir e-posta adresi giriniz');
      isValid = false;
    } else {
      removeError(emailInput);
    }
    
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Lütfen mesajınızı giriniz');
      isValid = false;
    } else {
      removeError(messageInput);
    }
    
    if (isValid) {
      const successMessage = document.createElement('div');
      successMessage.classList.add('alert', 'alert-success', 'mt-3');
      successMessage.textContent = 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.';
      
      contactForm.reset();
      contactForm.appendChild(successMessage);
      
      setTimeout(() => {
        contactForm.removeChild(successMessage);
      }, 5000);
    }
  });
}

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
  
  if (!formGroup.querySelector('.invalid-feedback')) {
    errorElement.classList.add('invalid-feedback');
    formGroup.appendChild(errorElement);
  }
  
  input.classList.add('is-invalid');
  errorElement.textContent = message;
}

function removeError(input) {
  input.classList.remove('is-invalid');
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.invalid-feedback');
  
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

window.addEventListener('load', function() {
  document.body.classList.add('page-loaded');
  
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    element.classList.add('visible');
  });
});
