import React, { useEffect, useState } from 'react';
import Mosaic from './Mosaic';

const ImageCarousel = ({ seconds, images }) => {
    const PRELOADED_IMAGES = 5;
    const MIN_PRELOADED_IMAGES = 2;
    const [ loadedImages, setLoadedImages ] = useState([]);
    const [ lastImages, setLastImages ] = useState([]);

    useEffect(() => {
        if (!images || !images.length) {
            return;
        }

        preloadImage();
    }, []);

    useEffect(() => {
        if(loadedImages.length < PRELOADED_IMAGES) {
            preloadImage();
        }
        console.log(loadedImages);
    }, [ loadedImages ]);

    const preloadImage = () => {
        let image = new Image();
        // need to add something to avoid preloading the same image multiple times
        let idx = Math.floor(Math.random() * images.length);
        image.src = images[idx];

        image.onload = () => {
            image.orientation = image.width > image.height ? 'horizontal' : 'vertical';
            setLoadedImages([...loadedImages, { src: image.src, width: image.width, height: image.height, orientation: image.orientation }]);
        }
    };

    let nextImage = (toRemove) => {
        let tempArr = [...loadedImages];
        tempArr.splice(toRemove);

        setLastImages( tempArr );
        setLoadedImages( loadedImages.slice(toRemove) );
    };

    return (
        <React.Fragment>
            { lastImages.length > 0 && (
                <div className="last-image">
                    { lastImages[0].orientation === 'horizontal' ?
                        <Mosaic className="full-width" images={lastImages}></Mosaic>
                    :
                        <Mosaic className="side-by-side" images={lastImages}></Mosaic>
                    }
                </div>
            )}
            { loadedImages.length > MIN_PRELOADED_IMAGES && (
                <div className="image">
                    { loadedImages[0].orientation === "horizontal" ?
                        <Mosaic seconds={seconds} className="full-width" images={loadedImages} callback={nextImage}></Mosaic>
                    :
                        <Mosaic seconds={seconds} className="side-by-side" images={loadedImages} callback={nextImage}></Mosaic>
                    }
                </div>
            )}
        </React.Fragment>
    )
}

export default ImageCarousel;