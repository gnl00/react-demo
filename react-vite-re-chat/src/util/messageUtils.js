export function buildMessage({from, to, body, type, time}) {
  return {
    from,
    to,
    // message body
    body,
    // string || binary
    type,
    time,
  }
}