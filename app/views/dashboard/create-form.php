<?php include '../app/views/layouts/header.php'; ?>

<div class="row justify-content-center">
    <div class="col-md-6">
        <div class="card p-4">
            <h3 class="mb-4">Create New Form</h3>
            <?php if (isset($error)): ?>
                <div class="alert alert-danger">
                    <?php echo $error; ?>
                </div>
            <?php endif; ?>
            <form action="<?php echo url('/forms/create'); ?>" method="POST">
                <div class="mb-3">
                    <label class="form-label">Form Name</label>
                    <input type="text" name="name" class="form-control"
                        placeholder="e.g. Contact Page Form, Newsletter Signup" required>
                    <div class="form-text">This name is just for your reference.</div>
                </div>
                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-primary">Create Form</button>
                    <a href="<?php echo url('/forms'); ?>" class="btn btn-light">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include '../app/views/layouts/footer.php'; ?>