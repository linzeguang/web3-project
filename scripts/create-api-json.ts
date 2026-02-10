import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }
      return [err, undefined]
    })
}

// java post请求返回的是200，需要修正一下
async function main() {
  console.log('开始请求json')
  const [, res] = await to(
    fetch('https://petstore.swagger.io/v2/swagger.json').then((res) =>
      res.json()
    )
  )
  if (!res) {
    console.error('解析json失败')
    process.exit()
  }
  console.log('准备写入文件')
  writeFileSync(join(__dirname, '../openapi-ts.json'), JSON.stringify(res))
  console.log('写入文件成功')
}
main()
