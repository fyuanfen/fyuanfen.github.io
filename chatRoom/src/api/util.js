/**
 * Created by zyy on 2017/3/5.
 */
export function randomColor () {
  return '#' + (~~(Math.random() * (1 << 24))).toString(16)
}
export function genUid () {
  return new Date().getTime() + '' + Math.floor(Math.random() * 899 + 100)
}
