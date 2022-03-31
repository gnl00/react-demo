export function buildMessage({from, to, body, type, date, read = false, group = false}) {
  return {
    from,
    to,
    // message body
    body,
    // string || binary
    type,
    date,
    // is this message for group or not | default false
    group,
    read
  }
}

export function buildGroup({gid, members = []}) {
  return {
    gid: gid,
    members: members
  }
}