export default function (errors) {
  let tip = '';
  for (const key in errors) {
    tip += `${key}：${errors[key].join(',')}`
  }
  return tip;
}
