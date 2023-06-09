import React, { useEffect, useState } from 'react';

const ImageCarousel = ({ seconds, images }) => {
    const [ currentImage, setCurrentImage ] = useState(null);
    const [ lastImage, setLastImage ] = useState(null);

    useEffect(() => {
        if (!images || !images.length) {
            return;
        }

        setCurrentImage(images[0]);
    }, []);

    useEffect(() => {
        const randomImageIndex = Math.floor(Math.random() * images.length);
        setCurrentImage(images[randomImageIndex]);
    }, [ lastImage ]);

    let nextImage = () => {
        setLastImage(currentImage);
    }

    return(
        <React.Fragment>
            { currentImage && (
                <div className="image">
                    <img className={`animation-${seconds}`} src={currentImage} onAnimationIteration={() => nextImage()} />
                    <img className="last-image" src={lastImage}></img>
                </div>
            )}
        </React.Fragment>
    )
}

export default ImageCarousel;