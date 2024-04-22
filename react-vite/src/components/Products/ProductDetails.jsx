import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteProductThunk, getProductDetailsThunk } from '../../redux/products';
import './products.css';

function ProductDetails() {
  const { productId } = useParams();
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.session.user);
  const product = products[productId];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductDetailsThunk(productId));
  }, [dispatch, productId]);

  const handleDelete = async () => {
    const res = await deleteProductThunk(productId);
    if (res.message = 'Successfully deleted')
      navigate('/');
  };

  return product ?
    (
      <div className='productdetails-wrapper'>
        {product.seller_id == user.id && (
          <div>
            <button onClick={() => navigate(`/sell/${product.product_id}/update`)}>
              Edit Listing
            </button>
            <button onClick={handleDelete}>
              Delete Listing
            </button>
          </div>
        )}
        {product.name}
      </div>
    ) :
    (
      <div className='productdetails-wrapper'>
        Product not found
      </div>
    );
}

export default ProductDetails;
