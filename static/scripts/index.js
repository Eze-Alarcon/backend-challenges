/* eslint-disable no-undef */
const serverSocket = io('http://localhost:8080')

const container = document.getElementById('container') ?? null

const template = `
{{#if showList}}
  <h2>Products:</h2>
  <article>
    {{#each list}}
      <div>
      <p>item {{this.ref}}</p>
        <h4>{{this.title}}</h4>
        <p>{{this.description}}</p>
        <p>Price {{this.price}}</p>
        <p>Stock {{this.stock}}</p>
      </div>
      {{/each}}
      </article>
{{else}}
<p class=''>Sin Products...</p>
{{/if}}`

const compileTemplate = Handlebars.compile(template)

serverSocket.on('firstLog', data => {
  if (container !== null) {
    container.innerHTML = compileTemplate({
      headerTitle: 'Home | Products',
      mainTitle: 'List of products in Real Time',
      list: data.list,
      showList: data.showList
    })
  }
})
