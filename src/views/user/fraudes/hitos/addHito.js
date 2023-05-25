// vars
const imphit = document.getElementById('imphit');
const tiphit = document.getElementById('cbotip');
const genliq = document.getElementById('genliq');
const gensan = document.getElementById('gensan');
const elemLiq = document.getElementById('liq');
const elemSan = document.getElementById('san');

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
  const imphitValue = imphit.value
  const tiphitValue = tiphit.value

  if (imphitValue === '0') {
    setError(imphit, 'Importe requerido')
    setTimeout(function () {
      setSuccess(imphit)
    }, 3000)
    return false
  }
  if (tiphitValue === '') {
    setError(tiphit, 'Tipo requerido')
    setTimeout(function () {
      setSuccess(tiphit)
    }, 3000)
    return false
  }

  return true
}

// inicializar
elemSan.style.display = 'none'
elemLiq.style.display = 'none'

// eventos
imphit.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/[^0-9 \,.]/, '').replace(/[.]/g, ',')
});
genliq.addEventListener('change', (e) => {
  e.target.value = e.target.checked ? 1 : 0
});
gensan.addEventListener('change', (e) => {
  e.target.value = e.target.checked ? 1 : 0
});
tiphit.addEventListener('change', (e) => {
  const data = e.target.options[e.target.selectedIndex].getAttribute('data-foo')
  document.getElementById('anuhit').value = data

  if (parseInt(data) === estados.propuestaLiquidacion) {
    elemLiq.style.display = ''
  } else {
    elemLiq.style.display = 'none'
    genliq.value = 0
    genliq.checked = false
  }
  if (parseInt(data) === estados.propuestaSancion) {
    elemSan.style.display = ''
  } else {
    elemSan.style.display = 'none'
    gensan.value = 0
    gensan.checked = false
  }
})