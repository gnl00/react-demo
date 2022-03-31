export const toDateTime = (time) => {

  const date = new Date(time)
  const mon = date.getMonth() + 1
  const dat = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()

  return mon + '/' + dat + ' ' + hour + ":" + min
}