<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="auth-container">
    <div class="animate-fade-in">
        <div class="card p-4 border-0 shadow-lg glass-card" style="width: 100%; max-width: 450px;">
            <h3 class="text-center mb-4 fw-bold text-uppercase"
                style="font-family: 'Orbitron', sans-serif; color: var(--header-red); letter-spacing: 2px;">Portal
                Access</h3>

            <?php if (isset($_SESSION['success'])): ?>
                <div class="alert alert-success bg-success bg-opacity-10 border-success text-success small">
                    <i class="bi bi-check-circle me-2"></i>
                    <?php echo $_SESSION['success'];
                    unset($_SESSION['success']); ?>
                </div>
            <?php endif; ?>

            <?php if (isset($error)): ?>
                <div class="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger small">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    <?php echo $error; ?>
                </div>
            <?php endif; ?>

            <form action="<?php echo url('/login'); ?>" method="POST">
                <div class="mb-4">
                    <label class="form-label small text-uppercase fw-bold opacity-50">Neural Identity (Email)</label>
                    <input type="email" name="email"
                        class="form-control bg-dark text-white border-secondary opacity-75 py-2" required
                        placeholder="name@example.com">
                </div>
                <div class="mb-4">
                    <label class="form-label small text-uppercase fw-bold opacity-50">Access Key (Password)</label>
                    <input type="password" name="password"
                        class="form-control bg-dark text-white border-secondary opacity-75 py-2" required
                        placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-primary w-100 py-3 shadow-neon">Authorize Access</button>
            </form>

            <p class="mt-4 text-center small opacity-75 mb-0">
                New identity required? <a href="<?php echo url('/register'); ?>"
                    class="text-danger text-decoration-none fw-bold">Initialize Account</a>
            </p>
        </div>
    </div>
</div>

<style>
    body {
        overflow: hidden !important;
    }

    .auth-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        padding: 20px;
    }

    footer {
        position: fixed !important;
        bottom: 0;
        left: 0;
        width: 100%;
        margin-top: 0 !important;
        padding-top: 20px !important;
        padding-bottom: 20px !important;
        background: transparent !important;
        display: flex;
        justify-content: center;
        z-index: 2;
    }

    footer .container {
        border-top: none !important;
        padding-top: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
    }

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
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .glass-card {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
    }

    .shadow-neon {
        box-shadow: 0 0 15px rgba(255, 10, 10, 0.3);
    }

    .shadow-neon:hover {
        box-shadow: 0 0 25px rgba(255, 10, 10, 0.5);
    }
</style>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<?php include '../app/views/layouts/footer.php'; ?>