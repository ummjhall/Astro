import { useNavigate } from 'react-router-dom';
import './products.css';

function ProductTile({ product }) {
  const navigate = useNavigate();
  const trimmedName = product.name.length > 42 ? product.name.slice(0,41)+' ...' : product.name;


  const handleClick = () => {
    navigate(`/products/${product.category}/${product.subcategory}/${product.product_id}`);
  };


  return (
    <div className='producttile-wrapper' onClick={handleClick}>
      <img className='producttile-image' src={product.previewImage} />
      <div className='producttile-info-container'>
        <div className='producttile-name'>{trimmedName}</div>
        <div>
          <div className='producttile-soldby'>Sold by:{' '}
            <span className='producttile-seller'>{product.seller}</span>
          </div>
          <div className='producttile-price'>ঋ{product.price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductTile;
