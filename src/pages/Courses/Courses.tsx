import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { CoursesActions } from '../../store/actions/courses'
import { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Dialog,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material'

import {
    getCoursesListInProgressSelector,
    courseListSelector,
} from '../../store/selectors/courses'

import LoadingState from '../../components/LoadingState'
import EmptyState from '../../components/EmptyState'
import { Delete, Edit, Fastfood } from '@mui/icons-material'
import UpdateCourseModal from '../../components/Courses/UpdateCourseModal/UpdateCourseModal'
import DeleteCourseModal from '../../components/Courses/DeleteCourseModal/DeleteCourseModal'
import { Course } from '../../types/Course'
import CourseListItem from '../../components/Courses/CourseListItem'
import CustomList from '../../components/CustomList'

const Courses = () => {
    const dispatch = useDispatch()
    const [showCreateDialog, setShowCreateDialog] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [updateCourse, setUpdateCourse] = useState<Course>()

    const courseList = useSelector(courseListSelector)
    const fetchCourseListInProgress = useSelector(
        getCoursesListInProgressSelector
    )

    useEffect(() => {
        // @ts-ignore
        dispatch(CoursesActions.getCourses())
    }, [dispatch])

    const handleOnUpdate = (item: Course) => {
        setUpdateCourse(item)
        setShowCreateDialog(true)
    }

    const handleOnDelete = (item: Course) => {
        setUpdateCourse(item)
        setShowDeleteDialog(true)
    }
    const onUpdateDialogDismiss = () => {
        setShowCreateDialog(false)
        setUpdateCourse(undefined)
    }

    const onDeleteDialogDismiss = () => {
        setShowDeleteDialog(false)
        setUpdateCourse(undefined)
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(CoursesActions.getCourses())
    }, [dispatch])

    return (
        <>
            <UpdateCourseModal
                open={showCreateDialog}
                course={updateCourse}
                onClose={onUpdateDialogDismiss}
            />
            <DeleteCourseModal
                open={showDeleteDialog}
                course={updateCourse as Course}
                onClose={onDeleteDialogDismiss}
            />
            <Layout>
                {fetchCourseListInProgress && (
                    <LoadingState message="Loading courses..." />
                )}

                {!fetchCourseListInProgress && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <h1>Courses</h1>
                            <Button
                                variant="contained"
                                onClick={() => setShowCreateDialog(true)}
                            >
                                Add new course
                            </Button>
                        </Grid>

                        {courseList && courseList.length ? (
                            <Grid item xs={9}>
                                {courseList && courseList.length !== 0 && (
                                    <CustomList<Course>
                                        renderAs={CourseListItem}
                                        collection={courseList}
                                        onDelete={handleOnDelete}
                                        onUpdate={handleOnUpdate}
                                    />
                                )}
                            </Grid>
                        ) : (
                            <EmptyState message="No courses Available" />
                        )}
                    </Grid>
                )}
            </Layout>
        </>
    )
}

export default Courses
