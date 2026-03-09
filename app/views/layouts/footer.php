</div> <!-- End of container opened in header.php -->

<footer class="mt-auto py-4 text-center"
    style="position: relative; z-index: 1; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); border-top: 1px solid var(--glass-border);">
    <div class="container">
        <p class="mb-0 small tracking-widest text-white">
            <span style="color: rgba(255,255,255,0.5);">&copy; <?php echo date('Y'); ?></span>
            <span class="fw-bold mx-2" style="color: #ffffff; letter-spacing: 2px;">FORMFARM</span>
            <span style="color: rgba(255,255,255,0.3);">|</span>
            <a href="https://github.com/CodeWithTanim" target="_blank" class="animated-credit ms-2">
                <span class="made-by">Made by</span>
                <span class="tanim-name">CodeWithTanim</span>
            </a>
        </p>
    </div>
</footer>

<style>
    .animated-credit {
        text-decoration: none;
        position: relative;
        display: inline-block;
        transition: 0.3s;
        padding: 0 5px;
    }

    .animated-credit .made-by {
        color: rgba(255, 255, 255, 0.8);
        font-weight: 400;
        transition: 0.3s;
    }

    .animated-credit .tanim-name {
        color: var(--header-red);
        font-family: 'Orbitron', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: 0.3s;
        text-shadow: 0 0 10px rgba(255, 10, 10, 0);
    }

    .animated-credit:hover .made-by {
        color: #ffffff;
    }

    .animated-credit:hover .tanim-name {
        color: #ffffff;
        text-shadow: 0 0 15px rgba(255, 76, 76, 0.8), 0 0 30px rgba(255, 76, 76, 0.4);
        transform: scale(1.05);
    }

    .animated-credit::after {
        content: '';
        position: absolute;
        width: 0;
        height: 1px;
        bottom: -2px;
        left: 0;
        background-color: var(--header-red);
        transition: 0.3s;
        box-shadow: 0 0 10px var(--header-red);
    }

    .animated-credit:hover::after {
        width: 100%;
    }

    .tracking-widest {
        letter-spacing: 0.2em;
    }
</style>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
<script>
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#FFFFFF"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": false
                },
                "size": {
                    "value": 5,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ff0a0a",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
</script>
</body>

</html>