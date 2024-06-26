import React from 'react';

const Notification = ({ message, type, visible }) => {
    return (
        <div className={`fixed z-20 bottom-4 left-4 transition-transform duration-500 ${visible ? 'translate-x-0' : '-translate-x-[500px]'} p-4 rounded-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {message}
        </div>
    );
};

export default Notification;