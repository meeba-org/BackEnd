import React, {Suspense} from 'react';
import PrivateRoute from "./PrivateRoute";

const LazyPrivateRoute = (props) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PrivateRoute {...props} />
        </Suspense>
    );
};

export default LazyPrivateRoute;
