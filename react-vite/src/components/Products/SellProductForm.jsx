import { useEffect, useState } from 'react';
import { /*useDispatch,*/ useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { /*getProductDetailsThunk,*/ listProductThunk, updateProductThunk } from '../../redux/products';
import categories from '../../utils/categories';
import './sell-product.css';

function SellProductForm({ type }) {
  const { productId } = useParams();
  const product = useSelector(state => state.products[productId]);
  const user = useSelector(state => state.session.user);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (productId)
  //     dispatch(getProductDetailsThunk(productId));
  // }, [dispatch, productId]);

  const [ upc, setUpc ] = useState(product?.upc || '');
  const [ name, setName ] = useState(product?.name || '');
  const [ category, setCategory ] = useState(product?.category || 'space-travel');
  const [ subcategory, setSubcategory ] = useState(product?.subcategory || categories[category][0]);
  const [ price, setPrice ] = useState(product?.price || '');
  const [ condition, setCondition ] = useState(product?.condition || 'New');
  const [ description, setDescription ] = useState(product?.description || '');
  const [ details, setDetails ] = useState(product?.details || '');
  const [ stock, setStock ] = useState(product?.stock || '');
  const [ previewImage, setPreviewImage ] = useState(product?.previewImage || '');
  const [ image2, setImage2 ] = useState(product?.image2 || '');
  const [ image3, setImage3 ] = useState(product?.image3 || '');
  const [ image4, setImage4 ] = useState(product?.image4 || '');
  const [ image5, setImage5 ] = useState(product?.image5 || '');
  const [ validationErrors, setValidationErrors ] = useState({});
  const [ hasSubmitted, setHasSubmitted ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);

  // Set the value of subcategory to the first option if not selected
  useEffect(() => {
    setSubcategory(categories[category][0]);
  }, [category]);

  // Run form validations
  useEffect(() => {
    const errors = {};

    if (upc.length) {
      if (upc.length != 16)
        errors.upc = 'UPC must be exactly 16 characters';
      for (const char of upc) {
        if (!'0123456789ABCDEF'.includes(char))
          errors.upc = 'Invalid UPC. Valid characters: 0123456789ABCDEF';
      }
    }
    if (!name.length)
      errors.name = 'Product name is required';
    if (!price)
      errors.price = 'Price is required';
    if (!description)
      errors.description = 'Description is required';
    if (!stock)
      errors.stock = 'Stock is required';
    if (!previewImage.length)
      errors.previewImage = 'Preview image is required';
    else if (!previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg'))
      errors.previewImage = 'Image URL must be .png, .jpg, or .jpeg';

    setValidationErrors(errors);
  }, [upc, name, price, description, stock, previewImage]);

  // Disable submit if there are errors
  useEffect(() => {
    if (hasSubmitted && Object.values(validationErrors).length)
      setDisabled(true);
    else
      setDisabled(false);
  }, [hasSubmitted, validationErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (Object.values(validationErrors).length)
      return;

    const formData = {
      upc: upc || null,
      name,
      category,
      subcategory,
      price: +price,
      condition,
      description,
      details,
      stock: +stock
    };

    if (type == 'update') {
      updateProductThunk(formData, productId);
      navigate(`/products/${product.category}/${product.product_id}`);
      return;
    }

    const newProduct = await listProductThunk(formData);
    if (newProduct) {
      navigate(`/products/${newProduct.category}/${newProduct.product_id}`);
    }
  };

  if (!user) return <Navigate to='/' replace={true} />;

  return (
    <div className='sell-product-wrapper'>
      <h1>{type == 'update' ? 'Edit Your Item' : 'Sell Your Item'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UPC{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.upc && `${validationErrors.upc}`}
            </div>
            <input
              className='sell-product-upc'
              type='text'
              placeholder='UPC'
              value={upc}
              onChange={e => setUpc(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Name{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.name && `${validationErrors.name}`}
            </div>
            <input
              className='sell-product-name'
              type='text'
              placeholder='Product Name'
              maxLength={100}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Category{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.category && `${validationErrors.category}`}
            </div>
            <select
              className='sell-product-category'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {Object.keys(categories).map((category, i) => (
                <option key={i} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>Subcategory{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.subcategory && `${validationErrors.subcategory}`}
            </div>
            <select
              className='sell-product-subcategory'
              value={subcategory}
              onChange={e => setSubcategory(e.target.value)}
            >
              {categories[category].map((subcategory, i) => (
                <option key={i} value={subcategory}>{subcategory}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>Price{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.price && `${validationErrors.price}`}
            </div>
            <div className='sell-product-price-container'>
              <span>ঋ</span>
              <span>
                <input
                  className='sell-product-price'
                  type='number'
                  placeholder='Price (USC)'
                  min={1}
                  max={9999999999}
                  value={price}
                  onChange={
                    e => e.target.value > 0 && e.target.value <= 9999999999 || e.target.value == '' ?
                    setPrice(e.target.value) :
                    ''}
                />
              </span>
            </div>
          </label>
        </div>

        <div>
          <label>Condition{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.condition && `${validationErrors.condition}`}
            </div>
            <select
              className='sell-product-condition'
              value={condition}
              onChange={e => setCondition(e.target.value)}
            >
              <option value='New'>New</option>
              <option value='Like New'>Like New</option>
              <option value='Very Good'>Very Good</option>
              <option value='Good'>Good</option>
              <option value='Acceptable'>Acceptable</option>
            </select>
          </label>
        </div>

        <div>
          <label>Description{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.description && `${validationErrors.description}`}
            </div>
            <textarea
              className='sell-product-description'
              placeholder='Please give a general description of your product'
              maxLength={255}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Details{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.details && `${validationErrors.details}`}
            </div>
            <textarea
              className='sell-product-details'
              placeholder='Please describe your item in detail'
              maxLength={5000}
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Stock{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.stock && `${validationErrors.stock}`}
            </div>
            <input
              className='sell-product-stock'
              type='number'
              placeholder='Stock'
              min={1}
              max={999999}
              value={stock}
              onChange={
                e => e.target.value > 0 && e.target.value <= 999999 || e.target.value == '' ?
                setStock(e.target.value) :
                ''}
            />
          </label>
        </div>

        <div>
          <input
            className='sell-product-image'
            type='text'
            placeholder='Preview Image URL'
            value={previewImage}
            onChange={e => setPreviewImage(e.target.value)}
          />
          <div className='error'>
            {hasSubmitted && validationErrors.previewImage && `${validationErrors.previewImage}`}
          </div>
          <input
            className='sell-product-image'
            type='text'
            placeholder='Image URL'
            value={image2}
            onChange={e => setImage2(e.target.value)}
          />
          <div className='error'>
            {hasSubmitted && validationErrors.image2 && `${validationErrors.image2}`}
          </div>
          <input
            className='sell-product-image'
            type='text'
            placeholder='Image URL'
            value={image3}
            onChange={e => setImage3(e.target.value)}
          />
          <div className='error'>
            {hasSubmitted && validationErrors.image3 && `${validationErrors.image3}`}
          </div>
          <input
            className='sell-product-image'
            type='text'
            placeholder='Image URL'
            value={image4}
            onChange={e => setImage4(e.target.value)}
          />
          <div className='error'>
            {hasSubmitted && validationErrors.image4 && `${validationErrors.image4}`}
          </div>
          <input
            className='sell-product-image'
            type='text'
            placeholder='Image URL'
            value={image5}
            onChange={e => setImage5(e.target.value)}
          />
          <div className='error'>
            {hasSubmitted && validationErrors.image5 && `${validationErrors.image5}`}
          </div>
        </div>

        <div className='sell-product-submit-container'>
          <button
            className={`sell-product-submit ${disabled ? '' : 'enabled'}`}
            type='submit'
            disabled={disabled}
          >
            {type == 'update' ? 'Update' : 'Sell'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellProductForm;
