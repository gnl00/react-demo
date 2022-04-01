export function buildMessage({from, to, body, type, date, read = false, group = {}}) {
  return {
    from,
    to,
    // message body
    body,
    // string || binary
    type,
    date,
    // is this message for group or not
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