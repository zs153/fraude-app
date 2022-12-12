const buildHitosTable = (state, fraude, tiposHito, estadosHito) => {
  const table = document.getElementById('tblHitos')
  const myList = state.querySet
  table.innerHTML = ''

  myList.map(element => {
    // col1
    const row = document.createElement('tr')
    let cell = document.createElement('td')
    cell.classList.add("w-4")
    if (element.STAHIT === estadosHito.sancionAnulada) {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-red-lt">
          <h6>ANU</h6>
        </span>
      </div>`
    } else {
      cell.innerHTML = `<div class="align-items-center py-1">
        <span class="avatar avatar-rounded bg-green-lt">
          <h6>OK</h6>
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
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.DESTIP}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col4
    cell = document.createElement('td')
    if (element.OBSHIT !== null) {
      cell.innerHTML = `<div class="d-flex py-1 align-items-center">
        <div class="flex-fill">
          <div class="font-weight-medium">${element.OBSHIT}</div>
        </div>
      </div>`
    }
    row.appendChild(cell)

    // col5
    cell = document.createElement('td')
    cell.classList.add("w-9")
    cell.innerHTML = `<div class="d-flex py-1 align-items-center">
      <div class="flex-fill">
        <div class="font-weight-medium">${element.IMPHIT}</div>
      </div>
    </div>`
    row.appendChild(cell)

    // col6
    let col6 = `<ul class="dots-menu">
      <li class="nav-item drop-right">
        <a href="#" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke-width="1" fill="none" d="M12 18.7q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687.288-.288.688-.288.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.688.288-.287.688-.287.4 0 .688.287.287.288.287.688 0 .4-.287.688-.288.287-.688.287Zm0-5.725q-.4 0-.688-.287-.287-.288-.287-.688 0-.4.287-.687Q11.6 5.3 12 5.3q.4 0 .688.288.287.287.287.687 0 .4-.287.688-.288.287-.688.287Z"/>
          </svg>
        </a>
        <ul>
          <li class="nav-item">
            <a href="/admin/fraudes/hitos/edit/${fraude.IDFRAU}/${element.IDHITO}" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke-width=".4" fill="none" d="M6.85 20.575q-.6 0-1.012-.412-.413-.413-.413-1.013V4.85q0-.6.413-1.013.412-.412 1.012-.412h7.825L18.6 7.35v3.4h-.65V7.675h-3.6V4.05h-7.5q-.3 0-.55.25-.25.25-.25.55v14.275q0 .3.25.55.25.25.55.25h4.25v.65Zm-.8-.65V4.05 19.925ZM17.025 14.6l.45.425-3.75 3.75v1.1h1.1l3.775-3.75.45.45-3.95 3.95h-2v-2Zm2.025 1.975L17.025 14.6l1.05-1.05q.225-.2.525-.2.3 0 .475.2l1 1q.2.2.2.487 0 .288-.2.538Z"/></svg>
              </svg>
              Editar
            </a>
          </li>`

    if (element.TIPHIT === tiposHito.propuestaLiquidacion) {
      if (!myList.find(itm => itm.TIPHIT === tiposHito.liquidacion)) {
        col6 += `<li class="nav-item">
          <a href="#" class="nav-link" onclick="{document.getElementById('hitbor').value ='${element.IDHITO}', document.getElementById('msgbor').innerHTML ='<p>${element.STRFEC}</p><p>${element.DESTIP}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z" />
            </svg>
            Borrar
          </a>
        </li>`
      }
    } else if (element.TIPHIT === tiposHito.propuestaSancion) {
      if (!myList.find(itm => itm.TIPHIT === tiposHito.sancion)) {
        col6 += `<li class="nav-item">
          <a href="#" class="nav-link" onclick="{document.getElementById('hitbor').value ='${element.IDHITO}', document.getElementById('msgbor').innerHTML ='<p>${element.STRFEC}</p><p>${element.DESTIP}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z" />
            </svg>
            Borrar
          </a>
        </li>`
      }
    } else {
      col6 += `<li class="nav-item">
        <a href="#" class="nav-link" onclick="{document.getElementById('hitbor').value ='${element.IDHITO}', document.getElementById('msgbor').innerHTML ='<p>${element.STRFEC}</p><p>${element.DESTIP}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z" />
          </svg>
          Borrar
        </a>
      </li>`
    }
    if (element.TIPHIT === tiposHito.sancion && element.STAHIT !== estadosHito.sancionAnulada) {
      col6 += `<li class="nav-item">
        <a href="#" class="nav-link" onclick="{document.getElementById('idarch').value ='${element.IDHITO}', document.getElementById('msgbor').innerHTML ='<p>${element.STRFEC}</p><p>${element.DESTIP}</p>'}" data-bs-toggle="modal" data-bs-target="#modal-borrar">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-inline me-2" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke-width=".4" fill="none" d="M7.85 19.575q-.6 0-1.025-.425-.425-.425-.425-1.025v-12.1h-.975V5.4h3.6v-.675H15V5.4h3.6v.625h-.975V18.15q0 .6-.425 1.013-.425.412-1.025.412Zm9.125-13.55H7.05v12.1q0 .35.225.575.225.225.575.225h8.325q.3 0 .55-.25.25-.25.25-.55Zm-6.85 10.925h.625V8h-.625Zm3.15 0h.625V8h-.625ZM7.05 6.025V18.925 18.125Z" />
          </svg>
          Archivado de sanción
        </a>
      </li>`
    }
    col6 += `</ul>`

    cell = document.createElement('td')
    cell.classList.add("w-5")
    cell.innerHTML = col6
    row.appendChild(cell)

    table.appendChild(row)
  })
}
