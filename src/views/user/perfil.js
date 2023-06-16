const nomusu = document.getElementById('nomusu')
const emausu = document.getElementById('emausu')
const telusu = document.getElementById('telusu')

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
  const nomusuValue = nomusu.value.trim()
  const emausuValue = emausu.value.trim()
  const telusuValue = telusu.value.trim()

  if (document.getElementById('tab1').checked) {
    if (nomusuValue === '') {
      setError(nomusu, 'Nombre requerido')
      setTimeout(function () {
        setSuccess(nomusu)
      }, 3000)
      return false
    }
    if (emausuValue === '') {
      setError(emausu, 'Email requerido')
      setTimeout(function () {
        setSuccess(emausu)
      }, 3000)
      return false
    }
    if (telusuValue === '') {
      setError(telusu, 'Teléfono requerido')
      setTimeout(function () {
        setSuccess(telusu)
      }, 3000)
      return false
    }
  }

  return true
}
