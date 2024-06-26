function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

};

locoScroll();

function loaderAnime() {
    var tl = gsap.timeline();

    tl.to("#loader", {
        y: "-100%",
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out"
    });

    tl.to("#center", {
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)",
        duration: 1.4,
        delay: 0.3,
        ease: "power3.out"
    });

    tl.from("#nav", {
        y: "-100%",
        duration: 0.6,
        ease: "power3.out"
    });

    tl.to("#loader", {
        display: "none"
    });
};

loaderAnime();

function page1Anime() {
    var tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top -25%",
            end: "top -200%",
            scrub: 1,
            pin: true,
            markers: false
        }
    });

    tl1.to("#center img", {
        transform: "scale(1)",
    }, "center-img");

    // Reduced the width of the center div
    tl1.to("#center", {
        scale: 0.8,
    }, "center-img");

    tl1.to("#page1-part1 img", {
        y: "-100%",
    }, "center-img");

    tl1.to("#page1-part1-bottom", {
        y: "-200%",
    }, "center-img");

    tl1.to("#left", {
        transform: "translateY(-7.8%)"
    }, "side-scroll");

    tl1.to("#right", {
        transform: "translateY(5%)"
    }, "side-scroll");
};

page1Anime();

function page2Anime() {
    var tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            markers: false,
            start: "top 30%",
            end: "top -15%",
            scrub: 4
        }
    });

    tl2.to("#page2-line1", {
        x: "-40%",
        duration: 8,
        ease: "power2.out"
    }, "page2");

    tl2.to("#page2-line2 ", {
        x: "30%",
        duration: 8,
        delay: 0.8,
        ease: "power2.out"
    }, "page2");

    tl2.to("#page2-line3", {
        x: "-26%",
        duration: 8,
        delay: 2.5,
        ease: "power2.out"
    }, "page2");
};

page2Anime();

function textReveal() {
    var clutter = "";
    document.querySelector("#page2-text h2").textContent.split(" ").forEach(function (word) {
        clutter += ` <span>${word}</span>`;
    });

    document.querySelector("#page2-text h2").innerHTML = clutter;

    gsap.to("#page2-text h2 span", {
        color: "#FF3227",
        duration: 4,
        stagger: 0.4,
        scrollTrigger: {
            trigger: "#page2-line2",
            scroller: "#main",
            start: "top 10%",
            end: "top -5%",
            scrub: 1,
            markers: false,
        }
    });
};

textReveal();

function page3Anime() {

    gsap.from("#page3 h4", {
        y: 200,
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#page3",
            scroller: "#main",
            start: "top 35%",
            end: "top 5%",
            markers: false,
            scrub: true
        }
    })
};

page3Anime();

function page4Anime() {
    gsap.to("#page4-wrapper", {
        transform: "translateX(-198%)",
        duration: 5,
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top top",
            end: "top -300%",
            scrub: 1,
            pin: true,
            markers: false
        }
    });
};

page4Anime();

function page5Anime() {
    gsap.from("#page5 .page5-text h1", {
        y: 200,
        scrollTrigger: {
            trigger: "#page5",
            scroller: "#main",
            markers: false,
            start: "top: 55%",
            end: "top 35%",
            scrub: true
        }
    }, "page5");

    gsap.from("#page5 #page5-line2 h1", {
        y: 200,
        delay: 0.3,
        scrollTrigger: {
            trigger: "#page5",
            scroller: "#main",
            markers: false,
            start: "top: 55%",
            end: "top 35%",
            scrub: true
        }
    }, "page5");

    gsap.from("#page5 #page5-line2 img", {
        y: 200,
        delay: 0.3,
        scrollTrigger: {
            trigger: "#page5",
            scroller: "#main",
            markers: false,
            start: "top: 55%",
            end: "top 35%",
            scrub: true
        }
    }, "page5");
};

page5Anime();

function page6Anime() {
    gsap.to("#page6-img2", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.out",
        duration: 4,
        scrollTrigger: {
            trigger: "#page6",
            scroller: "#main",
            start: "top 50%",
            end: "top 30%",
            scrub: 1
        }
    });

    gsap.to("#page6-img1", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.out",
        duration: 4,
        scrollTrigger: {
            trigger: "#page6-img1",
            scroller: "#main",
            start: "top 50%",
            end: "top 30%",
            scrub: 1
        }
    });
};

page6Anime();

function page7() {
    var tl7 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page7",
            scroller: "#main",
            start: "top 50%",
            end: "top -60%",
            scrub: 1,
        }
    })

    tl7.to("#page7-svg ", {
        x: -10,
        duration: 4
    }, "a");

    tl7.to("#one", {
        x: 350,
        delay: 1.5,
        duration: 3
    }, "a");

    tl7.to("#two", {
        x: 350,
        delay: 1.7,
        duration: 3
    }, "a");

    tl7.to("#three", {
        x: -300,
        delay: 1.8,
        duration: 3
    }, "a");
};

page7();

function page8Anime() {
    gsap.to("#page8-img2", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.out",
        duration: 4,
        scrollTrigger: {
            trigger: "#page8",
            scroller: "#main",
            start: "top 50%",
            end: "top 30%",
            scrub: 1
        }
    });

    gsap.to("#page8-img1", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.out",
        duration: 4,
        scrollTrigger: {
            trigger: "#page8-img1",
            scroller: "#main",
            start: "top 50%",
            end: "top 30%",
            scrub: 1
        }
    });
};

page8Anime();

function page9Anime() {
    gsap.to("#page9-img", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power4.out",
        duration: 4,
        scrollTrigger: {
            trigger: "#page9",
            scroller: "#main",
            start: "top 45%",
            end: "top 25%",
            scrub: 1,
            markers: false
        }
    });
};

page9Anime();

function page10Anime(){
    gsap.from("#page10 .page10-text h1", {
        y: 200,
        scrollTrigger: {
            trigger: "#page10",
            scroller: "#main",
            markers: false,
            start: "top: 55%",
            end: "top 35%",
            scrub: true
        }
    }, "page10");

    gsap.from("#page10 .page10-text img", {
        y: 200,
        scrollTrigger: {
            trigger: "#page10",
            scroller: "#main",
            markers: false,
            start: "top: 55%",
            end: "top 35%",
            scrub: true
        }
    }, "page10");
};

page10Anime();

function page11Anime(){
    gsap.from("#page11 .page11-text h1", {
        y: 220,
        scrollTrigger: {
            trigger: "#page11",
            scroller: "#main",
            markers: false,
            start: "top: 55%",
            end: "top 35%",
            scrub: true
        }
    });
};

page11Anime();


