import { useNavigate } from 'react-router-dom';
import './products.css';

function ProductTile({ product }) {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/products/${product.category}/${product.subcategory}/${product.product_id}`);
  };


  return (
    <div className='producttile-wrapper' onClick={handleClick}>
      <img className='producttile-image' src={product.previewImage} />
      <div>{product.name}</div>
      <div>ঋ{product.price}</div>
    </div>
  );
}

export default ProductTile;
