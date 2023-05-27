// const
const nifcon = document.getElementById('nifcon')
const nomcon = document.getElementById('nomcon')

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
  const nifconValue = nifcon.value.trim().toUpperCase().slice(0, 9)
  const nomconValue = nomcon.value.trim()

  if (nifconValue === '') {
    setError(nifcon, 'NIF/NIE requerido')
    setTimeout(function () {
      setSuccess(nifcon)
    }, 3000)
    return false
  } else {
    const pattern = /^([X-Y][0-9]{7}[A-Z]{1})|([0-9]{8}[A-Z]{1})$/

    if (!pattern.test(nifconValue)) {
      setError(nifcon, 'Introduzca NIF/NIE válido')
      setTimeout(function () {
        setSuccess(nifcon)
      }, 3000)
      return false
    }

    const strBase = "TRWAGMYFPDXBNJZSQVHLCKET";
    const primeraPosicion = nifconValue.slice(0, 1);
    const letraNif = nifconValue.slice(8);
    let nuevoNif = nifconValue;

    if (isNaN(primeraPosicion)) {
      nuevoNif = nifconValue.slice(1);
      if (primeraPosicion === 'X') {
        nuevoNif = '0' + nuevoNif;
      } else if (primeraPosicion === "Y") {
        nuevoNif = "1" + nuevoNif;
      } else if (primeraPosicion === "Z") {
        nuevoNif = "2" + nuevoNif;
      }
    }

    const dniNumero = nuevoNif.slice(0, 8);
    const pos = parseInt(dniNumero) % 23;
    const letra = strBase.slice(pos, pos + 1);
    const isValid = letraNif === letra

    if (isValid === false) {
      setError(nifcon, 'Introduzca NIF/NIE válido')
      setTimeout(function () {
        setSuccess(nifcon)
      }, 3000)
      return false
    }
  }
  if (nomconValue === '') {
    setError(nomcon, 'Nombre requerido')
    setTimeout(function () {
      setSuccess(nomcon)
    }, 3000)
    return false
  }

  return true
}
