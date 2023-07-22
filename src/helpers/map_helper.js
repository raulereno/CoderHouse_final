module.exports = forPages = (end, currentPage, limit, query) => {
  let pages = ``;
  let setQuery = query ? "&query=" + query : "";

  for (let index = 1; index <= end; index++) {
    pages += `<li class="page-item ${
      index === currentPage ? "currentPage" : ""
    }"><a class="page-link" href="http://localhost:3001/products?page=${index}&limit=${limit}${setQuery}">${index}</a></li>`;
  }

  return pages;
};
