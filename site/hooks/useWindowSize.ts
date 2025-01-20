import { useEffect, useState } from 'react';

const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            window.addEventListener('resize', handleResize);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line consistent-return
    }, []);
    return windowSize;
};

export default useWindowSize;