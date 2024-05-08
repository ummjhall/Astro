import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getProductDetailsThunk, addImageThunk, listProductThunk, updateProductThunk } from '../../redux/products';
import categories from '../../utils/categories';
import './sell-product.css';

function SellProductForm({ type }) {
  const { productId } = useParams();
  const product = useSelector(state => state.products[productId]);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ upc, setUpc ] = useState(product?.upc || '');
  const [ name, setName ] = useState(product?.name || '');
  const [ category, setCategory ] = useState(product?.category || Object.keys(categories)[0]);
  const [ subcategory, setSubcategory ] = useState(product?.subcategory || categories[category][0]);
  const [ price, setPrice ] = useState(product?.price || '');
  const [ condition, setCondition ] = useState(product?.condition || 'New');
  const [ description, setDescription ] = useState(product?.description || '');
  const [ details, setDetails ] = useState(product?.details || '');
  const [ stock, setStock ] = useState(product?.stock || '');
  const [ previewImage, setPreviewImage ] =
    useState('https://res.cloudinary.com/dt2uyzpbn/image/upload/v1713932203/Astro/astro-logo2_jsnmd5.jpg');
  const [ image2, setImage2 ] = useState('');
  const [ image3, setImage3 ] = useState('');
  const [ image4, setImage4 ] = useState('');
  const [ image5, setImage5 ] = useState('');
  const [ validationErrors, setValidationErrors ] = useState({});
  const [ hasSubmitted, setHasSubmitted ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);


  // Update subcategory value when category is changed
  // But allow product updates to keep original initial value
  useEffect(() => {
    if (!(categories[category].includes(subcategory)))
      setSubcategory(categories[category][0]);
  }, [categories, category, subcategory]);


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
    if (type != 'update' && !previewImage.length)
      errors.previewImage = 'Preview image is required';
    if (previewImage && !previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg'))
      errors.previewImage = 'Image URL must be .png, .jpg, or .jpeg';
    const imageUrls = {2: image2, 3: image3, 4: image4, 5: image5};
    for (const key in imageUrls) {
      const url = imageUrls[key];
      if (url && !url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.jpeg'))
        errors['image'+key] = 'Image URL must be .png, .jpg, or .jpeg';
    }

    setValidationErrors(errors);
  }, [upc, name, price, description, stock, type, previewImage, image2, image3, image4, image5]);


  // Disable submit if there are errors
  useEffect(() => {
    if (hasSubmitted && Object.values(validationErrors).length)
      setDisabled(true);
    else
      setDisabled(false);
  }, [hasSubmitted, validationErrors]);


  // Create the listing
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setDisabled(true);

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
      await dispatch(updateProductThunk(productId, formData));
      await dispatch(getProductDetailsThunk(productId));
      navigate(`/products/${category}/${subcategory}/${productId}`);
      return;
    }

    const newProduct = await listProductThunk(formData);
    if (newProduct) {
      await addImages(newProduct.product_id);
      navigate(`/products/${newProduct.category}/${newProduct.subcategory}/${newProduct.product_id}`);
    }
  };


  // Helper function to add images after making product instance
  const addImages = async (productId) => {
    const imageData = {
      url: previewImage,
      thumbnail: true
    };
    await addImageThunk(productId, imageData);

    for (const image of [image2, image3, image4, image5]) {
      if (image) {
        const imageData = {url: image};
        await addImageThunk(productId, imageData);
      }
    }
  };


  if (!user) return <Navigate to='/' replace={true} />;

  return (
    <div className='sell-product-wrapper'>
      <div className='sell-title'>{type == 'update' ? 'Edit Your Item' : 'Sell Your Item'}</div>
      <p><span className='sell-asterisk'>*</span> Required field</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name *{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.name && `${validationErrors.name}`}
            </div>
            <input
              className='sell-name'
              type='text'
              // placeholder='Product Name'
              maxLength={100}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>UPC <span className='sell-small-text'>(if ITF-registered item)</span>{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.upc && `${validationErrors.upc}`}
            </div>
            <input
              className='sell-upc'
              type='text'
              // placeholder='UPC'
              maxLength={16}
              value={upc}
              onChange={e => setUpc(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Category *{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.category && `${validationErrors.category}`}
            </div>
            <select
              className='sell-category'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {Object.keys(categories).map((category, i) => (
                <option key={i} value={category}>
                  {category[0].toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>Subcategory *{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.subcategory && `${validationErrors.subcategory}`}
            </div>
            <select
              className='sell-subcategory'
              value={subcategory}
              onChange={e => setSubcategory(e.target.value)}
            >
              {categories[category].map((subcategory, i) => (
                <option key={i} value={subcategory}>
                  {subcategory.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>Price (USC ঋ) *{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.price && `${validationErrors.price}`}
            </div>
            <div className='sell-price-container'>
              <input
                className='sell-price'
                type='number'
                // placeholder='Price (USC)'
                min={1}
                max={9999999999}
                value={price}
                onChange={
                  e => e.target.value > 0 && e.target.value <= 9999999999 || e.target.value == '' ?
                  setPrice(e.target.value) :
                  ''}
              />
            </div>
          </label>
        </div>

        <div>
          <label>Condition *{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.condition && `${validationErrors.condition}`}
            </div>
            <select
              className='sell-condition'
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
          <label>Description *{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.description && `${validationErrors.description}`}
            </div>
            <textarea
              className='sell-description'
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
              className='sell-details'
              placeholder='Please describe your item in detail'
              maxLength={5000}
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>Stock *{' '}
            <div className='error'>
              {hasSubmitted && validationErrors.stock && `${validationErrors.stock}`}
            </div>
            <input
              className='sell-stock'
              type='number'
              // placeholder='Stock'
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

        {type != 'update' && (
          <div>
            <label>Images * <span className='sell-small-text'>(minimum 1)</span>
              <input
                className='sell-image'
                type='text'
                placeholder='Preview Image URL'
                value={previewImage}
                onChange={e => setPreviewImage(e.target.value)}
              />
              <div className='error'>
                {hasSubmitted && validationErrors.previewImage && `${validationErrors.previewImage}`}
              </div>
              <input
                className='sell-image'
                type='text'
                placeholder='Image URL'
                value={image2}
                onChange={e => setImage2(e.target.value)}
              />
              <div className='error'>
                {hasSubmitted && validationErrors.image2 && `${validationErrors.image2}`}
              </div>
              <input
                className='sell-image'
                type='text'
                placeholder='Image URL'
                value={image3}
                onChange={e => setImage3(e.target.value)}
              />
              <div className='error'>
                {hasSubmitted && validationErrors.image3 && `${validationErrors.image3}`}
              </div>
              <input
                className='sell-image'
                type='text'
                placeholder='Image URL'
                value={image4}
                onChange={e => setImage4(e.target.value)}
              />
              <div className='error'>
                {hasSubmitted && validationErrors.image4 && `${validationErrors.image4}`}
              </div>
              <input
                className='sell-image'
                type='text'
                placeholder='Image URL'
                value={image5}
                onChange={e => setImage5(e.target.value)}
                />
              <div className='error'>
                {hasSubmitted && validationErrors.image5 && `${validationErrors.image5}`}
              </div>
            </label>
          </div>
        )}

        <div className='sell-submit-container'>
          <button
            className={`sell-submit ${disabled ? '' : 'enabled'}`}
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
