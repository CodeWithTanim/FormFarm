<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="row min-vh-100 align-items-center">
    <div class="col-lg-8 mx-auto text-center py-5" style="position: relative; z-index: 1;">
        <h1 class="display-3 fw-bold mb-3 animate-fade-in">
            <span style="color: var(--accent-red);">FUTURE</span> OF FORM COLLECTION
        </h1>
        <p class="lead mb-5 opacity-75">Just point your forms to our endpoint and we'll handle the rest. No backend
            required. Purely serverless, purely powerful.</p>

        <div class="d-flex justify-content-center gap-3 mt-4">
            <?php if (isset($_SESSION['user_id'])): ?>
                <a href="<?php echo url('/dashboard'); ?>" class="btn btn-primary btn-lg px-5 py-3">Enter Dashboard</a>
            <?php else: ?>
                <a href="<?php echo url('/register'); ?>" class="btn btn-primary btn-lg px-5 py-3">Initialize Account</a>
                <a href="<?php echo url('/login'); ?>" class="btn btn-outline-light btn-lg px-5 py-3">Access Portal</a>
            <?php endif; ?>
        </div>
    </div>
</div>

<div class="row mt-5 g-4" style="position: relative; z-index: 1;">
    <div class="col-md-4">
        <div class="card p-4 h-100 text-center border-0 shadow-lg">
            <div class="mb-3 text-danger"><i class="bi bi-cpu fs-1"></i></div>
            <h4 class="fw-bold mb-3">1. Construct Form</h4>
            <p class="opacity-75">Define your form structure and receive a unique neural endpoint key instantly.</p>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card p-4 h-100 text-center border-0 shadow-lg">
            <div class="mb-3 text-danger"><i class="bi bi-plug fs-1"></i></div>
            <h4 class="fw-bold mb-3">2. Interface Sync</h4>
            <p class="opacity-75">Insert the endpoint into your HTML. Compatible with any frontend architecture.</p>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card p-4 h-100 text-center border-0 shadow-lg">
            <div class="mb-3 text-danger"><i class="bi bi-reception-4 fs-1"></i></div>
            <h4 class="fw-bold mb-3">3. Data Stream</h4>
            <p class="opacity-75">Analyze incoming data packets via our advanced analytics dashboard.</p>
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
        animation: fadeIn 1s ease-out forwards;
    }
</style>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<?php include '../app/views/layouts/footer.php'; ?>