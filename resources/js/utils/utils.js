/**
 * Helper function to animate progress smoothly
 * @param {Function} setProgress - Function to update progress state
 * @param {number} start - Starting progress percentage
 * @param {number} end - Ending progress percentage
 * @param {number} duration - Animation duration in milliseconds
 * @returns {Promise} Promise that resolves when animation completes
 */
export function animateProgress(setProgress, start, end, duration) {
    return new Promise((resolve) => {
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(start + ((end - start) * elapsed) / duration, end);
            setProgress(Math.round(progress));

            if (progress < end) {
                requestAnimationFrame(updateProgress);
            } else {
                setProgress(end);
                resolve();
            }
        };

        updateProgress();
    });
};

/**
 * Helper function to create a delay promise
 * @param {number} duration - Delay duration in milliseconds
 * @returns {Promise} Promise that resolves after the delay
 */
export function createDelay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
};