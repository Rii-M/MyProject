import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                   <div className="log"> <img className='logos' src={assets.logo} alt="" /></div>
                    {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores eveniet, magnam harum quisquam, error deleniti, corporis ab vero totam atque eaque perspiciatis a aperiam laudantium. Distinctio harum sed fugiat impedit?</p> */}
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Get in Touch</h2>
                    <ul>
                        <li>9800000000</li>
                        <li>rii@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div className='res-location'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.30003596865!2d85.28185087508075!3d27.708021076182142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1888ee9916f7%3A0x6188d2022654674!2sACME%20Engineering%20College!5e0!3m2!1sen!2snp!4v1741502867982!5m2!1sen!2snp" className='map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            <hr />
            <p className='footer-copyright'>All rights reserved</p>

                
        </div>
    )
}

export default Footer
