'use strict'

/* eslint space-before-function-paren: 0 */
import fs from 'fs/promises'

export class fileSystemManager {
  #path
  constructor(path) {
    this.#path = path
  }

  async resetDataFile() {
    await fs.writeFile(this.#path, '[]')
  }

  async writeDataFile(list) {
    const json = JSON.stringify(list, null, 2)
    await fs.writeFile(this.#path, json)
  }

  async loadDataFile() {
    const rawData = await fs.readFile(this.#path, 'utf-8')
    return JSON.parse(rawData)
  }
}
