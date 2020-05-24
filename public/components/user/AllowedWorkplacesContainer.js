import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showModal, updateCompany} from "../../actions";
import {getCompany} from "../../selectors";
import {EModalType} from "../modals/EModalType";
import AllowedWorkplaces from "../workplace/AllowedWorkplaces";

const AllowedWorkplacesContainer = () => {
    const company = useSelector(getCompany);
    if (!company)
        return null;

    let [workplaces, setWorkplaces] = useState(company.workplaces);
    const dispatch = useDispatch();

    useEffect(() => {
        setWorkplaces(company.workplaces);
    }, [company.workplaces]);

    const updateWorkplaces = newWorkplaces => {
        const newCompany = {
            ...company,
            workplaces: newWorkplaces
        };

        setWorkplaces(newCompany.workplaces);
        dispatch(updateCompany(newCompany));
    };

    const createWorkspace = workplace => {
        let newWorkplaces = [
            ...company.workplaces,
            workplace
        ];

        updateWorkplaces(newWorkplaces);
    };

    const handleAdd = () => {
        dispatch(showModal(EModalType.WORKPLACE_SELECTION,
            {
                onSave: (newWorkspace) => {
                    createWorkspace(newWorkspace);
                },
                orgWorkplace: {
                    radius: 500
                }
            }
        ));
    };

    const handleDelete = workplace => {
        let newWorkplaces = company.workplaces.filter(wp => wp._id !== workplace._id);

        updateWorkplaces(newWorkplaces);
    };

    const handleUpdate = (workplace) => {
        dispatch(showModal(EModalType.WORKPLACE_SELECTION,
            {
                onSave: (updatedWorkplace) => {
                    let newWorkplaces = company.workplaces.map(wp => wp._id === updatedWorkplace._id ? updatedWorkplace : wp);

                    updateWorkplaces(newWorkplaces);
                },
                orgWorkplace: workplace
            }
        ));
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
