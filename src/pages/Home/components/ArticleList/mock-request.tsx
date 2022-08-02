/*
 * @Author: chenjie
 * @Date: 2022-08-02 16:44:15
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-02 16:44:15
 * @FilePath: /src/pages/Home/components/ArticleList/mock-request.tsx
 * @Description: null
 */
import { sleep } from 'antd-mobile/es/utils/sleep'

let count = 0

export async function mockRequest() {
  if (count >= 5) {
    return []
  }
  await sleep(2000)
  count++
  return [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
  ]
}