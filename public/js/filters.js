const url = new URL(window.location.href);
const params = new URLSearchParams(url.searchParams);

document.addEventListener("DOMContentLoaded", () => {
  setSelectedQuantity();
});

const selectQuantity = document.getElementById("quantity_select");

if (selectQuantity) {
  selectQuantity.addEventListener("change", async (evt) => {
    const value = evt.target.value;
    const categoryQuery = params.get("query");
    const sort = params.get("sort");

    window.location.replace(
      `${window.location.protocol}//${window.location.host}/products?limit=${value}${categoryQuery ? "&query=" + categoryQuery : ""
      }${sort ? "&sort=" + sort : ""}`
    );
  });
}

const setSelectedQuantity = () => {
  if (selectQuantity) {
    const limitQuery = params.get("limit");

    const selecteLimit = document.getElementById("quantity_select");
    for (let index = 0; index < selecteLimit.options.length; index++) {
      const option = selecteLimit.options[index];
      if (option.value === limitQuery) {
        option.selected = true;
      } else if (option.value === "10" && limitQuery === null) {
        option.selected = true;
      }
    }
  }
};
