import { CreateTable } from '../domain/use-cases/create-table.use-case'
import { SaveFiles } from '../domain/use-cases/save-file.use-case'
import { ServerApp } from './server-app'
describe('Test server-app.ts', () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: 'test-destinantion',
    fileName: 'test-filename'
  }
  test('should create ServerApp instance', () => {
    const serverApp = new ServerApp()
    expect(serverApp).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe('function')
  })
  test('should run ServeraApp with options', () => {
    const logSpy = jest.spyOn(console, 'log')
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
    const saveFileSpy = jest.spyOn(SaveFiles.prototype, 'execute')
    ServerApp.run(options)
    expect(logSpy).toHaveBeenCalledTimes(3)
    expect(logSpy).toHaveBeenCalledWith('Server running...')
    expect(logSpy).toHaveBeenLastCalledWith('File Created')
    expect(createTableSpy).toHaveBeenCalledTimes(1)
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit
    })
    expect(saveFileSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName
    })
  })
  test('should run with custom value mocked', () => {
    const logMock = jest.fn()
    const logErrorMock = jest.fn()
    const createdMock = jest.fn().mockReturnValue('1 x 2 = 2')
    const saveFileMock = jest.fn().mockReturnValue(true)
    console.log = logMock
    console.error = logErrorMock

    CreateTable.prototype.execute = createdMock
    SaveFiles.prototype.execute = saveFileMock
    ServerApp.run(options)
    expect(logMock).toHaveBeenCalledWith('Server running...')
    expect(createdMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit
    })
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: '1 x 2 = 2',
      fileDestination: 'test-destinantion',
      fileName: 'test-filename'
    })
    expect(logMock).toHaveBeenCalledWith('File Created')
    expect(logErrorMock).not.toBeCalledWith()
  })
})
