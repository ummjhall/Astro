import { useNavigate } from 'react-router-dom';
import './featured-product.css';

function FeaturedProduct({ product }) {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`/products/${product.category}/${product.subcategory}/${product.product_id}`);
  };


  return product && (
    <div className='featured-wrapper' onClick={handleClick}>
      <img
        className='featured-image'
        src={product.previewImage}
        width={100}
        height={100}
      />
      <div className='featured-info-container'>
        <div className='featured-name'>{product.name}</div>
        <div className='featured-price'>ঋ {product.price.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default FeaturedProduct;
