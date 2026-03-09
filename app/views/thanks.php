<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="row min-vh-100 align-items-center justify-content-center" style="position: relative; z-index: 1;">
    <div class="col-md-8 text-center animate-fade-in">
        <div class="card glass-card p-5 border-0 shadow-lg">
            <div class="mb-4 text-success">
                <i class="bi bi-check-circle-fill display-1"></i>
            </div>
            <h1 class="display-4 fw-bold mb-3 text-uppercase" style="color: #00ff88; letter-spacing: 3px;">
                Transmission Successful
            </h1>
            <p class="lead mb-4 opacity-75">
                Data packet received and securely stored in the <strong>
                    <?php echo htmlspecialchars($form_name); ?>
                </strong> node.
            </p>
            <div class="mt-4">
                <a href="javascript:history.back()" class="btn btn-primary btn-lg px-5 py-3">
                    <i class="bi bi-arrow-left me-2"></i>Return to Source
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }

    .glass-card {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
    }
</style>

<?php include '../app/views/layouts/footer.php'; ?>