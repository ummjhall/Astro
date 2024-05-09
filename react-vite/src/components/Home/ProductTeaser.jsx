import { useNavigate } from 'react-router-dom';
import './product-teaser.css';

function ProductTeaser({ product }) {
  const navigate = useNavigate();

  return (
    <div className='product-teaser-wrapper'>
      <img
        className='pt-image'
        src={product?.previewImage}
        style={{width: '90px', height: '90px'}}
        onClick={() => navigate(`/products/${product.category}/${product.subcategory}/${product.product_id}`)}
      />
    </div>
  );
}

export default ProductTeaser;
