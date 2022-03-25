export function buildMessage({from, to, body, type, date, read = false}) {
  return {
    from,
    to,
    // message body
    body,
    // string || binary
    type,
    date,
    read
  }
}