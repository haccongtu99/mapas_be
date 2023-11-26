export const slugify = (value: string) => {
  return value.toLowerCase().split(' ').join('-')
}
