/* Select DOM elements */ 
const video = document.querySelector('video');
const scrubberEmpty = document.querySelector('.scrubber-empty');
const scrubberFilled = document.querySelector('.scrubber-filled');
const coords = scrubberEmpty.getBoundingClientRect();
const [startY, height] = [coords.y, coords.height];
let adjustingPlaybackRate = false;


/* Define Function */ 
function logEvent(e) {
    // console.log(e);
    // we want to use e.clientY because coords.y starts at 169.5 
}

function scrub(e) {
    if (!adjustingPlaybackRate) return;
    const percentage = ((e.clientY - startY) / 400);
    let scrubSpeed = percentage * 4;
    // Significant digit formatting 
    if (scrubSpeed <= .1) {
        scrubSpeed = .1; 
    } else if (scrubSpeed > .1 && scrubSpeed < 1) {
        scrubSpeed = scrubSpeed.toPrecision(1);
    } else {
        scrubSpeed = scrubSpeed.toPrecision(2);
    }
    scrubberFilled.innerText = `${scrubSpeed}×`;
    scrubberFilled.style.height = `${Math.round(percentage * 100)}%`;
    video.playbackRate = scrubSpeed;
}

/* Set up Event Listeners */ 
scrubberEmpty.addEventListener('mousedown', () => adjustingPlaybackRate = true);
scrubberEmpty.addEventListener('mouseup', () => adjustingPlaybackRate = false);
scrubberEmpty.addEventListener('mouseleave', () => adjustingPlaybackRate = false);
scrubberEmpty.addEventListener('mousemove', scrub);
