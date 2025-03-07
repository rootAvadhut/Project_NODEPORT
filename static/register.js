document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const response = await fetch('/register', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            window.location.href = '/settings';
        } else {
            alert(`Error: ${result.error}`);
        }
    });
});

function generateEntries() {
    const numEntries = document.getElementById('num_coils').value;
    const container = document.getElementById('dynamic-entries');
    container.innerHTML = '';

    // Validation
    const bits = document.getElementById('num_bits').value;
    const registers = document.getElementById('num_registers').value;

    if (numEntries !== bits || bits !== registers) {
        alert('All values must be equal!');
        return;
    }

    for (let i = 1; i <= numEntries; i++) {
        const row = document.createElement('div');
        row.className = 'entry-row';

        row.innerHTML = `
            <div class="static-field">OUTPUT${i}</div>
            <div class="entry-field">
                <input type="text" name="coil_${i}" placeholder="00001" pattern="\\d{5}">
            </div>
            <div class="static-field">0</div>
            
            <div class="static-field">INPUT BIT${i}</div>
            <div class="entry-field">
                <input type="text" name="bit_${i}" placeholder="10001" pattern="\\d{5}">
            </div>
            <div class="static-field">0</div>
            
            <div class="static-field">ANALOG INPUT${i}</div>
            <div class="entry-field">
                <input type="text" name="register_${i}" placeholder="30001" pattern="\\d{5}">
            </div>
            <div class="static-field">0</div>
        `;

        container.appendChild(row);
    }

    document.getElementById('save-button').disabled = false;
}