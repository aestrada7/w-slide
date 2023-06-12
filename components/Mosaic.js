import React from 'react';

const Mosaic = ({ seconds, className, images, callback }) => {
    let fullClassName = seconds > 0 ? `animation-${seconds} ${className}` : className;

    return (
        <React.Fragment>
            { className === 'full-width' && (
                <div className={fullClassName} onAnimationIteration={() => callback(1)}>
                    <img src={images[0].src} />
                </div>
            )}
            { className === 'side-by-side' && (
                <div className={fullClassName} onAnimationIteration={() => callback(2)}>
                    <div className='left'><img src={images[0].src} /></div>
                    <div className='right'><img src={images[1].src} /></div>
                </div>
            )}
        </React.Fragment>
    )
}

export default Mosaic;