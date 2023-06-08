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
  // document.cookie = name + "=" + (encodeURIComponent(value) || "")  + expires + "; path=/";
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
const deleteCookie = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;`
}

// inicializa sort
document.querySelectorAll(".sortable th").forEach(headerCell => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");

    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

// funcs
const sortTableByColumn = (table, column, asc = true) => {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aColText = a.cells[column].textContent;
    const bColText = b.cells[column].textContent;

    return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
  });

  for (let row of sortedRows) {
    tBody.appendChild(row);
  }

  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}
const buildTable = (state) => {
  const table = document.getElementById('table-body')
  const myList = state
  table.innerHTML = ''

  myList.map(element => {
    // crear linea
    const row = document.createElement('tr')

    // col1
    let cell = document.createElement('td')
    cell.classList.add("w-4")
    cell.innerHTML = `<input class="form-check-input m-0 align-middle" type="checkbox" aria-label="Select invoice">`
    row.appendChild(cell)
    
    // col2
    cell = document.createElement('td')
    cell.classList.add("w-8")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.DESOFI}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col3
    cell = document.createElement('td')
    cell.classList.add("w-5")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.EJEFRA}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col4
    cell = document.createElement('td')
    cell.classList.add("w-8")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.NIFCON}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col5
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.NOMCON}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col6
    cell = document.createElement('td')
    cell.classList.add("w-10")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.DESTIP.length > 30 ? element.DESTIP.slice(0, 30) + '...' : element.DESTIP}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col7
    cell = document.createElement('td')
    if (element.OBSFRA !== null) {
      cell.innerHTML = `<div class="d-flex py-1 align-items-center">
        <div class="flex-fill">
          <div class="font-weight-medium">${element.OBSFRA.length > 30 ? element.OBSFRA.slice(0, 30) + '...' : element.OBSFRA}</div>
        </div>
      </div>`
    }
    row.appendChild(cell)

    // col8
    cell = document.createElement('td')
    cell.classList.add("w-0")
    cell.style.display = 'none'
    cell.value = element.IDFRAU
    row.appendChild(cell)

    // add linea
    table.appendChild(row)
  })
}
const addFraudes = () => {
  let arrFraudes = []

  document.querySelectorAll('input[type=checkbox]').forEach(e => {
    if (e.checked) {
      arrFraudes.push(e.parentNode.parentNode.cells[7].value)
    }
  })
  document.getElementById('arrfra').value = JSON.stringify(arrFraudes)
}

// events
// const elemBuscar = document.getElementById('buscarFraudeBox')
// elemBuscar.onchange = (event) => {
//   setCookie('filtrb', event.target.value, .5)
// }
// elemBuscar.value = getCookie('filtrb')

// inicializar
const elemAdd = document.getElementById('add')
elemAdd.setAttribute('action', `/admin/fraudes/ades/asignar?part=${getCookie('filtra')}`)
const elemVol = document.getElementById('vol')
elemVol.setAttribute('href', `/admin/fraudes/ades?part=${getCookie('filtra')}`)

// table
buildTable(orgList)