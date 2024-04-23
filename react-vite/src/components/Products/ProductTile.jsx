import { useNavigate } from 'react-router-dom';
import './products.css';

function ProductTile({ product }) {
  const navigate = useNavigate();


  return (
    <div className='producttile-wrapper' onClick={() => navigate(`/products/${product.category}/${product.product_id}`)}>
      <img className='producttile-image' src={product.previewImage} />
      <div>{product.name}</div>
      <div>ঋ{product.price}</div>
    </div>
  );
}

export default ProductTile;
