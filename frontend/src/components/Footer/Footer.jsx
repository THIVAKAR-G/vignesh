import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="footer-content-logo">
            <img src={assets.logo} alt="" />
          </div>
            <p>3, Kennedy Street, 100 Feet Rd, Thanthai Periyar Nagar, Tharamani, Chennai, Tamil Nadu 600113</p>
            <div className="footer-social-icons">
                <img src={assets.linkedin_icon } alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.facebook_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li><a href='#'>Home</a></li>
                <li>About</li>
                <li><a href="/cart">Delivery</a></li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contact us</h2>
            <ul>
                <li>+91-9951221593</li>
                <li><a href="#">PizzaBoy.com</a></li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 © Created by Thivakar</p>
    </div>
  )
}

export default Footer
