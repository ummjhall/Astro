import './products.css';

function ProductTile({ product }) {


  return (
    <div className='producttile-wrapper'>
      <img className='producttile-image' src={product.previewImage} />
      <div>{product.name}</div>
    </div>
  );
}

export default ProductTile;

// category
// condition
// description
// details
// name
// previewImage
// price
// product_id
// seller_id
// stock
// subcategory
// upc
