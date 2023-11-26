type TPagination<T> = {
  limit?: number
  page?: number
  order?: 1 | -1
  sortBy?: keyof T
  keyword?: string
}

export { TPagination }
