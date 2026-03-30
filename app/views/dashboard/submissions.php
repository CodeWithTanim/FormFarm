<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="mb-5 d-flex justify-content-between align-items-end animate-fade-in"
    style="position: relative; z-index: 1;">
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-2 small text-uppercase">
                <li class="breadcrumb-item"><a href="<?php echo url('/forms'); ?>"
                        class="text-danger text-decoration-none">Nodes</a></li>
                <li class="breadcrumb-item active opacity-50" aria-current="page">
                    <?php echo htmlspecialchars($form['form_name']); ?>
                </li>
            </ol>
        </nav>
        <h2 class="fw-bold mb-0">Incoming Data Stream</h2>
    </div>
    <div class="text-end">
        <?php if (isset($_SESSION['flash_message'])): ?>
            <div class="alert alert-success bg-dark text-success border-success py-1 px-3 mb-2 small animate-fade-in">
                <?php echo $_SESSION['flash_message']; unset($_SESSION['flash_message']); ?>
            </div>
        <?php endif; ?>
        <div class="small text-uppercase opacity-50 mb-1">Packet Count</div>
        <span class="badge bg-danger fs-5 px-3">
            <?php echo count($submissions); ?>
        </span>
    </div>
</div>

<div class="card border-0 shadow-lg mb-5 animate-fade-in glass-card"
    style="position: relative; z-index: 1; animation-delay: 0.2s;">
    <div class="card-body p-0">
        <?php if (empty($submissions)): ?>
            <div class="p-5 text-center">
                <div class="mb-4 text-secondary opacity-25"><i class="bi bi-broadcast display-1"></i></div>
                <p class="opacity-50 fs-5 mb-0">Listening for incoming data packets...</p>
            </div>
        <?php else: ?>
            <form id="bulkDeleteForm" action="<?php echo url('/submissions/delete'); ?>" method="POST">
                <input type="hidden" name="form_id" value="<?php echo $form['id']; ?>">
                
                <div class="p-3 border-bottom border-secondary border-opacity-10 d-flex justify-content-between align-items-center">
                    <div class="form-check ps-4">
                        <input class="form-check-input" type="checkbox" id="selectAll">
                        <label class="form-check-label small text-uppercase opacity-50 ms-2" for="selectAll">
                            Select All
                        </label>
                    </div>
                    <button type="submit" id="deleteSelectedBtn" class="btn btn-sm btn-outline-danger px-3 d-none" onclick="return confirm('Purge selected data packets permanently?')">
                        <i class="bi bi-trash3 me-2"></i>Purge Selected
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-dark table-hover mb-0 align-middle">
                        <thead class="text-uppercase small opacity-50">
                            <tr>
                                <th class="ps-4 py-3" style="width: 50px;"></th>
                                <th class="py-3" style="width: 100px;">Sequence</th>
                                <th class="py-3">Extracted Payload</th>
                                <th class="pe-4 py-3 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($submissions as $index => $submission):
                                $data = json_decode($submission['data'], true);
                                ?>
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                                    <td class="ps-4 py-4">
                                        <input class="form-check-input submission-checkbox" type="checkbox" name="ids[]" value="<?php echo $submission['id']; ?>">
                                    </td>
                                    <td class="py-4">
                                        <span
                                            class="badge bg-secondary opacity-50">#<?php echo count($submissions) - $index; ?></span>
                                    </td>
                                    <td class="py-4">
                                        <div class="payload-block p-3 rounded shadow-inner">
                                            <?php foreach ($data as $key => $value): ?>
                                                <div class="mb-2 d-flex">
                                                    <span class="fw-bold text-danger me-2" style="min-width: 100px;">
                                                        <?php echo htmlspecialchars($key); ?>:
                                                    </span>
                                                    <span class="opacity-75">
                                                        <?php echo nl2br(htmlspecialchars($value)); ?>
                                                    </span>
                                                </div>
                                            <?php endforeach; ?>
                                        </div>
                                    </td>
                                    <td class="pe-4 py-4 text-end">
                                        <div class="small opacity-50 mb-2">
                                            <div class="fw-bold"><?php echo date('M d, Y', strtotime($submission['created_at'])); ?></div>
                                            <div><?php echo date('H:i:s', strtotime($submission['created_at'])); ?></div>
                                        </div>
                                        <button type="button" class="btn btn-sm btn-outline-danger border-0 opacity-50 hover-opacity-100" 
                                                onclick="deleteSingle(<?php echo $submission['id']; ?>)" title="Purge packet">
                                            <i class="bi bi-trash3"></i>
                                        </button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </form>

            <form id="singleDeleteForm" action="<?php echo url('/submissions/delete'); ?>" method="POST" style="display: none;">
                <input type="hidden" name="form_id" value="<?php echo $form['id']; ?>">
                <input type="hidden" name="ids" id="singleDeleteId">
            </form>
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

    .glass-card {
        background: rgba(255, 255, 255, 0.03) !important;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.05) !important;
    }

    .payload-block {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.05);
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
    }

    .table-hover tbody tr:hover {
        background-color: rgba(255, 10, 10, 0.03) !important;
    }

    .hover-opacity-100:hover {
        opacity: 1 !important;
    }

    .form-check-input:checked {
        background-color: var(--accent-red);
        border-color: var(--accent-red);
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const selectAll = document.getElementById('selectAll');
        const checkboxes = document.querySelectorAll('.submission-checkbox');
        const deleteBtn = document.getElementById('deleteSelectedBtn');

        if (selectAll) {
            selectAll.addEventListener('change', function() {
                checkboxes.forEach(cb => {
                    cb.checked = selectAll.checked;
                });
                updateDeleteButton();
            });
        }

        checkboxes.forEach(cb => {
            cb.addEventListener('change', function() {
                updateDeleteButton();
                if (!this.checked) {
                    selectAll.checked = false;
                } else {
                    const allChecked = Array.from(checkboxes).every(c => c.checked);
                    selectAll.checked = allChecked;
                }
            });
        });

        function updateDeleteButton() {
            const checkedCount = document.querySelectorAll('.submission-checkbox:checked').length;
            if (checkedCount > 0) {
                deleteBtn.classList.remove('d-none');
            } else {
                deleteBtn.classList.add('d-none');
            }
        }
    });

    function deleteSingle(id) {
        if (confirm('Purge this data packet permanently?')) {
            document.getElementById('singleDeleteId').value = id;
            document.getElementById('singleDeleteForm').submit();
        }
    }
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<?php include '../app/views/layouts/footer.php'; ?>