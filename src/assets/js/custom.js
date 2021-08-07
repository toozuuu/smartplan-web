function progressBarFuntion() {
  var bar = new ProgressBar.SemiCircle(containerBar, {
    strokeWidth: 4,
    color: '#08EDBF',
    trailColor: '#eee',
    trailWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    svgStyle: null,
    text: {
      style: {
        position: 'absolute',
        left: '50%',
        top: '0',
        padding: 0,
        margin: 0,
      }
    },
    from: { color: '#08EDBF' },
    to: { color: '#08EDBF' },
    // Set default step function for all animate calls
    step: (state, bar) => {
      bar.path.setAttribute('stroke', state.color);
      var value = Math.round(bar.value() * 100);
      if (value === 0) {
        bar.setText('');
      } else {
        // bar.setText(value + "%");
        bar.setText("300GB");
      }

      bar.text.style.color = "#000";
    }
  });
  bar.text.style.fontFamily = "'Poppins', sans-serif";
  bar.text.style.fontSize = '3rem';
  bar.animate(1.0);
}


function dmsprogressBarFuntion() {
  var bar = new ProgressBar.Line(dmsProgressbar, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FDAC1A',
    trailColor: '#023468',
    trailWidth: 4,
    svgStyle: { width: '100%', height: '100%' }
  });

  bar.animate(1.0);
};

