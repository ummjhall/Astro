import { useParams } from 'react-router-dom';
import './products.css';

function Products() {
  const { category } = useParams();

  return (
    <div className='products-wrapper'>
      <div>{category}</div>
    </div>
  );
}

export default Products;
