import fs from 'fs'
import { yarg } from './config/plugins/args.plugin'
const { b: base, l: limit, s: showTable } = yarg

let ouptMessage = ''

const headerMessage = `
=======================================================
                Tabla del ${base}
=======================================================

`
for (let i = 0; i <= limit; i++) {
  ouptMessage += ` ${base} x ${i} = ${base * i}\n`
}
ouptMessage = headerMessage + ouptMessage
if (showTable) {
  console.log(ouptMessage)
}
const outputPath = `outputs`

fs.mkdirSync(outputPath, { recursive: true })
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, ouptMessage)
console.log('File Created')
