document.addEventListener("DOMContentLoaded", () => {
    // 1. Page Loader
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 500);
    }, 1000);

    // 2. Sticky Navbar & Back to Top Button
    const navbar = document.getElementById("navbar");
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
            backToTop.style.display = "flex";
        } else {
            navbar.classList.remove("scrolled");
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 3. Mobile Hamburger Menu
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.innerHTML = navLinks.classList.contains("active") 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // 4. Animated Counters on Scroll
    const counters = document.querySelectorAll(".counter");
    let hasAnimated = false;

    const animateCounters = () => {
        const counterSection = document.getElementById("counters");
        if (!counterSection) return;
        
        const sectionPos = counterSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos && !hasAnimated) {
            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                let count = 0;
                const speed = target / 50;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
            hasAnimated = true;
        }
    };

    window.addEventListener("scroll", animateCounters);

    // 5. Lightbox Gallery Modal
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightbox = document.querySelector(".close-lightbox");
    const galleryImages = document.querySelectorAll(".gallery-img");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });

    // 6. FAQ Accordion
    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");
        header.addEventListener("click", () => {
            // Close other items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }
            });
            // Toggle current item
            item.classList.toggle("active");
        });
    });

    // 7. Form Submission Alert
    const gymForm = document.getElementById("gymForm");
    if (gymForm) {
        gymForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank You! Your application for Karachi Club GYM has been received. Our representative will contact you via WhatsApp shortly.");
            gymForm.reset();
        });
    }
});