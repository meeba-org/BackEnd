import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../actions";
import {getUser} from "../../selectors";
import AllowedWorkplaces from "./AllowedWorkplaces";

const AllowedWorkplacesContainer = () => {
    const user = useSelector(getUser());
    const dispatch = useDispatch();

    const data = [
        {
            name: "עבודה",
            location: [32.788315, 34.957406],
            radius: 100
        },
        {
            name: "בית",
            location: [32.783408, 35.025506],
            radius: 100
        }
    ];
    const handleAdd = workplace => {
        user.workplaces.push(workplace);
        dispatch(updateUser(user));
    };

    const handleDelete = workplace => {
        user.workplaces = user.workplaces.filter(wp => wp !== workplace._id);
        dispatch(updateUser(user));
    };

    const handleUpdate = workplace => {
        user.workplaces = user.workplaces.map(wp => wp._id === workplace._id ? workplace : wp);
        dispatch(updateUser(user));
    };

    return (
        <AllowedWorkplaces
            workplaces={data}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
        />
    );
};

export default AllowedWorkplacesContainer;
