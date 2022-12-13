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
const deleteCookie = () => {
  document.cookie = 'filtro=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/;'
}
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
const arrayFilter = (value, fraude, estadosSms) => {
  const filtro = value.toUpperCase()
  const trimmedData = orgList.filter(itm => Object.keys(itm).some(k => JSON.stringify(itm[k]).includes(filtro)))
  state.querySet = trimmedData
  state.page = 1

  buildTable(state, fraude, estadosSms)
}
const pagination = (querySet, page, rows) => {
  const trimStart = (page - 1) * rows
  const trimEnd = trimStart + rows
  const trimmedData = querySet.slice(trimStart, trimEnd)
  const pages = Math.ceil(querySet.length / rows);

  return {
    'querySet': trimmedData,
    'pages': pages,
  }
}
const buildTable = (state, fraude, estados) => {
  const table = document.getElementById('table-body')
  const data = pagination(state.querySet, state.page, state.rows)
  const myList = data.querySet
  table.innerHTML = ''

  myList.map(element => {
    // col1
    const row = document.createElement('tr')
    let cell = document.createElement('td')
    cell.classList.add("w-3")
    if (element.STASMS === estados.pendiente) {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-red-lt">
          <h6>PEN</h6>
        </span>
      </div>`
    } else {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-green-lt">
          <h6>ENV</h6>
        </span>
      </div>`
    }
    row.appendChild(cell)

    // col2
    cell = document.createElement('td')
    cell.classList.add("w-6")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.STRFEC}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col3
    cell = document.createElement('td')
    cell.classList.add("w-8")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.MOVSMS}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col4
    cell = document.createElement('td')
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.TEXSMS}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col5
    cell = document.createElement('td')
    cell.classList.add("w-5")
    if (element.STASMS === estados.pendiente) {
      cell.innerHTML = `<ul class="dots-menu">
        <li class="nav-item drop-right">
          <a href="#" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke-width="1" fill="none" d="M12 18.7q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687.288-.288.688-.288.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.688.288-.287.688-.287.4 0 .688.287.287.288.287.688 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687Q11.6 5.3 12 5.3q.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Z"/>
            </svg>
          </a>
          <ul>
            <li class="nav-item">
              <a href="/admin/fraudes/smss/edit/${fraude.IDFRAU}/${element.IDSMSS}" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M6.85 20.575q-.6 0-1.012-.412-.413-.413-.413-1.013V4.85q0-.6.413-1.013.412-.412 1.012-.412h7.825L18.6 7.35v3.4h-.65V7.675h-3.6V4.05h-7.5q-.3 0-.55.25-.25.25-.25.55v14.275q0 .3.25.55.25.25.55.25h4.25v.65Zm-.8-.65V4.05 19.925ZM17.025 14.6l.45.425-3.75 3.75v1.1h1.1l3.775-3.75.45.45-3.95 3.95h-2v-2Zm2.025 1.975L17.025 14.6l1.05-1.05q.225-.2.525-.2.3 0 .475.2l1 1q.2.2.2.487 0 .288-.2.538Z"/></svg>
                </svg>
                Editar
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('idsmss').value ='${element.IDSMSS}', document.getElementById('msgbor').innerHTML ='<p>${element.MOVSMS}</p><p>${element.TEXSMS}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z"/>
                </svg>
                Borrar
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" onclick="{document.getElementById('idcamb').value ='${element.IDSMSS}', document.getElementById('msgcam').innerHTML ='<p>${element.MOVSMS}</p><p>${element.TEXSMS}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-cambio">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" height="24" width="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke-width=".4" fill="none" d="m12.1 18.4 2.225-2.225-2.225-2.25-.475.475 1.525 1.5q-1.375 0-2.375-.3t-1.55-.825q-.575-.575-.862-1.3-.288-.725-.288-1.475 0-.425.088-.85.087-.425.262-.8l-.5-.4q-.25.475-.363 1-.112.525-.112 1.05 0 .875.325 1.712.325.838 1 1.513.65.65 1.825.975 1.175.325 2.45.325l-1.425 1.425Zm4.025-4.35q.225-.475.35-1 .125-.525.125-1.05 0-.875-.337-1.725-.338-.85-1.013-1.5-.625-.675-1.812-1Q12.25 7.45 11 7.45l1.4-1.4-.45-.475-2.225 2.25 2.225 2.225.45-.45-1.5-1.5q1.375 0 2.362.287.988.288 1.538.838.575.575.875 1.3.3.725.3 1.475 0 .4-.087.825-.088.425-.263.8ZM12 20.575q-1.775 0-3.337-.675-1.563-.675-2.725-1.838Q4.775 16.9 4.1 15.337 3.425 13.775 3.425 12q0-1.775.675-3.338.675-1.562 1.838-2.725Q7.1 4.775 8.663 4.1q1.562-.675 3.337-.675 1.775 0 3.338.675 1.562.675 2.724 1.837Q19.225 7.1 19.9 8.662q.675 1.563.675 3.338 0 1.775-.675 3.337-.675 1.563-1.838 2.725-1.162 1.163-2.724 1.838-1.563.675-3.338.675Zm0-.65q3.325 0 5.638-2.3 2.312-2.3 2.312-5.625t-2.312-5.638Q15.325 4.05 12 4.05q-3.3 0-5.612 2.312Q4.075 8.675 4.075 12q0 3.3 2.3 5.613 2.3 2.312 5.625 2.312ZM12 12Z"/>
                </svg>
                Cambio estado
              </a>
            </li>
          </ul>
        </li>                              
      </ul>`
    }
    row.appendChild(cell)

    table.appendChild(row)
  })

  createPagination(data.pages, state.page)
}
const createPagination = (pages, page) => {
  let str = `<ul>`;
  let active;
  let pageCutLow = page - 1;
  let pageCutHigh = page + 1;

  if (pages === 1) {
    str += `<li class="page-item disabled"><a>Pág</a></li>`;
  }

  if (page > 1) {
    str += `<li class="page-item previous no"><a onclick="onclickPage(${pages}, ${page - 1})">&#9664</a></li>`;
  }

  if (pages < 6) {
    for (let p = 1; p <= pages; p++) {
      active = page === p ? "active" : "no";
      str += `<li class="${active}"><a onclick="onclickPage(${pages}, ${p})">${p}</a></li>`;
    }
  } else {
    if (page > 2) {
      str += `<li class="no page-item"><a onclick="onclickPage(${pages}, 1)">1</a></li>`;
      if (page > 3) {
        str += `<li class="out-of-range"><i>...</i></li>`;
      }
    }

    if (page === 1) {
      pageCutHigh += 2;
    } else if (page === 2) {
      pageCutHigh += 1;
    }
    if (page === pages) {
      pageCutLow -= 2;
    } else if (page === pages - 1) {
      pageCutLow -= 1;
    }
    for (let p = pageCutLow; p <= pageCutHigh; p++) {
      if (p === 0) {
        p += 1;
      }
      if (p > pages) {
        continue
      }
      active = page === p ? "active" : "no";
      str += `<li class="${active}"><a onclick="onclickPage(${pages}, ${p})">${p}</a></li>`;
    }

    if (page < pages - 1) {
      if (page < pages - 2) {
        str += `<li class="out-of-range"><i>...</i></li>`;
      }
      str += `<li class="page-item no"><a onclick="onclickPage(${pages}, ${pages})">${pages}</a></li>`;
    }
  }

  if (page < pages) {
    str += `<li class="page-item next no"><a onclick="onclickPage(${pages}, ${page + 1})">&#9654</a></li>`;
  }
  str += `</ul>`;

  document.getElementById('pagination-wrapper').innerHTML = str;
}
const onclickPage = (pages, page) => {
  createPagination(pages, page)
  state.page = page
  buildTable(state, fraude, estatosSms)
}
