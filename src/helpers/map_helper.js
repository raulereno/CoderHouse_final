module.exports = forPages = (end, currentPage, limit, query) => {
  let pages = ``;
  let setQuery = query ? "&query=" + query : "";

  for (let index = 1; index <= end; index++) {
    pages += `<li class="page-item ${index === currentPage ? "currentPage" : ""
      }"><a class="page-link" href="${process.env.API_URL_PROD ? process.env.API_URL_PROD : 'localhost:' + process.env.PORT
      } /products?page=${index}&limit=${limit}${setQuery}">${index}</a ></li > `;
  }

  return pages;
};
