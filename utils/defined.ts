export const defined = (thing: any) => {
  return thing !== undefined && thing !== null
}

export const allDefined = (l: any[]) => {
  for (const i of l) {
    if (!defined(i)) return false
  }
  return true
}
