import { useNavigate } from 'react-router-dom';
import './product-teaser.css';

function ProductTeaser({ product }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/products/${product.category}/${product.subcategory}/${product.product_id}`);
  };

  return (
    <div className='product-teaser-wrapper'>
      <img
        className='pt-image'
        src={product?.previewImage}
        // style={{width: '90px', height: '90px'}}
        width={90}
        height={90}
        onClick={handleClick}
      />
    </div>
  );
}

export default ProductTeaser;
