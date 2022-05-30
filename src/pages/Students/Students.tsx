import Layout from '../../components/Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { StudentsActions } from '../../store/actions/students';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

import UpdateStudentModal from '../../components/Students/UpdateStudentModal';
import {
    getStudentsListInProgressSelector,
    studentListSelector,
} from '../../store/selectors/students';
import CustomList from '../../components/CustomList';
import StudentListItem from '../../components/Students/StudentListItem';
import DeleteStudentModal from '../../components/Students/DeleteStudentModal';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';
import {Student} from "../../types/Student";

const Students = () => {
    const dispatch = useDispatch();
    const studentList = useSelector(studentListSelector);
    const fetchStudentListInProgress = useSelector(
        getStudentsListInProgressSelector
    );
    const [updateStudent, setUpdateStudent] = useState<Student>();
    const [showCreateDialog, toggleCreateDialog] = useState(false);
    const [showDeleteDialog, toggleDeleteDialog] = useState(false);

    const handleOnUpdate = (item: Student) => {
        setUpdateStudent(item);
        toggleCreateDialog(true);
    };

    const handleOnDelete = (item: Student) => {
        setUpdateStudent(item);
        toggleDeleteDialog(true);
    };

    const onUpdateModalDismiss = () => {
        toggleCreateDialog(false);
        setUpdateStudent(undefined);
    };

    const onDeleteModalDismiss = () => {
        toggleDeleteDialog(false);
        setUpdateStudent(undefined);
    };

    useEffect(() => {
        // @ts-ignore
        dispatch(StudentsActions.getStudents());
    }, [dispatch]);

    return (
        <Layout>
            {fetchStudentListInProgress && (
                <LoadingState message="Loading students..." />
            )}

            {!fetchStudentListInProgress && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1>Students</h1>
                        <Button
                            onClick={() => toggleCreateDialog(true)}
                            variant="contained"
                        >
                            Add new student
                        </Button>
                    </Grid>

                    {studentList && studentList.length ? (
                        <Grid item xs={9}>
                            {studentList && (
                                <CustomList<Student>
                                    renderAs={StudentListItem}
                                    collection={studentList}
                                    onDelete={handleOnDelete}
                                    onUpdate={handleOnUpdate}
                                />
                            )}
                        </Grid>
                    ) : (
                        <EmptyState message="No students Available" />
                    )}
                </Grid>
            )}

            <UpdateStudentModal
                open={showCreateDialog}
                student={updateStudent}
                onClose={onUpdateModalDismiss}
            />

            <DeleteStudentModal
                open={showDeleteDialog}
                student={updateStudent as Student}
                onClose={onDeleteModalDismiss}
            />
        </Layout>
    );
};

export default Students;
