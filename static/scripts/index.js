/* eslint-disable no-undef */
const serverSocket = io('http://localhost:8080')

const container = document.getElementById('container') ?? null

const template = `

{{#if showList}}
  <h4>Products:</h4>
  <div class='container text-center mb-5'>
    <div class='row row-gap-5'>
      {{#each list}}
        <div class='col-3'>
          <div class='card'>
            <div class='card-body'>
              <h5 class='card-title'>{{this.title}}</h5>
              <p class='card-text'>{{this.description}}</p>
            </div>
            <ul class='list-group list-group-flush'>
              <li class='list-group-item'>Item {{this.ref}}</li>
              <li class='list-group-item'>Price: {{this.price}}</li>
              <li class='list-group-item'>Stock: {{this.stock}}</li>
            </ul>
          </div>
        </div>
      {{/each}}
    </div>
  </div>
{{else}}
  <p>Sin Products...</p>
{{/if}}
`

const compileTemplate = Handlebars.compile(template)

serverSocket.on('updateList', data => {
  console.log(data)
  if (container !== null) {
    container.innerHTML = compileTemplate({
      headerTitle: 'Home | Products',
      mainTitle: 'List of products in Real Time',
      list: data.list,
      showList: data.showList
    })
  }
})
