let simplepicker = new SimplePicker({
  zIndex: 10
});

const $button = document.getElementById('date');

$button.addEventListener('click', (e) => {
  simplepicker.open();
});

simplepicker.on('submit', (date, readableDate) => {
  console.log(date);
});