<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="row min-vh-100 align-items-center justify-content-center" style="position: relative; z-index: 1;">
    <div class="col-md-8 text-center animate-fade-in">
        <div class="card glass-card p-5 border-0 shadow-lg">
            <div class="mb-4 text-danger">
                <i class="bi bi-cpu display-1"></i>
            </div>
            <h1 class="display-5 fw-bold mb-3 text-uppercase" style="color: var(--header-red); letter-spacing: 2px;">
                Endpoint Active
            </h1>
            <p class="lead mb-4 opacity-75">
                This neural node is live and ready to receive data, but it requires a <strong>POST</strong>
                transmission.
            </p>

            <div class="alert alert-danger bg-dark border-danger text-light py-3 mb-4">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <strong>Notice:</strong> If you see this after submitting a form, your hosting provider may be
                redirecting POST to GET for security validation (e.g., 'Test Cookie').
            </div>

            <div class="mt-4">
                <a href="<?php echo url('/help'); ?>" class="btn btn-outline-light px-4 py-2 me-2">
                    <i class="bi bi-book me-2"></i>Integration Guide
                </a>
                <a href="<?php echo url('/dashboard'); ?>" class="btn btn-primary px-4 py-2">
                    <i class="bi bi-speedometer2 me-2"></i>Dashboard
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