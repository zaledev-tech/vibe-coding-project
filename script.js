// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Validate name
        if (name.value.trim() === '') {
            name.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate subject
        if (subject.value.trim() === '') {
            subject.closest('.form-group').classList.add('error');
            isValid = false;
        }

        // Validate message
        if (message.value.trim() === '') {
            message.closest('.form-group').classList.add('error');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            successMessage.style.display = 'block';
            contactForm.reset();
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Real-time validation on blur
    const formFields = [name, email, subject, message];
    
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            const formGroup = field.closest('.form-group');
            
            if (field.value.trim() === '') {
                formGroup.classList.add('error');
            } else {
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(field.value.trim())) {
                        formGroup.classList.remove('error');
                    } else {
                        formGroup.classList.add('error');
                    }
                } else {
                    formGroup.classList.remove('error');
                }
            }
        });

        // Remove error on input
        field.addEventListener('input', () => {
            if (field.value.trim() !== '') {
                field.closest('.form-group').classList.remove('error');
            }
        });
    });
}