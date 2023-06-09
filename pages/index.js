import React, { useEffect, useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';

const Index = ({ imageURLs }) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const [ time, setTime ] = useState(new Date());
    const [ dateStr, setDateStr ] = useState(time.toLocaleDateString('en-US', options));
    const [ isFullScreen, setIsFullScreen ] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
            setDateStr(time.toLocaleDateString('en-US', options))
        }, 1000);
    
        return () => {
            clearInterval(interval);
        };
    }, []);

    let formatMinutes = (mins) => {
        return (mins < 10) ? '0' + mins : mins;
    }

    let goFullScreen = () => {
        setIsFullScreen(true);
        document.querySelector('body').requestFullscreen();
    }

    return(
        <React.Fragment>
            { !isFullScreen ? <button className="full-screen" onClick={() => goFullScreen()}>Enter Full Screen</button> : '' }
            <div className="image-container">
                <ImageCarousel seconds="10" images={imageURLs}></ImageCarousel>
            </div>
            <div className="time-container">
                <div className="time">{time.getHours()}<span className="colon">:</span>{formatMinutes(time.getMinutes())}</div>
                <div className="date">{dateStr}</div>
            </div>
        </React.Fragment>
    )
}

Index.getInitialProps = async({}) => {
    let imageURLs = [];

    if(process.env.DEPLOYMENT === 'LOCAL') {
        const fs = require('fs');
        fs.readdirSync('./public/temp/').forEach(file => {
            imageURLs.push(`./temp/${file}`);
        });
    } else if(process.env.DEPLOYMENT === 'VERCEL') {
        imageURLs = [ './temp/945950.jpg', './temp/Wallpaper-1920x1080-4k.jpg', './temp/wp8172556.jpg' ]
    }

    return { imageURLs };
}

export default Index;