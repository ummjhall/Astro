import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import { filterProducts } from '../../utils/functions';
import SideNav from '../Navigation/SideNav';
import ProductTile from './ProductTile';
import categories from '../../utils/categories';
import './products.css';

function Products() {
  let { category, subcategory } = useParams();
  const allProducts = useSelector(state => state.products);
  const filters = useSelector(state => state.filters);
  const dispatch = useDispatch();

  // Filter products by category, subcategory, and user filters (if not all)
  // Then sort
  let productsArray = Object.values(allProducts);
  if (category)
    productsArray = productsArray.filter(product => product.category == category);
  if (subcategory)
    productsArray = productsArray.filter(product => product.subcategory == subcategory);
  productsArray = filterProducts(productsArray, filters);
  productsArray.sort((a, b) => {
    if (Object.keys(categories).indexOf(a.category) < Object.keys(categories).indexOf(b.category)) return -1;
    else if (Object.keys(categories).indexOf(a.category) > Object.keys(categories).indexOf(b.category)) return 1;
    // if (a.subcategory < b.subcategory) return -1;
    // else if (a.subcategory > b.subcategory) return 1;
    if (categories[a.category].indexOf(a.subcategory) < categories[b.category].indexOf(b.subcategory)) return -1;
    else if (categories[a.category].indexOf(a.subcategory) > categories[b.category].indexOf(b.subcategory)) return 1;
    if (a.price < b.price) return -1;
    else if (a.price > b.price) return 1;
    return 0;
  });


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='products-wrapper'>
      <SideNav />
      <div className='products-tile-container'>
        {productsArray.map(product => (
          <ProductTile key={product.product_id} product={product} />
        ))}
        {!productsArray.length &&
          <div className='products-no-products'>No products to display</div>
        }
      </div>
    </div>
  );
}

export default Products;
