document.querySelector('button').addEventListener('click', function () {
  const number = document.getElementById('number').value;
  const name = document.getElementById('name').value;
  const month = document.getElementById('month').value;
  const year = document.getElementById('year').value;
  const cvv = document.getElementById('cvv').value;

  if (number.length !== 16) {
    alert('Card number must be 16 digits.');
    return;
  }

  if (name === '') {
    alert('Please enter the cardholder name.');
    return;
  }

  if (month === '' || year === '') {
    alert('Please enter an expiration date.');
    return;
  }

  if (cvv.length !== 3) {
    alert('CVV must be 3 digits.');
    return;
  }

  alert('Card submitted!');
});