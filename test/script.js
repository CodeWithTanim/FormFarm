document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const endpointInput = document.getElementById('endpoint_url');
    const inputs = form.querySelectorAll('input, textarea');

    if (endpointInput) {
        endpointInput.addEventListener('input', () => {
            form.action = endpointInput.value.trim();
        });
    }

    // Add focused class to labels for better styling control if needed
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = 'var(--primary-color)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.querySelector('label').style.color = 'var(--text-secondary)';
            }
        });
    });

    // Handle form submission with a premium transition
    form.addEventListener('submit', (e) => {
        // We don't prevent default because we want the form to post to the FormFarm endpoint
        // But we can update the UI state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Transmitting Data...';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'wait';
        
        // Add a small delay for visual effect (though the actual submit will happen immediately or cause navigation)
        // If the user wants a pure AJAX submission, they'd use fetch, but the prompt says 
        // "using the post method: https://form.codewithtanim.works/f/98937ab43952573c"
        // and usually these endpoints redirect on success.
    });

    // Subtle parallax effect on the card
    document.addEventListener('mousemove', (e) => {
        const card = document.querySelector('.interface-card');
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});
