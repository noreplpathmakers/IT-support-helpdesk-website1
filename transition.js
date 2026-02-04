document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const GRID_COLS = 8;
    const GRID_ROWS = 6;
    const ANIMATION_DURATION = 1000; // ms

    // Only run on main pages
    const validPages = ['index.html', 'index2.html'];
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Inject Overlay
    const overlay = document.createElement('div');
    overlay.id = 'puzzle-overlay';
    document.body.appendChild(overlay);

    // Generate Grid
    const totalPieces = GRID_COLS * GRID_ROWS;
    const pieceWidth = 100 / GRID_COLS;
    const pieceHeight = 100 / GRID_ROWS;

    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.width = `${pieceWidth}%`;
        piece.style.height = `${pieceHeight}%`;

        // Generate Random Scatter Values
        // Translate X: -100px to 100px
        const tx = (Math.random() - 0.5) * 200;
        // Translate Y: -100px to 100px
        const ty = (Math.random() - 0.5) * 200;
        // Rotation: -45deg to 45deg
        const r = (Math.random() - 0.5) * 90;

        piece.style.setProperty('--tx', `${tx}px`);
        piece.style.setProperty('--ty', `${ty}px`);
        piece.style.setProperty('--r', `${r}deg`);

        overlay.appendChild(piece);
    }

    const pieces = document.querySelectorAll('.puzzle-piece');

    // Function to shuffle array for random animation order
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // CHECK FOR ENTRY ANIMATION
    if (sessionStorage.getItem('puzzle-transition') === 'true') {
        // We are arriving from a transition
        // 1. Set overlay to visible and fully covering immediately
        overlay.classList.add('puzzle-animating');
        pieces.forEach(p => p.classList.add('puzzle-active'));

        // 2. Animate OUT (Reveal Page) after a brief delay
        setTimeout(() => {
            const shuffledPieces = Array.from(pieces);
            shuffle(shuffledPieces);

            shuffledPieces.forEach((p, index) => {
                setTimeout(() => {
                    p.classList.remove('puzzle-active');
                    p.classList.add('puzzle-hidden');
                }, index * (800 / totalPieces)); // Staggered delay spread over 800ms
            });

            // Cleanup
            setTimeout(() => {
                overlay.classList.remove('puzzle-animating');
                sessionStorage.removeItem('puzzle-transition');
            }, ANIMATION_DURATION + 800);
        }, 100);
    } else {
        // Normal load: pieces should be hidden
        pieces.forEach(p => p.classList.add('puzzle-hidden'));
    }

    // HANDLE CLICKS
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Internal navigation check
            if (href && validPages.includes(href) && href !== currentPage && href !== "#") {
                e.preventDefault();

                // Double-click prevention
                if (overlay.classList.contains('puzzle-animating')) return;

                // Exit Animation (Cover Page)
                sessionStorage.setItem('puzzle-transition', 'true');
                overlay.classList.add('puzzle-animating');

                const shuffledPieces = Array.from(pieces);
                shuffle(shuffledPieces);

                shuffledPieces.forEach((p, index) => {
                    setTimeout(() => {
                        p.classList.remove('puzzle-hidden');
                        p.classList.add('puzzle-active');
                    }, index * (600 / totalPieces)); // Faster build-up for exit
                });

                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, ANIMATION_DURATION + 200);
            }
        });
    });
});
