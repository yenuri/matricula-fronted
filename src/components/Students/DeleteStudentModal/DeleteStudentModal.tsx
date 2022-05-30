import Modal from '../../Modal/Modal';
import { Student } from '../../../types/Student';
import { useDispatch, useSelector } from 'react-redux';
import { StudentsActions } from '../../../store/actions/students';
import { Delete } from '@mui/icons-material';
import { deleteStudentInProgress } from '../../../store/selectors/students';
import { useEffect, useState } from 'react';

interface DeleteStudentModalProps {
    student: Student;
    open: boolean;
    onClose: () => void;
}

const DeleteStudentModal: React.FC<DeleteStudentModalProps> = ({
                                                                      open,
                                                                      student,
                                                                      onClose,
                                                                  }) => {
    const dispatch = useDispatch();
    const [commited, setCommited] = useState(false);
    const deleteInProgress = useSelector(deleteStudentInProgress);

    useEffect(() => {
        if (!commited) return;

        if (!deleteInProgress) {
            onClose();
            setCommited(false);
        }
    }, [commited, deleteInProgress, onClose]);
    const dismiss = () => {
        onClose();
    };

    const handleOnClose = () => {
        dismiss();
    };
    const handleOnConfirm = () => {
        // @ts-ignore
        dispatch(StudentsActions.deleteStudent(student.id));
        setCommited(true);
    };
    return (
        <Modal
            onClose={handleOnClose}
            isOpen={open}
            title="Delete student"
            onConfirm={handleOnConfirm}
            updateInProgress={deleteInProgress}
            confirmLabel="Delete"
            confirmIcon={<Delete />}
        >
            <span>
                Are you sure you want to delete{' '}
                {`${student?.names} ${student?.lastNames}`}?
            </span>
        </Modal>
    );
};

export default DeleteStudentModal;
