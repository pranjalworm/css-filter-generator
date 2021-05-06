const computeWorker = new Worker('compute-worker.js');

const filterDetailRef = document.getElementsByClassName('filterDetail')[0];
const copyButtonRef = document.getElementsByClassName('copy-button')[0];


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


function copyToClipboard() {

  const resultString = filterDetailRef.innerHTML;

  console.log(resultString)

  navigator.clipboard.writeText(resultString).then(() => {
    copyButtonRef.classList.remove('copy-failed');
    copyButtonRef.classList.add('copy-successful');
    copyButtonRef.innerHTML = 'Copied';
  }, () => {
    copyButtonRef.classList.add('copy-failed');
    copyButtonRef.classList.remove('copy-successful');
    copyButtonRef.innerHTML = 'Copy Failed';
  });
}


$(document).ready(() => {

  $('button.copy-button').click(copyToClipboard);

  $('button.execute').click(() => {
    const rgb = hexToRgb($('input.target').val());
    if (!rgb || !rgb.length || rgb.length !== 3) {
      alert('Invalid format!');
      return;
    }

    computeWorker.onmessage = (event) => {

      const { data } = event;
      const { result, color } = data;

      $('.result-wrapper').css('visibility', 'visible');
      $('.realPixel').css('background-color', color);
      $('.filterPixel').attr('style', result.filter);
      $('.filterDetail').text(result.filter);
      // $('.lossDetail').html(`Loss: ${result.loss.toFixed(1)}`);
    };

    computeWorker.postMessage(rgb);
  });
});
