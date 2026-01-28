import BigNumber from 'bignumber.js'

/**
 * 加法
 * @param a - 第一个数字
 * @param b - 第二个数字
 * @returns 运算结果
 */
export function add(a: BigNumber.Value, b: BigNumber.Value): string {
  return new BigNumber(a).plus(b).toString()
}

/**
 * 减法
 * @param a - 被减数
 * @param b - 减数
 * @returns 运算结果
 */
export function subtract(a: BigNumber.Value, b: BigNumber.Value): string {
  return new BigNumber(a).minus(b).toString()
}

/**
 * 乘法
 * @param a - 第一个数字
 * @param b - 第二个数字
 * @returns 运算结果
 */
export function multiply(a: BigNumber.Value, b: BigNumber.Value): string {
  return new BigNumber(a).multipliedBy(b).toString()
}

/**
 * 除法
 * @param a - 被除数
 * @param b - 除数
 * @param decimalPlaces - 保留小数位数，默认为 18
 * @returns 运算结果
 */
export function divide(a: BigNumber.Value, b: BigNumber.Value, decimalPlaces: number = 18): string {
  return new BigNumber(a).dividedBy(b).toFixed(decimalPlaces)
}

/**
 * 四舍五入
 */
export function round(value: BigNumber.Value, decimalPlaces: number = 2): string {
  return new BigNumber(value).toFixed(decimalPlaces, BigNumber.ROUND_HALF_UP)
}

/**
 * 不四舍五入（直接截断）
 */
export function truncate(value: BigNumber.Value, decimalPlaces: number = 2): string {
  return new BigNumber(value).toFixed(decimalPlaces, BigNumber.ROUND_DOWN)
}
