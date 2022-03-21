export const buildMsg = ({from, to, date = new Date().getTime(), bodyType = 'text', body, read = false}) => {
  return {
    from,
    to,
    date,
    bodyType,
    body,
    read,
  }
}