import fs from 'fs'
export interface SaveFileUseCase {
  execute: (options: Options) => boolean
}
export interface Options {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export class SaveFiles implements SaveFileUseCase {
  constructor() /**Storage Repository */ {}
  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table'
  }: Options): boolean {
    try {
      fs.mkdirSync(fileDestination, { recursive: true })
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)
      console.log('File Created')
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
