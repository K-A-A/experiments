/**
 * Форматирует дату в строку в формате YY.MM.DD HH:MM:SS.ZZZ
 * @param date дата для форматирования, если не передана, то NOW
 * @returns строка в формате YY.MM.DD HH:MM:SS.ZZZ
 */
export function formatLocalTimestamp(date = new Date()) {
  const yy = String(date.getFullYear()).slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  const zzz = String(date.getMilliseconds()).padStart(3, '0')
  return `${yy}.${mm}.${dd} ${hh}:${min}:${ss}.${zzz}`
}
