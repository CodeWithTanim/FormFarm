<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="row min-vh-100 align-items-center justify-content-center m-0" style="position: relative; z-index: 1;">
    <div class="col-md-7 text-center animate-fade-in">
        <div class="card glass-card p-5 border-0 shadow-lg position-relative overflow-hidden">
            <!-- Subtle Animated Glow -->
            <div class="glow-effect"></div>
            
            <div class="mb-4 text-glow animate-float">
                <i class="bi bi-shield-check display-1"></i>
            </div>
            
            <h1 class="display-5 fw-bold mb-3 text-uppercase main-title">
                Submission Successful
            </h1>
            
            <div class="status-badge mb-4">
                <span class="badge rounded-pill px-3 py-2 bg-success text-dark fw-bold">SECURELY DELIVERED</span>
            </div>
            
            <p class="lead mb-4 text-white opacity-75">
                Your data has been successfully submitted to the Admin.<br>
                <span class="fs-6 opacity-50">Please wait for a response from our coordination center.</span>
            </p>
            
            <div class="mt-4">
                <a href="javascript:history.back()" class="btn btn-premium px-5 py-3">
                    <i class="bi bi-chevron-left me-2"></i>Return to Source
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }

    .animate-fade-in {
        animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .animate-float {
        animation: float 3s ease-in-out infinite;
    }

    .card.glass-card {
        background: rgba(10, 10, 10, 0.4) !important;
        backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        border-radius: 32px;
        box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8) !important;
    }

    .main-title {
        color: #ffffff;
        letter-spacing: 4px;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    }

    .text-glow {
        color: #00ffaa;
        filter: drop-shadow(0 0 15px rgba(0, 255, 170, 0.4));
    }

    .glow-effect {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(0, 255, 170, 0.05) 0%, transparent 70%);
        pointer-events: none;
    }

    .btn-premium {
        background: linear-gradient(135deg, #ff0a0a 0%, #cc0000 100%);
        color: white;
        border: none;
        border-radius: 14px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        transition: all 0.4s ease;
        box-shadow: 0 10px 20px -10px rgba(255, 10, 10, 0.5);
    }

    .btn-premium:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 20px 40px -10px rgba(255, 10, 10, 0.7);
        color: white;
    }

    .status-badge .badge {
        font-size: 0.75rem;
        letter-spacing: 1.5px;
        background: #00ffaa !important;
    }
</style>

<?php include '../app/views/layouts/footer.php'; ?>