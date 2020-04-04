import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../styles/assets/lottie1';

const FullScreenLoading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
    };

    return (
        <Lottie options={defaultOptions}
                height={200}
                width={200}
        />
    );
};

export default FullScreenLoading;
