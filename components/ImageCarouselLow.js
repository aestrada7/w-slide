import React, { useEffect, useState } from 'react';
import { shuffle } from '../services/tools';

const ImageCarouselLow = ({ seconds, images }) => {
    const [ currentImage, setCurrentImage ] = useState(null);
    const [ lastImage, setLastImage ] = useState(null);
    const [ randomIdx, setRandomIdx ] = useState(0);

    useEffect(() => {
        if (!images || !images.length) {
            return;
        }
        shuffle(images);

        setCurrentImage(images[0]);
        setRandomIdx(0);
    }, []);

    let nextImage = () => {
        let nextImgId = randomIdx >= images.length - 1 ? 0 : randomIdx + 1;
        setRandomIdx(nextImgId);
        setLastImage(currentImage);
        setCurrentImage(images[nextImgId]);
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