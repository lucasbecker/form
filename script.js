const btnSubmit = document.querySelector('#login-submit');
const form = document.forms.login;

btnSubmit.addEventListener('click', e => {
  e.preventDefault();


  const fields = [...document.querySelectorAll('.input-block input')];
  fields.forEach( field => {
    if(field.value === '') form.classList.add('validate-error');
  });
  const formError = document.querySelector('.validate-error');
  if(formError) {
    formError.addEventListener('animationend', e => {
      if(e.animationName === 'nono') {
        formError.classList.remove('validate-error');
      }
    })
  }else{
    form.classList.add('form-hide');
  }
})

form.addEventListener('animationstart', e => {
  if(e.animationName === 'down')
    document.querySelector('body').style.overflow = 'hidden';
})

form.addEventListener('animationend', e => {
  if(e.animationName === 'down') {
    form.style.display = 'none';
    document.querySelector('body').style.overflow = 'none';
  }
})

/* Background Squares */
const ulSquares = document.querySelector('ul.squares');

for(let i=0; i<=10; i++) {
  const li = document.createElement('li');
  const random = (min, max) => Math.random() * (max - min) + min;
  const size = Math.floor(random(10, 120));
  const position = random(1, 99);
  const delay = random(0.1, 5);
  const duration = random(12, 24);

  li.style.width = `${size}px`;
  li.style.height = `${size}px`;

  li.style.bottom = `-${size}px`;
  li.style.left = `${position}%`;

  li.style.animationDelay = `${delay}s`;
  li.style.animationDuration = `${duration}s`;
  li.style.animationTimingFunction = `cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()})`
  ulSquares.appendChild(li);
}