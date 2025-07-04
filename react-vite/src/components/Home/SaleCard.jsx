import { useNavigate } from 'react-router-dom';
import './sale-card.css';

function SaleCard({ product }) {
  const navigate = useNavigate();

  return product && (
    <div
      className='salecard-wrapper'
      onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product.product_id}`)}>
      <img
        className='salecard-image'
        src={product.previewImage}
        alt={product.name}
        style={{width: '75px', height: '75px'}}
      />
      <div className='salecard-info-container'>
        <div className='salecard-name'>{product.name}</div>
        <div className='salecard-price-container'>
          <div className='salecard-price-original'>ঋ {Math.floor(product.price/0.8)}</div>
          <div className='salecard-price-arrows'>{'>> '}</div>
          <div className='salecard-price-reduced'>ঋ {product.price}</div>
        </div>
      </div>
    </div>
  );
}

export default SaleCard;
