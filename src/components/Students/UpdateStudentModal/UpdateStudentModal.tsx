import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Student } from '../../../types/Student';
import Modal from '../../Modal';
import { StudentsActions } from '../../../store/actions/students';
import { useDispatch, useSelector } from 'react-redux';
import SaveIcon from '@mui/icons-material/Save';

import {
    createStudentInProgressSelector,
    updateStudentInProgressSelector,
} from '../../../store/selectors/students';

export interface UpdateModalProps {
    student?: Student;
    open: boolean;
    onClose: () => void;
}

const UpdateStudentModal: React.FC<UpdateModalProps> = ({
                                                             open,
                                                             onClose,
                                                             student,
                                                         }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [age, setAge] = useState('');
    const [dirty, setDirty] = useState(false);
    const studentUpdateInProgress = useSelector(updateStudentInProgressSelector);
    const studentCreateInProgress = useSelector(createStudentInProgressSelector);
    const create = !student;
    const confirmLabel = create ? 'Create' : 'Update';
    const title = `${confirmLabel} student`;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dirty) return;

        if (!(studentUpdateInProgress || studentCreateInProgress)) {
            onClose();
            setName('');
            setLastName('');
            setDni('');
            setAge('');
            setDirty(false);
        }
    }, [onClose, dirty, studentUpdateInProgress, studentCreateInProgress]);

    useEffect(() => {
        if (!student) {
            setName('');
            setLastName('');
            setDni('');
            setAge('');
            return;
        }
        setName(student.names);
        setLastName(student.lastNames);
        setDni(student.dni);
        setAge(student.age.toString());
    }, [student]);

    const handleOnConfirm = (
        payload: Partial<Student>,
        currentStudent: Student | undefined
    ) => {
        const payloadCandidate = !create
            ? { ...currentStudent, ...payload }
            : { ...payload};

        const dispatchAction = !create
            ? StudentsActions.updateStudent
            : StudentsActions.createStudent;

        // @ts-ignore
        dispatch(dispatchAction(payloadCandidate as Student));
        setDirty(true);
    };

    return (
        <Modal
            title={title}
            isOpen={open}
            onClose={onClose}
            confirmLabel={confirmLabel}
            confirmIcon={<SaveIcon />}
            updateInProgress={studentUpdateInProgress || studentCreateInProgress}
            onConfirm={() => {
                handleOnConfirm(
                    { names: name, lastNames: lastName, dni: dni, age: Number(age) },
                    student
                );
            }}
        >
            <TextField
                type="text"
                label="Student name"
                margin="dense"
                fullWidth
                autoFocus
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            />
            <br />
            <TextField
                type="text"
                label="Last Name"
                margin="dense"
                fullWidth
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
            />

            <br />
            <TextField
                autoFocus
                margin="dense"
                label="Dni"
                type="text"
                fullWidth
                onChange={(e) => setDni(e.target.value)}
                value={dni}
            />
            <TextField
                autoFocus
                margin="dense"
                label="Age"
                type="text"
                fullWidth
                onChange={(e) => setAge(e.target.value)}
                value={age}
            />
        </Modal>
    );
};

export default UpdateStudentModal;
