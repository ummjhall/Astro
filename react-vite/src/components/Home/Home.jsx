import './home.css';

function Home() {


  return (
    <div className='home-wrapper'>
      {/* <div className='temp'>New Home page coming soon</div>
      <div className='temp'>Click a link in the NavBar above</div> */}
      <div className='home-container'>
        <div className='home-box home-box1'>
          <div>Astro Sales</div>
        </div>
        <div className='home-box home-box2'>
          <div>Get the latest in tech</div>
        </div>
        <div className='home-box home-box3'>
          <div>Win a Gift Card</div>
        </div>
        <div className='home-box home-box4'>
          <div>Featured Item</div>
        </div>
        <div className='home-box home-box5'>
          <div>Currency exchange rates</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
