// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
body.setAttribute('data-theme', savedTheme);

// Update icon based on initial theme
const icon = themeToggle.querySelector('i');
if (savedTheme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Project Card Animation
const animateProjects = () => {
    const projectsSection = document.querySelector('.projects');
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                projectCards.forEach((card, index) => {
                    card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1 + 0.1}s`;
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(projectsSection);
};

// Initialize animations when page loads
window.addEventListener('load', () => {
    animateProjects();
    
    // Set initial state for animation
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
});

// Mobile Menu Toggle (for smaller screens)
const menuBtn = document.createElement('div');
menuBtn.className = 'menu-btn';
menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
menuBtn.style.display = 'none';
document.querySelector('.header .container').appendChild(menuBtn);

const navbar = document.querySelector('.navbar');

menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    if (navbar.classList.contains('active')) {
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Show/hide mobile menu button based on screen size
function handleResize() {
    if (window.innerWidth <= 768) {
        menuBtn.style.display = 'flex';
        navbar.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        menuBtn.style.display = 'none';
        navbar.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);
handleResize();