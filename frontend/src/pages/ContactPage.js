import React from 'react';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const ContactPage = () => {
    return (
        <div>
            <TopBar isContactPage={true} />
            {/* Contact page content */}
            <Footer />
        </div>
    );
};

export default ContactPage; 