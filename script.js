// JavaScript for swipe functionality
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', touchStart);
document.addEventListener('touchmove', touchMove);

function touchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function touchMove(event) {
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    const diffX = startX - currentX;
    const diffY = startY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe detected
        if (diffX > 0) {
            // Swipe left
            showNextTicket();
        } else {
            // Swipe right
            // Add logic for going back if needed
        }
    }
}

function showNextTicket() {
    // Add logic to show the next ticket
    console.log('Show next ticket');
}
