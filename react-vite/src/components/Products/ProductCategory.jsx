import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import SideNav from '../Navigation/SideNav';
import ProductTile from './ProductTile';
import './products.css';

function ProductCategory() {
  let { category, subcategory } = useParams();
  const allProducts = useSelector(state => state.products);
  const dispatch = useDispatch();

  let productsArray;
  if (category && category == 'home')
    category = 'home-living';
  if (subcategory)
    productsArray = Object.values(allProducts)
      .filter(product => product.category == category && product.subcategory == subcategory);
  else
    productsArray = Object.values(allProducts).filter(product => product.category == category);


  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);


  return (
    <div className='products-wrapper'>
      <SideNav />
      <div className='products-tiles'>
        {productsArray.map(product => (
          <ProductTile key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductCategory;
