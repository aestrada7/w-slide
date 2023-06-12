import React, { useEffect, useState } from 'react';
import Mosaic from './Mosaic';
import { aspectRatio } from '../services/tools';

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
    }, [ loadedImages ]);

    const preloadImage = () => {
        let image = new Image();
        // need to add something to avoid preloading the same image multiple times
        let idx = Math.floor(Math.random() * images.length);
        image.src = images[idx];

        image.onload = () => {
            image.orientation = image.width > image.height ? 'horizontal' : 'vertical';
            image.ratio = aspectRatio(image.width, image.height);
            setLoadedImages([...loadedImages, { src: image.src, width: image.width, height: image.height, orientation: image.orientation, ratio: image.ratio }]);
        }
    };

    let nextImage = (toRemove) => {
        let tempArr = [...loadedImages];
        tempArr.splice(toRemove);

        setLastImages( tempArr );
        setLoadedImages( loadedImages.slice(toRemove) );
    };

    let getClassName = (imageList) => {
        if(imageList[0].orientation === 'horizontal') {
            return 'full-width';
        } else if(imageList[0].orientation === 'vertical') {
            /*
            if(imageList[1].orientation === 'vertical' && imageList[2].orientation === 'vertical') {
                return 'side-3';
            }*/
            return 'side-by-side';
        }
    }

    return (
        <React.Fragment>
            { lastImages.length > 0 && (
                <div className="last-image">
                    <Mosaic className={getClassName(lastImages)} images={lastImages}></Mosaic>
                </div>
            )}
            { loadedImages.length > MIN_PRELOADED_IMAGES && (
                <div className="image">
                    <Mosaic seconds={seconds} className={getClassName(loadedImages)} images={loadedImages} callback={nextImage}></Mosaic>
                </div>
            )}
        </React.Fragment>
    )
}

export default ImageCarousel;