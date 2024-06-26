import { useState, useCallback } from 'react';

const useNotification = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    const showNotification = useCallback((msg, type) => {
        setMessage(msg);
        setType(type);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, 3000); // Hide after 3 seconds
    }, []);

    return { visible, message, type, showNotification };
};

export default useNotification;