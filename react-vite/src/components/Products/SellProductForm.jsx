import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import './sell-product.css';

function SellProductForm() {
  const user = useSelector(state => state.session.user);

  const [ upc, setUpc ] = useState('');
  const [ name, setName ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ subcategory, setSubcategory ] = useState('');
  const [ price, setPrice ] = useState('');
  const [ condition, setCondition ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ details, setDetails ] = useState('');
  const [ stock, setStock ] = useState('');
  const [ previewImage, setPreviewImage ] = useState('');
  const [ image2, setImage2 ] = useState('');
  const [ image3, setImage3 ] = useState('');
  const [ image4, setImage4 ] = useState('');
  const [ image5, setImage5 ] = useState('');
  const [ validationErrors, setValidationErrors ] = useState({});
  const [ hasSubmitted, setHasSubmitted ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);

  useEffect(() => {
    const errors = {};

    setValidationErrors(errors);
  }, []);

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


    return;
  }


  if (!user) return <Navigate to='/' replace={true} />;

  return (
    <div className='sell-product-wrapper'>
      {/* <h1>{type === 'update' ? 'Edit Your Item' : 'Sell Your Item'}</h1> */}
      <h1>Sell Your Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UPC{' '}
            <span className='error'>
              {hasSubmitted && validationErrors.upc && `${validationErrors.upc}`}
            </span>
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
            <span className='error'>
              {hasSubmitted && validationErrors.name && `${validationErrors.name}`}
            </span>
            <input
              className='sell-product-name'
              type='text'
              placeholder='Product Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Category{' '}
            <span className='error'>
              {hasSubmitted && validationErrors.category && `${validationErrors.category}`}
            </span>
            <select
              className='sell-product-category'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value='category1'>category1</option>
              <option value='category2'>category2</option>
              <option value='category3'>category3</option>
            </select>
          </label>
        </div>

        <div>
          <label>Subcategory{' '}
            <span className='error'>
              {hasSubmitted && validationErrors.subcategory && `${validationErrors.subcategory}`}
            </span>
            <select
              className='sell-product-subcategory'
              value={subcategory}
              onChange={e => setSubcategory(e.target.value)}
            >
              <option value='subcategory1'>subcategory1</option>
              <option value='subcategory2'>subcategory2</option>
              <option value='subcategory3'>subcategory3</option>
            </select>
          </label>
        </div>

        <div>
          <label>Price{' '}
            <span className='error'>
              {hasSubmitted && validationErrors.price && `${validationErrors.price}`}
            </span>
            <div className='sell-product-price-container'>
              <span>ঋ</span>
              <span>
                <input
                  className='sell-product-price'
                  type='number'
                  placeholder='Price (USC)'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </span>
            </div>
          </label>
        </div>

        <div>
          <label>Condition{' '}
            <span className='error'>
              {hasSubmitted && validationErrors.condition && `${validationErrors.condition}`}
            </span>
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
            <span className='error'>
              {hasSubmitted && validationErrors.description && `${validationErrors.description}`}
            </span>
            <textarea
              className='sell-product-description'
              placeholder='Please write at least 30 characters'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Details{' '}
            <span className='error'>
              {hasSubmitted && validationErrors.details && `${validationErrors.details}`}
            </span>
            <textarea
              className='sell-product-details'
              placeholder='Please describe your item in detail'
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Stock{' '}
            <span className='error'>
              {hasSubmitted && validationErrors.stock && `${validationErrors.stock}`}
            </span>
            <input
              className='sell-product-stock'
              type='number'
              placeholder='Stock'
              value={stock}
              onChange={e => setStock(e.target.value)}
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
            Sell
          </button>
        </div>
      </form>
    </div>
  );
}

export default SellProductForm;
