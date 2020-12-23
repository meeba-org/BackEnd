import React from 'react';
import Lottie from 'react-lottie-player';
import * as animationData from '../styles/assets/lottie1';

const FullScreenLoading = () => {
    return (
        <Lottie
            loop
            animationData={animationData.default}
            play
            style={{ width: 200, height: 200 }}
        />
    );
};

export default FullScreenLoading;
