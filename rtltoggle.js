// RTL Toggle Logic
const rtlToggle = document.getElementById('rtl-toggle');
const htmlTag = document.documentElement;

const savedDir = localStorage.getItem('dir') || 'ltr';
htmlTag.setAttribute('dir', savedDir);
updateRtlButtonText(savedDir);

if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
        const currentDir = htmlTag.getAttribute('dir');
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

        htmlTag.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
        updateRtlButtonText(newDir);

        // Reload for layout recalculation if needed (optional)
        // window.location.reload(); 
    });
}

function updateRtlButtonText(dir) {
    if (rtlToggle) {
        rtlToggle.title = dir === 'ltr' ? 'Switch to RTL' : 'Switch to LTR';
    }
}
