import React from 'react';
import PublicHeader from '../../header/header-public/PublicHeader';
import TitleHeader from '../../header/header-title/TitleHeader';
import './contact.css';

const MAP_DIMENSIONS = ["450", "100%"];

class Contact extends React.Component {
    render() {
        return (
            <div className="contact">
                <div className="contact-inner">
                    <PublicHeader />
                    <TitleHeader title="Contact us" description="We’re happy to answer any questions you may have." />
                    <div className="contact-inner-grid-info-description">
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum5</span>
                    </div>
                    <div className="contact-inner-grid">
                        <div className="contact-inner-grid-info">
                            <div className="contact-inner-grid-info-title">
                                <span>Phone:</span>
                            </div>
                            <div className="contact-inner-grid-info-description">
                                <span>Kamil: +48 995 451 206</span>
                                <span>Amy: +48 551 245 658</span>
                            </div>
                        </div>
                        <div className="contact-inner-grid-info">
                            <div className="contact-inner-grid-info-title">
                                <span>Location:</span>
                            </div>
                            <div className="contact-inner-grid-info-description">
                                <span>Mazowiecka Uczelnia Publiczna w Płocku</span>
                                <span>Konstantego Ildefonsa Gałczyńskiego 28</span>
                                <span>09-409 Płock</span>
                            </div>
                        </div>
                        <div className="contact-inner-grid-info">
                            <div className="contact-inner-grid-info-title">
                                <span>Mail:</span>
                            </div>
                            <div className="contact-inner-grid-info-description">
                                <span>shelty.adoption@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="contact-inner-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d428.7932108389009!2d19.680929991249748!3d52.558385625036436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7aeab35bab8c2b6e!2sMazowieckia%20Uczelnia%20Publiczna!5e0!3m2!1spl!2spl!4v1611671638672!5m2!1spl!2spl&z=12"
                            width={MAP_DIMENSIONS[1]} height={MAP_DIMENSIONS[0]} aria-hidden="false" tabindex="0" title="Google Maps"></iframe>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact;