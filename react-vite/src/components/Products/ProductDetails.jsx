import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProductThunk, getProductDetailsThunk } from '../../redux/products';
import { addToCartThunk, getCartThunk } from '../../redux/cart';
import SideNav from '../Navigation/SideNav';
import './product-details.css';

function ProductDetails() {
  const { productId } = useParams();
  const product = useSelector(state => state.products[productId]);
  const user = useSelector(state => state.session.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previewImage = product?.Images?.filter(img => img.thumbnail)[0];
  const category = product?.category.split('-').join(' ');
  const subcategory = product?.subcategory.split('-').join(' ');
  const [ disabled, setDisabled ] = useState(true);


  useEffect(() => {
    dispatch(getProductDetailsThunk(productId));
  }, [dispatch, productId]);


  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);


  useEffect(() => {
    if (productId in cart)
      setDisabled(true);
    else
      setDisabled(false);
  }, [productId, cart]);


  const handleAdd = async () => {
    const data = {quantity: 1};
    const res = await addToCartThunk(productId, data);
    if (res)
      return navigate('/cart');
  };


  const handleDelete = async () => {
    const category = product.category;
    const res = await deleteProductThunk(productId);
    if (res)
      return navigate(`/products/${category}`);
  };


  return product ?
    (
      <div className='productdetails-wrapper'>
        <SideNav />

        <div className='productdetails-container'>
          <div className='pd-top'>
            <div className='pd-top-info'>
              <div className='pd-name'>{product.name}</div>
              <div>Sold by: <span className='pd-seller'>{product.seller}</span></div>
              <div>Condition: {product.condition}</div>
              <div className='pd-price'>ঋ {product.price}</div>
              <div className='pd-description'>
                <div className='pd-heading'>Description:</div>
                <div>{product.description}</div>
              </div>
            </div>
            <div className='pd-images'>
              <img
                className='pd-images-current'
                style={{width: '300px', height: '300px'}}
                src={previewImage?.url} />
            </div>
          </div>

          <div className='pd-details'>
            <div className='pd-heading'>Details:</div>
            <div>Category: {category} {'>'} {subcategory}</div>
            <div>UPC: {product.upc}</div>
            <div>Condition: {product.condition}</div>
            <div>Stock: {product.stock}</div>
            <div>{product.details}</div>
          </div>

          {product.seller_id == user?.id && (
            <div>
              <button onClick={() => navigate(`/sell/${product.product_id}/update`)}>
                Edit Listing
              </button>
              <button onClick={handleDelete}>
                Delete Listing
              </button>
            </div>
          )}

          {user && product.seller_id != user?.id && (
            <div>
              <button
                className='pd-submit'
                onClick={handleAdd}
                disabled={disabled}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    ) :
    (
      <div className='productdetails-wrapper'>
        <SideNav />
        <div>Product not found</div>
      </div>
    );
}

export default ProductDetails;
