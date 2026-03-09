<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="d-flex justify-content-between align-items-center mb-5 animate-fade-in"
    style="position: relative; z-index: 1;">
    <h2 class="fw-bold mb-0"><i class="bi bi-grid-fill me-3 text-danger"></i>My Data Nodes</h2>
    <a href="<?php echo url('/forms/create'); ?>" class="btn btn-primary px-4 py-2">Initialize Node</a>
</div>

<?php if (empty($forms)): ?>
    <div class="card p-5 text-center border-0 shadow-lg animate-fade-in" style="position: relative; z-index: 1;">
        <div class="mb-4 text-danger opacity-50"><i class="bi bi-slash-circle display-1"></i></div>
        <p class="opacity-75 fs-5">No active neural endpoints detected on your network.</p>
        <div class="mt-4">
            <a href="<?php echo url('/forms/create'); ?>" class="btn btn-primary btn-lg">Create Your First Node</a>
        </div>
    </div>
<?php else: ?>
    <div class="row g-4" style="position: relative; z-index: 1;">
        <?php foreach ($forms as $index => $form): ?>
            <div class="col-md-6 animate-fade-in" style="animation-delay: <?php echo ($index * 0.1); ?>s;">
                <div class="card h-100 border-0 shadow-lg overflow-hidden glass-card">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-start mb-4">
                            <div>
                                <h4 class="card-title fw-bold mb-1">
                                    <?php echo htmlspecialchars($form['form_name']); ?>
                                </h4>
                                <p class="small opacity-50 mb-0">ID: <?php echo $form['form_key']; ?></p>
                            </div>
                            <span class="badge bg-danger rounded-pill px-3">ACTIVE</span>
                        </div>

                        <div class="mb-4">
                            <label class="form-label small text-uppercase fw-bold opacity-50 mb-2">Neural Link (Endpoint
                                URL)</label>
                            <div class="input-group">
                                <input type="text"
                                    class="form-control form-control-sm bg-dark text-white border-secondary opacity-75" readonly
                                    value="<?php echo url('/f/' . $form['form_key']); ?>" id="url-<?php echo $form['id']; ?>">
                                <button class="btn btn-outline-danger btn-sm px-3" type="button"
                                    onclick="copyToClipboard('url-<?php echo $form['id']; ?>')">Copy Link</button>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-auto border-top border-secondary pt-3"
                            style="border-color: rgba(255,255,255,0.05) !important;">
                            <div class="small opacity-50">
                                <i class="bi bi-calendar3 me-1"></i>
                                <?php echo date('M d, Y', strtotime($form['created_at'])); ?>
                            </div>
                            <div class="d-flex gap-2">
                                <a href="<?php echo url('/forms/' . $form['id'] . '/submissions'); ?>"
                                    class="btn btn-sm btn-light px-3">Submissions</a>
                                <form action="<?php echo url('/forms/' . $form['id'] . '/delete'); ?>" method="POST"
                                    onsubmit="return confirm('WARNING: Are you sure you want to terminate this node and wipe all its data?')">
                                    <button type="submit" class="btn btn-sm btn-outline-danger">Terminate</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

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
        opacity: 0;
    }

    .glass-card {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
        transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .glass-card:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 30px rgba(255, 10, 10, 0.1) !important;
        border-color: rgba(255, 10, 10, 0.3) !important;
    }
</style>

<script>
    function copyToClipboard(id) {
        const input = document.getElementById(id);
        input.select();
        document.execCommand('copy');
        const btn = input.nextElementSibling;
        const originalText = btn.innerText;
        btn.innerText = 'COPIED!';
        btn.classList.replace('btn-outline-danger', 'btn-danger');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.replace('btn-danger', 'btn-outline-danger');
        }, 2000);
    }
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<?php include '../app/views/layouts/footer.php'; ?>