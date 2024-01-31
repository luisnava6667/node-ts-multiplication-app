import { SaveFiles } from './save-file.use-case'
import fs from 'fs'

describe('SaveFileUseCase', () => {
  //   beforeEach(() => {
  //     fs.rmSync('outputs', { recursive: true })
  //   })
  const customOptions = {
    fileContent: 'custom content',
    fileDestination: 'custom-outputs/file-destination',
    fileName: 'custom-table-name'
  }
  const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`
  afterEach(() => {
    const outputFolderExists = fs.existsSync('outputs')
    if (outputFolderExists) fs.rmSync('outputs', { recursive: true })
    const customOutputFolderExists = fs.existsSync(
      customOptions.fileDestination
    )
    if (customOutputFolderExists)
      fs.rmSync(customOptions.fileDestination, { recursive: true })
  })
  test('should save file with default values', () => {
    const saveFile = new SaveFiles()
    const filePath = 'outputs/table.txt'
    const options = {
      fileContent: 'test content'
    }
    const result = saveFile.execute(options)
    expect(result).toBe(true)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    })
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })
  test('should save file with custom values', () => {
    const saveFile = new SaveFiles()

    const result = saveFile.execute(customOptions)
    const fileExists = fs.existsSync(customOptions.fileDestination)

    const fileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    })
    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(customOptions.fileContent)
  })
  test('should return false if directory could not be created', () => {
    const saveFiles = new SaveFiles()
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('This is a custom error message from testing')
    })
    const result = saveFiles.execute(customOptions)
    expect(result).toBe(false)
    mkdirSpy.mockRestore()
  })
  test('should return false if file could not be created', () => {
    const saveFiles = new SaveFiles()
    const writeFileSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation(() => {
        throw new Error('This is a custom writing error message from testing')
      })
    const result = saveFiles.execute({ fileContent: 'Hola' })
    expect(result).toBe(false)
    writeFileSpy.mockRestore()
  })
})
