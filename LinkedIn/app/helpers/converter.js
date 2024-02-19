export function totalDate(time) {
  const now = new Date()
  const post = new Date(time)

  let interval = Math.round((now - post)/(1000 * 3600 * 24))

  if(interval >= 360) {
    interval = Math.round(interval/360)
    return `${interval} years ago`
  } else if(interval >= 30) {
    interval = Math.round(interval/30)
    return `${interval} months ago`
  } else if(interval >= 1) {
    return `${interval} days ago`
  } else {
    return `today`
  }
}