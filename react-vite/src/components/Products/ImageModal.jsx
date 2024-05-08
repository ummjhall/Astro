import './image-modal.css';

function ImageModal({ images }) {

  return images ?
    (
      <div className='image-modal-wrapper'>
        <img className='image-current' src={images[0].url} />
        <div className='image-buttons-container'>
          <div className='image-button'>{'<< Prev'}</div>
          <div className='image-button'>{'Next >>'}</div>
        </div>
      </div>
    ) :
    (
      <div>Loading...</div>
    );
}

export default ImageModal;
