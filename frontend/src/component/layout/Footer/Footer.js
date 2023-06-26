import React from 'react'
import playstore from '../../../images/playstore.png';
import appstore from '../../../images/appstore.png';
import "./Footer.css"

const Footer = () => {
  return (
    <footer id='footer'>
        <div className='leftFooter'>
            <h4>Download OUR APP</h4>
            <p>Download App for android and IOS mobile phone</p>
            <img src={playstore} alt="playstor"/>
            <img src={appstore} alt="Appstore"/>
        </div>
        <div className='midFooter'>
            <h1>Ecommerse</h1>
            <p>High Quality is our first pripority</p>
            <p>Copyrights 2021 &copy; Veeru Varse Vlogs</p>
        </div>
        <div className='rightFooter'>
            <h1>Follow Us</h1>
            <a href='https://instagram.com/shishupal7169?igshid=ZGUzMzM3NWJiOQ=='>Instagram</a>
            <a href='https://www.linkedin.com/in/shishupal-singh-3636b9193'>LinkedIn</a>
            <a href='https://www.facebook.com/profile.php?id=100015747885624&mibextid=ZbWKwL'>Facebook</a>
            
        </div>

    </footer>
    
  )
}

export default Footer