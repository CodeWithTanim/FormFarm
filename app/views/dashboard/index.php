<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="row mb-5 animate-fade-in" style="position: relative; z-index: 1;">
    <div class="col-md-4">
        <div class="card p-4 border-0 shadow-lg position-relative overflow-hidden"
            style="background: rgba(255, 10, 10, 0.05); border: 1px solid rgba(255, 10, 10, 0.2) !important;">
            <div class="position-absolute top-0 end-0 p-3 opacity-25">
                <i class="bi bi-layers fs-1"></i>
            </div>
            <h5 class="small text-uppercase fw-bold mb-3" style="color: var(--header-red); letter-spacing: 1px;">Neural
                Endpoints</h5>
            <h2 class="display-4 fw-bold mb-0">
                <?php echo $totalForms; ?>
            </h2>
            <div class="mt-2 small opacity-50">Active form collection points</div>
        </div>
    </div>
</div>

<div class="card mb-4 border-0 shadow-lg animate-fade-in"
    style="position: relative; z-index: 1; animation-delay: 0.2s;">
    <div class="card-header bg-transparent py-4 d-flex justify-content-between align-items-center border-bottom border-secondary"
        style="border-color: rgba(255,255,255,0.1) !important;">
        <h4 class="mb-0 fw-bold"><i class="bi bi-clock-history me-2 text-danger"></i>Recent Activity</h4>
        <a href="<?php echo url('/forms'); ?>" class="btn btn-sm btn-outline-light px-3">View All Nodes</a>
    </div>
    <div class="card-body p-0">
        <?php if (empty($forms)): ?>
            <div class="p-5 text-center">
                <p class="opacity-50 mb-3">No active data streams detected.</p>
                <a href="<?php echo url('/forms/create'); ?>" class="btn btn-primary">Initialize New Form</a>
            </div>
        <?php else: ?>
            <div class="table-responsive">
                <table class="table table-dark table-hover mb-0 align-middle">
                    <thead class="text-uppercase small opacity-50">
                        <tr>
                            <th class="ps-4 py-3">Source Name</th>
                            <th class="py-3">Created</th>
                            <th class="pe-4 py-3 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($forms as $form): ?>
                            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <td class="ps-4 py-3 fw-bold">
                                    <i class="bi bi-file-earmark-text me-2 opacity-50"></i>
                                    <?php echo htmlspecialchars($form['form_name']); ?>
                                </td>
                                <td class="py-3 opacity-75">
                                    <?php echo date('M d, Y', strtotime($form['created_at'])); ?>
                                </td>
                                <td class="pe-4 py-3 text-end">
                                    <a href="<?php echo url('/forms/' . $form['id'] . '/submissions'); ?>"
                                        class="btn btn-sm btn-outline-danger px-3">Submissions</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
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
        opacity: 0;
    }

    .table-hover tbody tr:hover {
        background-color: rgba(255, 10, 10, 0.05) !important;
    }
</style>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<?php include '../app/views/layouts/footer.php'; ?>