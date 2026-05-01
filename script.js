document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Update Footer Year Automatically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Navigation Background Change on Scroll
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '0.75rem 0';
            nav.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.padding = '1rem 0';
            nav.style.boxShadow = 'none';
        }
    });

    // 3. Smooth Scrolling for all Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Simple Console Greeting (For curious recruiters)
    console.log("%c Hello Amritanshu! Your portfolio is live.", "color: #6366f1; font-size: 20px; font-weight: bold;");
});