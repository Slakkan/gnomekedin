

export function paginate<T>(array: T[], itemsPerPage: number, currentPage: number): T[] {
  if (itemsPerPage < 1) { throw new Error('Items per page cannot be set to values lower than 1'); }

  if (array.length <= itemsPerPage) {
    return array;
  } else {
    const isPageComplete = array.length >= itemsPerPage * (currentPage + 1);
    return isPageComplete ? array.splice(itemsPerPage * currentPage, itemsPerPage * (currentPage + 1)) :
      array.splice(itemsPerPage * currentPage, array.length - 1);
  }
}