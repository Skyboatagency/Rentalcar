import React from 'react';

const BookNowButton = ({ onClick, children }) => {
    return (
        <button onClick={onClick} style={styles.button}>
            {children}
        </button>
    );
};

const styles = {
    button: {
        backgroundColor: '#2FD596',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '16px',
    }
};

export default BookNowButton; 