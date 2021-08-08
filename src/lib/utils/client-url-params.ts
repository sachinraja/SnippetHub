export const getPageNumberFromParam = (page: string | string[] | undefined) => {
  let pageNumberStr = (page || 1) as string
  if (Array.isArray(page)) {
    ;[pageNumberStr] = page
  }

  let pageNumber = parseInt(pageNumberStr, 10)

  if (Number.isNaN(pageNumber) || pageNumber < 1) pageNumber = 1

  return pageNumber
}

export const getSearchKeywordFromParam = (q: string | string[] | undefined) => {
  let searchKeyword = (q || '') as string
  if (Array.isArray(q)) {
    ;[searchKeyword] = q
  }
  return searchKeyword.trim()
}
