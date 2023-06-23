import React, { useEffect, useState } from 'react';
import ImageCarousel from '../components/ImageCarousel';
import ImageCarouselLow from '../components/ImageCarouselLow';

const Index = ({ imageURLs, lowmem }) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const [ time, setTime ] = useState(new Date());
    const [ dateStr, setDateStr ] = useState(time.toLocaleDateString('en-US', options));
    const [ isFullScreen, setIsFullScreen ] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
    
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setDateStr(time.toLocaleDateString('en-US', options));
    }, [ time ]);

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
                { !lowmem ? 
                    <ImageCarousel seconds="10" images={imageURLs}></ImageCarousel>
                :
                    <ImageCarouselLow seconds="10" images={imageURLs}></ImageCarouselLow>
                }
            </div>
            <div className="time-container">
                <div className="time">{time.getHours()}<span className="colon">:</span>{formatMinutes(time.getMinutes())}</div>
                <div className="date">{dateStr}</div>
            </div>
        </React.Fragment>
    )
}

Index.getInitialProps = async({ query }) => {
    let lowmem = query?.lowmem === 'true';
    let imageURLs = [];

    if(process.env.DEPLOYMENT === 'LOCAL') {
        const fs = require('fs');
        fs.readdirSync('./public/temp/').forEach(file => {
            imageURLs.push(`./temp/${file}`);
        });
    } else if(process.env.DEPLOYMENT === 'VERCEL') {
        imageURLs = [ './temp/945950.jpg', './temp/Wallpaper-1920x1080-4k.jpg', './temp/wp8172556.jpg' ]
    }

    return { imageURLs, lowmem };
}

export default Index;