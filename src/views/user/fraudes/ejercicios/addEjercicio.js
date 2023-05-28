// vars
const ejefra = document.getElementById('ejefra')

// func
const getCookie = (key) => {
  let value = ''
  document.cookie.split(';').forEach((e) => {
    if (e.includes(key)) {
      value = e.split('=')[1]
    }
  })
  return value
}
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const deleteCookie = () => {
  document.cookie = 'filtro=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;'
}
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');
  errorDisplay.innerText = '';
  inputControl.classList.add('is-valid');
  element.classList.remove('is-invalid');
}
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.invalid-feedback');
  errorDisplay.innerText = message;
  element.classList.add('is-invalid');
  inputControl.classList.remove('is-valid');
}
const validate = () => {
  const ejefraValue = ejefra.value.trim()

  if (ejefraValue === '') {
    setError(ejefra, 'Ejercicio requerido')
    setTimeout(function () {
      setSuccess(ejefra)
    }, 3000)
    return false
  } else {
    const pattern = /^([0-9]{4})$/
    const isValid = pattern.test(ejefraValue)

    if(isValid === false) {
      setTimeout(function () {
        setSuccess(ejefra)
      }, 3000)
      setError(ejefra, 'Introduzca ejercicio válido')
      return false
    }
  }

  return true
}

// inicializar
const elemNew = document.getElementById('new');
elemNew.setAttribute('action', `/user/fraudes/ejercicios/insert?part=${getCookie('filtro')}`)
const elemVol = document.getElementById('vol');
elemVol.setAttribute('href', `/user/fraudes/?part=${getCookie('filtro')}`)