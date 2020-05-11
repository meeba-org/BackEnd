import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateCompany} from "../../actions";
import {getCompany} from "../../selectors";
import AllowedWorkplaces from "./AllowedWorkplaces";

const AllowedWorkplacesContainer = () => {
    const company = useSelector(getCompany);
    if (!company)
        return null;

    let [workplaces, setWorkplaces] = useState(company.workplaces);
    const dispatch = useDispatch();

    const updateWorkplaces = newWorkplaces => {
        const newCompany = {
            ...company,
            workplaces: newWorkplaces
        };

        setWorkplaces(newCompany.workplaces);
        dispatch(updateCompany(newCompany));
    };

    const handleAdd = workplace => {
        workplace = {
            name: "בית2",
            location: [32.783408, 35.025506],
            radius: 100
        };

        let newWorkplaces = [
            ...company.workplaces,
            workplace
        ];
        
        updateWorkplaces(newWorkplaces);
    };

    const handleDelete = workplace => {
        let newWorkplaces = company.workplaces.filter(wp => wp._id !== workplace._id);

        updateWorkplaces(newWorkplaces);
    };

    const handleUpdate = workplace => {
        let newWorkplaces = company.workplaces.map(wp => wp._id === workplace._id ? workplace : wp);

        updateWorkplaces(newWorkplaces);
    };

    return (
        <AllowedWorkplaces
            workplaces={workplaces}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
        />
    );
};

export default AllowedWorkplacesContainer;
