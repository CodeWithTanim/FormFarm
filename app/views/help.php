<?php include '../app/views/layouts/header.php'; ?>

<div id="particles-js"></div>

<div class="row min-vh-100 py-5 justify-content-center" style="position: relative; z-index: 1;">
    <div class="col-lg-9 animate-fade-in">
        <div class="text-center mb-5">
            <h1 class="display-4 fw-bold text-uppercase" style="color: var(--header-red); letter-spacing: 3px;">
                Technical Documentation</h1>
            <p class="lead opacity-75 text-uppercase small tracking-widest">Mastering the Neural Form Interface</p>
        </div>

        <div class="row g-4">
            <!-- Step 1 -->
            <div class="col-md-12 mb-4">
                <div class="card glass-card p-4 border-0 shadow-lg">
                    <h3 class="fw-bold mb-3"><span class="text-danger me-2">01.</span> Initialize Your Node</h3>
                    <p class="opacity-75">To begin collecting data, navigate to your <a
                            href="<?php echo url('/dashboard'); ?>" class="text-danger">Dashboard</a> and create a new
                        <strong>Node</strong>. Each node represents a unique form endpoint with its own dedicated data
                        stream.</p>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="col-md-12 mb-4">
                <div class="card glass-card p-4 border-0 shadow-lg">
                    <h3 class="fw-bold mb-3"><span class="text-danger me-2">02.</span> Neural Integration (Integration
                        Guide)</h3>
                    <p class="opacity-75 mb-4">Copy the <strong>Endpoint URL</strong> from your dashboard and insert it
                        into your HTML form's <code>action</code> attribute. Ensure the <code>method</code> is set to
                        <code>POST</code>.</p>

                    <div class="payload-block p-4 rounded shadow-inner mb-4">
                        <div class="text-uppercase small opacity-50 mb-3 border-bottom border-secondary pb-2">HTML
                            Implementation Example</div>
                        <pre class="mb-0" style="color: #a9b7c6;"><span style="color: #cc7832;">&lt;form</span> <span style="color: #ffc66d;">action=</span><span style="color: #6a8759;">"<?php echo url('/f/YOUR_NODE_KEY'); ?>"</span> <span style="color: #ffc66d;">method=</span><span style="color: #6a8759;">"POST"</span><span style="color: #cc7832;">&gt;</span>
    <span style="color: #cc7832;">&lt;input</span> <span style="color: #ffc66d;">type=</span><span style="color: #6a8759;">"text"</span> <span style="color: #ffc66d;">name=</span><span style="color: #6a8759;">"client_name"</span> <span style="color: #ffc66d;">placeholder=</span><span style="color: #6a8759;">"Full Name"</span> <span style="color: #ffc66d;">required</span><span style="color: #cc7832;">&gt;</span>
    <span style="color: #cc7832;">&lt;input</span> <span style="color: #ffc66d;">type=</span><span style="color: #6a8759;">"email"</span> <span style="color: #ffc66d;">name=</span><span style="color: #6a8759;">"client_email"</span> <span style="color: #ffc66d;">placeholder=</span><span style="color: #6a8759;">"Email Address"</span> <span style="color: #ffc66d;">required</span><span style="color: #cc7832;">&gt;</span>
    <span style="color: #cc7832;">&lt;textarea</span> <span style="color: #ffc66d;">name=</span><span style="color: #6a8759;">"client_message"</span> <span style="color: #cc7832;">&gt;&lt;/textarea&gt;</span>
    <span style="color: #cc7832;">&lt;button</span> <span style="color: #ffc66d;">type=</span><span style="color: #6a8759;">"submit"</span><span style="color: #cc7832;">&gt;</span>Transmit Data<span style="color: #cc7832;">&lt;/button&gt;</span>
<span style="color: #cc7832;">&lt;/form&gt;</span></pre>
                    </div>

                    <ul class="opacity-75 list-unstyled">
                        <li><i class="bi bi-cpu text-danger me-2"></i><strong>Smart Keys:</strong> The <code>name</code>
                            attributes of your inputs will automatically become keys in your submissions dashboard.</li>
                        <li><i class="bi bi-shield-lock text-danger me-2"></i><strong>Security:</strong> All
                            transmissions are handled over high-security encrypted protocols.</li>
                    </ul>
                </div>
            </div>

            <!-- Step 3 -->
            <div class="col-md-12 mb-4">
                <div class="card glass-card p-4 border-0 shadow-lg">
                    <h3 class="fw-bold mb-3"><span class="text-danger me-2">03.</span> Analyze Data Streams</h3>
                    <p class="opacity-75">Once a client submits your form, the data packet is instantly routed to your
                        dashboard. You can view, manage, and export all incoming payloads chronologically in the
                        <strong>Incoming Data Stream</strong> section.</p>
                </div>
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

    .payload-block {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.05);
        font-family: 'Courier New', Courier, monospace;
        font-size: 14px;
        overflow-x: auto;
    }
</style>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

<?php include '../app/views/layouts/footer.php'; ?>