import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateCompany} from "../../actions";
import {getCompany} from "../../selectors";
import AllowedWorkplaces from "./AllowedWorkplaces";

const AllowedWorkplacesContainer = () => {
    const company = useSelector(getCompany);
    if (!company)
        return null;

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
        company.workplaces.push({
            name: "בית2",
            location: [32.783408, 35.025506],
            radius: 100
        });
        dispatch(updateCompany(company));
    };

    const handleDelete = workplace => {
        company.workplaces = company.workplaces.filter(wp => wp !== workplace._id);
        dispatch(updateCompany(company));
    };

    const handleUpdate = workplace => {
        company.workplaces = company.workplaces.map(wp => wp._id === workplace._id ? workplace : wp);
        dispatch(updateCompany(company));
    };

    return (
        <AllowedWorkplaces
            workplaces={company.workplaces}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
        />
    );
};

export default AllowedWorkplacesContainer;
