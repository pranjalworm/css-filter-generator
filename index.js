const computeWorker = new Worker('compute-worker.js');

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
        ]
        : null;
}


$(document).ready(() => {
    $('button.execute').click(() => {
        const rgb = hexToRgb($('input.target').val());
        if (!rgb || !rgb.length || rgb.length !== 3) {
            alert('Invalid format!');
            return;
        }

        computeWorker.onmessage = (event) => {

            const { data } = event;
            const { result, color } = data;

            $('.realPixel').css('background-color', color);
            $('.filterPixel').attr('style', result.filter);
            $('.filterDetail').text(result.filter);
            $('.lossDetail').html(`Loss: ${result.loss.toFixed(1)}`);
        };

        computeWorker.postMessage(rgb);
    });
});
