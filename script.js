const btnSubmit = document.querySelector('#login-submit');
const form = document.forms.login;
const passwordField = form.password;
const eyeBtn = document.querySelector('#eye');
const formSection = document.querySelector('.form-section');

function validateField( field ) {
  
  function verifyErrors(){
    let foundError = false;
    for(let error in field.validity) {
      if(!field.validity.valid && field.validity[error])
        foundError = error;      
    }
    return foundError;
  }

  function customMessage( typeError ) {
    const messages = {
      email: {
        valueMissing: 'Email obrigatório!',
        typeMismatch: 'Por favor, insira um email válido!',
        
      },
      password: {
        valueMissing: 'Senha obrigatória!',
        tooShort: 'Senha muito curta!',
      },
      text: {
        valueMissing: 'Campo obrigatório!',
        tooShort: 'Faltam caracteres!',
      }
      // acrescentar aqui os erros e mensagens conforme o necessário
    }

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error');

    if(message) {
      spanError.classList.add('active');
      spanError.innerHTML = message;
      form.classList.add('validate-error');

      const formError = document.querySelector('.validate-error');
      if(formError) {
        formError.addEventListener('animationend', e => {
          if(e.animationName === 'nono') {
            formError.classList.remove('validate-error');
          }
        })
      }
    } else {
      spanError.classList.remove('active');
      spanError.innerHTML = '';
    }
  }

  return function() {
    const error = verifyErrors();
    if (verifyErrors()) {
      const message = customMessage(error)
      field.style.borderColor = 'red';
      setCustomMessage(message);
    } else {
      field.style.borderColor = '#3664FF';
      setCustomMessage();
    }
  }
}

function customValidation( event ) {
  const field = event.target;
  if(field.value !== ''){
    field.classList.add('active');
  } else{ 
    field.classList.remove('active');
  }
  const validation = validateField(field);
  validation();
}

// Listeners 
const fields = [...document.querySelectorAll('[required]')];
fields.forEach( field => {
  field.addEventListener('invalid', event => {
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener('blur', customValidation);
}) 

eyeBtn.addEventListener('mousedown', (e) => {
  e.preventDefault();
  passwordField.type = 'text';
  eyeBtn.classList.add('bx-show')
})

eyeBtn.addEventListener('mouseup', () => {
  passwordField.type = 'password';
  eyeBtn.classList.remove('bx-show')
})

form.addEventListener('submit', e => {
  e.preventDefault();
  
  formSection.classList.add('form-hide');

  // Executando evento de submit padrão
  // e.send();
})

form.addEventListener('animationstart', e => {
  if(e.animationName === 'down')
    document.querySelector('body').style.overflow = 'hidden';
})

formSection.addEventListener('animationend', e => {
  
  if(e.animationName === 'down') {
    document.querySelector('h1').style.display = 'none';
    form.style.display = 'none';
    document.querySelector('body').style.overflow = 'none';
    formSection.classList.remove('form-hide');

    // Feedback visual do "envio" do formulário após execução da animação
    const success = document.createElement('div');
    success.classList.add('success');
    success.innerHTML = `
      <h2>Formulário enviado<br> com sucesso!</h2>
      <div>
        <p>Informações digitadas: </p>
        <p><strong>Email:</strong> ${form.email.value}</p>
        <p><strong>Senha:</strong> ${form.password.value}</p>
      </div>
    `;
    formSection.appendChild(success);
    formSection.classList.add('success-show');
    
  }
})

// Background Squares 
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
