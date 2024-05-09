import { useState } from 'react';
import './image-modal.css';

function ImageModal({ images }) {
  const [ imageNo, setImageNo ] = useState(0);

  return images ?
    (
      <div className='image-modal-wrapper'>
        <img className='image-current' src={images[imageNo].url} />
        {images.length > 1 &&
          <div className='image-buttons-container'>
            <div
              className='image-button'
              onClick={() => setImageNo(prev => prev == 0 ? images.length-1 : prev-1)}
            >
              {'<< Prev'}
            </div>
            <div
              className='image-button'
              onClick={() => setImageNo(prev => prev == images.length-1 ? 0 : prev+1)}
            >
              {'Next >>'}
            </div>
          </div>
        }
      </div>
    ) :
    (
      <div>Loading...</div>
    );
}

export default ImageModal;
