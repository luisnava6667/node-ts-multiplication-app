import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFiles } from '../domain/use-cases/save-file.use-case'

interface RunOptions {
  base: number
  limit: number
  showTable: boolean
  fileDestination: string
  fileName: string
}

export class ServerApp {
  static run({
    base,
    limit,
    showTable,
    fileDestination,
    fileName
  }: RunOptions) {
    console.log('Server running ....')
    const table = new CreateTable().execute({ base, limit })
    const wasCreated = new SaveFiles().execute({
      fileContent: table,
      fileDestination,
      fileName
    })
    if (showTable) return console.log(table)

    wasCreated ? console.log('File Created') : console.log('File not created')
  }
}
