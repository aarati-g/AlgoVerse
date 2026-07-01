document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is faster

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    // Calculate increment
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                
                // Stop observing once animated
                observer.unobserve(counter);
            }
        });
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(animateCounters, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
