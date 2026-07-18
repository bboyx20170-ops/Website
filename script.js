const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const previewButtons = document.querySelectorAll('[data-template]');
const previewFrame = document.querySelector('.preview-frame iframe');
const form = document.querySelector('#contact-form');
const statusBox = document.querySelector('#form-status');
const optionButtons = document.querySelectorAll('.option-button');
const projectTypeInput = document.querySelector('#projectType');
const customDetails = document.querySelector('.custom-details');
const designButtons = document.querySelectorAll('.design-option');
const designCategoryInput = document.querySelector('#designCategory');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });
}

if (previewButtons.length && previewFrame) {
  previewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.preview-item').forEach((item) => item.classList.remove('active'));
      button.closest('.preview-item').classList.add('active');
      previewFrame.src = button.dataset.template;
    });
  });
}

if (optionButtons.length && projectTypeInput && customDetails) {
  optionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      optionButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      projectTypeInput.value = button.dataset.type;
      if (button.dataset.type === 'Custom') {
        customDetails.classList.remove('hidden');
      } else {
        customDetails.classList.add('hidden');
      }
    });
  });
}

if (designButtons.length && designCategoryInput) {
  designButtons.forEach((button) => {
    button.addEventListener('click', () => {
      designButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      designCategoryInput.value = button.dataset.category;
    });
  });
}

const animatedElements = document.querySelectorAll('.fade-up');
if (animatedElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedElements.forEach((element) => observer.observe(element));
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const businessName = data.get('businessName')?.toString().trim();
    const contactName = data.get('contactName')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const phone = data.get('phone')?.toString().trim();
    const website = data.get('website')?.toString().trim();
    const projectType = data.get('projectType')?.toString().trim();
    const designCategory = data.get('designCategory')?.toString().trim();
    const colorPreferences = data.get('colorPreferences')?.toString().trim();
    const extraRequirements = data.get('extraRequirements')?.toString().trim();
    const message = data.get('message')?.toString().trim();

    if (!businessName || !contactName || !email || !phone || !message) {
      statusBox.textContent = 'Please complete the required fields before sending your request.';
      statusBox.style.borderColor = 'rgba(255, 106, 106, 0.26)';
      return;
    }

    const subject = encodeURIComponent(`Website Inquiry from ${businessName}`);
    const body = encodeURIComponent(
      `Business name: ${businessName}%0D%0AContact name: ${contactName}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0ACurrent website: ${website}%0D%0AProject type: ${projectType}%0D%0ADesign category: ${designCategory}%0D%0AColour palette: ${colorPreferences}%0D%0AAdditional requirements: ${extraRequirements}%0D%0A%0D%0A${message}`
    );
    const mailtoUrl = `mailto:hello@example.com.au?subject=${subject}&body=${body}`;

    statusBox.textContent = 'Preparing your message… your email client will open shortly.';
    statusBox.style.borderColor = 'rgba(132, 171, 255, 0.25)';
    window.location.href = mailtoUrl;
  });
}
