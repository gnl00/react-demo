export const buildMsg = ({from, to, date = new Date().getTime(), type = 'string', body, read = false}) => {
  return {
    from,
    to,
    date,
    type,
    body,
    read,
  }
}