import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProductThunk, getProductDetailsThunk } from '../../redux/products';
import { addToCartThunk, getCartThunk } from '../../redux/cart';
import SideNav from '../Navigation/SideNav';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ImageModal from './ImageModal';
import './product-details.css';

function ProductDetails() {
  const { productId } = useParams();
  const product = useSelector(state => state.products[productId]);
  const user = useSelector(state => state.session.user);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const previewImage = product?.Images?.filter(img => img.thumbnail)[0];
  const category = product?.category[0].toUpperCase() + product?.category.slice(1);
  const subcategory = product?.subcategory.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
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
              <OpenModalMenuItem
                modalComponent={<ImageModal images={product.Images} />}
                itemText={
                  <img
                    className='pd-images-preview'
                    style={{width: '300px', height: '300px'}}
                    src={previewImage?.url}
                  />
                }
              />
              <div className='pd-images-count'>
                {product.Images?.length == 1 && ('1 image')}
                {product.Images?.length > 1 && `1 of ${product.Images?.length} images`}
                {/* 1/{product.Images?.length} */}
              </div>
            </div>
          </div>

          <div className='pd-details'>
            <div className='pd-heading'>Details:</div>
            <div className='pd-details-flex'>
              <div className='pd-details-flex-left'>
                <div>Category:</div>
                <div>UPC:</div>
                <div>Condition:</div>
                <div>Stock:</div>
              </div>
              <div>
                <div>{category} {'>'} {subcategory}</div>
                <div>{product.upc ? product.upc : 'N/A'}</div>
                <div>{product.condition}</div>
                <div>{product.stock}</div>
              </div>
            </div>
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
