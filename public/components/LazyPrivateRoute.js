import React, {Suspense} from 'react';
import FullScreenLoading from "./FullScreenLoading";
import PrivateRoute from "./PrivateRoute";

const LazyPrivateRoute = (props) => {
    return (
        <Suspense fallback={<FullScreenLoading />}>
            <PrivateRoute {...props} />
        </Suspense>
    );
};

export default LazyPrivateRoute;
