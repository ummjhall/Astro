import './home.css';

function Home() {


  return (
    <div className='home-wrapper'>
      {/* <div className='temp'>New Home page coming soon</div>
      <div className='temp'>Click a link in the NavBar above</div> */}
      <div className='home-container'>
        <div className='home-box home-box1'>
          Featured Item
        </div>
        <div className='home-box home-box2'>
          Get the latest in tech
        </div>
        <div className='home-box home-box3'>
          Currency exchange rates
        </div>
        <div className='home-box home-box4'>
          Astro Sales
        </div>
        <div className='home-box home-box5'>
          Check out this gear
        </div>
        <div className='home-box home-box6'>
          Win a Gift Card
        </div>
        <div className='home-box home-box7'>
          Best Sellers
        </div>
      </div>
    </div>
  );
}

export default Home;
