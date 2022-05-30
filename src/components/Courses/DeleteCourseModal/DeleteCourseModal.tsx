import { Course } from '../../../types/Course'
import Modal from '../../Modal'
import { useDispatch, useSelector } from 'react-redux'
import { CoursesActions } from '../../../store/actions/courses'
import { deleteCourseInProgress } from '../../../store/selectors/courses'
import { Delete } from '@mui/icons-material'
import { useEffect, useState } from 'react'

interface DeleteCourseModalProps {
    course: Course
    open: boolean
    onClose: () => void
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
                                                               course,
                                                               open,
                                                               onClose,
                                                           }) => {
    const dispatch = useDispatch()
    const deleteInProgress = useSelector(deleteCourseInProgress)
    const [deleteAttempt, setDeleteAttempt] = useState(false)
    useEffect(() => {
        if (!deleteAttempt) return
        if (!deleteInProgress) {
            onClose()
            setDeleteAttempt(false)
        }
    }, [deleteAttempt, deleteInProgress, onClose])
    const onDismiss = () => {
        onClose()
    }
    const handleOnClose = () => {
        onDismiss()
    }

    const handleOnConfirm = () => {
        // @ts-ignore
        dispatch(CoursesActions.deleteCourse(course.id))
        setDeleteAttempt(true)
    }
    return (
        <Modal
            onClose={handleOnClose}
            isOpen={open}
            title="Delete Course"
            onConfirm={handleOnConfirm}
            updateInProgress={deleteInProgress}
            confirmLabel="Delete"
            confirmIcon={<Delete />}
        >
            <span>Are you sure you want to delete {course?.name} ?</span>
        </Modal>
    )
}

export default DeleteCourseModal
