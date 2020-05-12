export const genId = () => {
  return Math.random().toString(36).substr(3, 7)
}
