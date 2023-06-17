import React, { useEffect, useState } from 'react';

const ImageCarouselLow = ({ seconds, images }) => {
    const [ currentImage, setCurrentImage ] = useState(null);
    const [ lastImage, setLastImage ] = useState(null);
    const [ randomIdx, setRandomIdx ] = useState(0);

    useEffect(() => {
        if (!images || !images.length) {
            return;
        }

        setCurrentImage(images[0]);
    }, []);

    let nextImage = () => {
        setRandomIdx(Math.floor(Math.random() * images.length));
        setLastImage(currentImage);
        setCurrentImage(images[randomIdx]);
    }

    return(
        <React.Fragment>
            { currentImage && (
                <div className="low-image">
                    <div className="container">
                        <img className={`animation-${seconds}`} src={currentImage} onAnimationIteration={() => nextImage()} />
                    </div>
                    <div className="last-container">
                        <img className="last-image" src={lastImage} />
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}

export default ImageCarouselLow;