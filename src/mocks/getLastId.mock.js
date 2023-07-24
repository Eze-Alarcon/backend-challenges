const test = async function getLastID () {
  let idNum = 1
  const x = new Promise((resolve) => {
    resolve()
  })
    .then(() => {
      idNum > 0
        ? idNum = ++idNum
        : idNum = 1
    })
  await x
  return idNum
}

console.log('hola')

console.log(await test())
