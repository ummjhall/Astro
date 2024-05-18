import categories from "./categories";

export const filterProducts = (productsArray, filterData) => {
  if (filterData.seller == 'astroOnly')
    productsArray = productsArray.filter(product => product.seller == 'Astro');
  else if (filterData.seller == 'nonAstro')
    productsArray = productsArray.filter(product => product.seller != 'Astro');

  if (filterData.category != 'all')
    productsArray = productsArray.filter(product => product.category == filterData.category);

  if (filterData.subcategory != 'all')
    productsArray = productsArray.filter(product => product.subcategory == filterData.subcategory);

  if (
      !filterData.condition.new ||
      !filterData.condition.likeNew ||
      !filterData.condition.veryGood ||
      !filterData.condition.good ||
      !filterData.condition.acceptable
    ) {
    productsArray = productsArray.filter(product => {
      let isAllowed = false;
      if (
        (filterData.condition.new && product.condition == 'New') ||
        (filterData.condition.likeNew && product.condition == 'Like New') ||
        (filterData.condition.veryGood && product.condition == 'Very Good') ||
        (filterData.condition.good && product.condition == 'Good') ||
        (filterData.condition.acceptable && product.condition == 'Acceptable')
      ) {
        isAllowed = true;
      }
      return isAllowed;
    });
  }

  if (filterData.price.join(',') != '0,Infinity')
    productsArray = productsArray.filter(product => {
      const minPrice = filterData.price[0] || 0;
      const maxPrice = filterData.price[1] || Infinity;
      return product.price >= minPrice && product.price <= maxPrice;
    });

  if (filterData.registered == 'registeredOnly')
    productsArray = productsArray.filter(product => product.upc)
  else if (filterData.registered == 'unregisteredOnly')
    productsArray = productsArray.filter(product => !product.upc)

  return productsArray;
};


export const sortProducts = (productsArray) => {
  return productsArray.sort((a, b) => {
    // Sort by category order in SideNav
    if (Object.keys(categories).indexOf(a.category) < Object.keys(categories).indexOf(b.category)) return -1;
    else if (Object.keys(categories).indexOf(a.category) > Object.keys(categories).indexOf(b.category)) return 1;

    // Sort by subcategory order in SideNav
    if (categories[a.category].indexOf(a.subcategory) < categories[b.category].indexOf(b.subcategory)) return -1;
    else if (categories[a.category].indexOf(a.subcategory) > categories[b.category].indexOf(b.subcategory)) return 1;

    // Sort by cheapest
    if (a.price < b.price) return -1;
    else if (a.price > b.price) return 1;

    return 0;
  });
};
