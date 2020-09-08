

export function paginate<T>(array: T[], itemsPerPage: number, currentPageIndex: number): T[] {
  if (itemsPerPage < 1) { throw new Error('Items per page cannot be set to values lower than 1'); }

  if (array.length <= itemsPerPage) {
    return array;
  } else {
    const isPageComplete = array.length >= itemsPerPage * (currentPageIndex + 1);
    return isPageComplete ? array.splice(itemsPerPage * currentPageIndex, itemsPerPage * (currentPageIndex + 1)) :
      array.splice(itemsPerPage * currentPageIndex, array.length - 1);
  }
}