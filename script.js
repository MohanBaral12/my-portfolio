// -------------------------skills-------------------------
const skills = [
  { name: "HTML5", icon: "https://skillicons.dev/icons?i=html" },
  { name: "CSS3", icon: "https://skillicons.dev/icons?i=css" },
  { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
  { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
  { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
  { name: "Java", icon: "https://skillicons.dev/icons?i=java" },
  { name: "C", icon: "https://skillicons.dev/icons?i=c" },
  { name: "C++", icon: "https://skillicons.dev/icons?i=cpp" },
  { name: "C#", icon: "https://skillicons.dev/icons?i=cs" },
  { name: "Django", icon: "https://skillicons.dev/icons?i=django" },
  { name: "Spring Boot", icon: "https://skillicons.dev/icons?i=spring" }
];

const skillsTrack = document.getElementById("skills-track");

if (skillsTrack) {
  const repeatedSkills = [...skills, ...skills];

  skillsTrack.innerHTML = repeatedSkills
    .map(
      (skill) => `
        <div class="skill-card" aria-label="${skill.name}">
          <img src="${skill.icon}" alt="${skill.name} icon" />
          <span>${skill.name}</span>
        </div>
      `
    )
    .join("");
}


// -------------------------nav-------------------------
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('site-nav');

if (navToggle && navMenu) {
  const navIcon = navToggle.querySelector('.nav-icon');

  const updateNavToggle = () => {
    const isOpen = navMenu.classList.contains('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));

    if (navIcon) {
      navIcon.classList.remove('fa-bars', 'fa-xmark');
      navIcon.classList.add(isOpen ? 'fa-xmark' : 'fa-bars');
    }
  };

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
    updateNavToggle();
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      updateNavToggle();
    });
  });
}




// -------------------------fetch api data-------------------------

const scriptURL = 'https://script.google.com/macros/s/AKfycbxEjTZHObrUbxRUQRhoKQip-MFAbilsDeyyc8qRycZB78YtLfz9uedw4wX9CfnpzqKc/exec';
const form = document.getElementById('contactForm');

console.log('Form element:', form); // Debugging line to check if the form is selected

if (form) {
  const statusMsg = document.getElementById('form-status');
  const submitButton = form.querySelector('button[type="submit"]');

  function setStatus(message, type = '') {
    statusMsg.textContent = message;
    statusMsg.className = 'form-status ' + (type ? type : '');
  }

  function clearStatus() {
    statusMsg.textContent = '';
    statusMsg.className = 'form-status';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    setStatus('Submitting...', 'pending');

    fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    })
      .then(() => {
        setStatus('Success! Details stored in Google Sheet.', 'success');
        form.reset();

        setTimeout(() => {
          clearStatus();
        }, 5000);
      })
      .catch(error => {
        setStatus('Error sending data!', 'error');
        console.error('Error!', error.message);
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      });
  });
}



// const scriptURL = 'https://script.google.com/macros/s/AKfycbxEjTZHObrUbxRUQRhoKQip-MFAbilsDeyyc8qRycZB78YtLfz9uedw4wX9CfnpzqKc/exec';
// const form = document.getElementById('contactForm');
// fetch(scriptURL, {
//       method: 'POST',
//       body: new FormData(form)
//     })