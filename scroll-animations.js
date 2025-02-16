document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Add animation classes and observe elements
    document.querySelectorAll('section').forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('slide-from-left');
        } else {
            section.classList.add('slide-from-right');
        }
        observer.observe(section);
    });

    // Animate individual elements within sections
    const animatedElements = document.querySelectorAll('.entity, .teacher-profile, img[alt="Kite Image"], img[alt="Teacher with Kids"], .teacherss');
    animatedElements.forEach((element, index) => {
        if (index % 2 === 0) {
            element.classList.add('slide-from-left');
        } else {
            element.classList.add('slide-from-right');
        }
        observer.observe(element);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});
