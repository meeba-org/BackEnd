import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showModal, updateCompany} from "../../actions";
import {getCompany, isInnovativeAuthorityEnable} from "../../selectors";
import {EModalType} from "../modals/EModalType";
import Workplaces from "../workplace/Workplaces";

const WorkplacesContainer = () => {
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

    const isAddAllowed = () => {
        let innovativeAuthorityEnable = useSelector(isInnovativeAuthorityEnable);

        if (!innovativeAuthorityEnable)
            return true;
        
        return workplaces.length < 2;
    };

    return (
        <Workplaces
            workplaces={workplaces}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            isAddAllowed={isAddAllowed()}
        />
    );
};

export default WorkplacesContainer;
