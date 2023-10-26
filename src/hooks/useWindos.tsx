import { useEffect,useState } from 'react';

const useWindos = () => {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const delay = 500;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight);
            }, delay);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, [delay]);

    return { width, height };
};

export default useWindos;
