import React, {Suspense} from 'react';
import PrivateRoute from "./PrivateRoute";
const FullScreenLoading = (() => import("./FullScreenLoading"));

const LazyPrivateRoute = (props) => {
    return (
        <Suspense fallback={<FullScreenLoading />}>
            <PrivateRoute {...props} />
        </Suspense>
    );
};

export default LazyPrivateRoute;
