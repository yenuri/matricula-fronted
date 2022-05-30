import Modal from '../../Modal'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import {
    createCourseInProgressSelector,
    updateCourseInProgressSelector,
} from '../../../store/selectors/courses'
import { useDispatch, useSelector } from 'react-redux'
import { Course } from '../../../types/Course'
import { Save } from '@mui/icons-material'
import { CoursesActions } from '../../../store/actions/courses'
interface UpdateCourseModalProps {
    course?: Course
    open: boolean
    onClose: () => void
}

const UpdateCourseModal: React.FC<UpdateCourseModalProps> = ({
                                                               course,
                                                               open,
                                                               onClose,
                                                           }) => {
    const [name, setName] = useState('')
    const [acronym, setAcronym] = useState('')
    const [dirty, setDirty] = useState(false)
    const updateInProgress = useSelector(updateCourseInProgressSelector)
    const createInProgress = useSelector(createCourseInProgressSelector)
    const create = !course
    const confirmLabel = create ? 'Create' : 'Update'
    const title = `${confirmLabel} Course`
    const dispatch = useDispatch()

    useEffect(() => {
        if (!dirty) return
        if (!(updateInProgress || createInProgress)) {
            onClose()
            setDirty(false)
            setName('')
            setAcronym('')
        }
    }, [createInProgress, dirty, onClose, updateInProgress])

    useEffect(() => {
        if (!course) {
            setName('')
            setAcronym('')
            return
        }
        setName(course.name)
        setAcronym(course.acronym)
    }, [course])

    const handleConfirm = (
        payload: Partial<Course>,
        currentCourse: Course | undefined
    ) => {
        const payloadCandidate: Course = !create
            ? ({ ...currentCourse, ...payload } as Course) // Object.assign({}, currentCourse, payload)
            : ({ ...payload, status: true } as Course)

        const dispatchAction = !create
            ? CoursesActions.updateCourse
            : CoursesActions.createCourse

        // @ts-ignore
        dispatch(dispatchAction(payloadCandidate))
        setDirty(true)
    }

    return (
        <Modal
            title={title}
            isOpen={open}
            onClose={onClose}
            confirmLabel={confirmLabel}
            confirmIcon={<Save />}
            updateInProgress={updateInProgress || createInProgress}
            onConfirm={() =>
                handleConfirm({ name: name, acronym: acronym }, course)
            }
        >
            <TextField
                type="text"
                fullWidth
                margin="dense"
                label='Course Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                type="text"
                fullWidth
                margin="dense"
                label="Acronym"
                value={acronym}
                onChange={(e) => setAcronym(e.target.value)}
            />
        </Modal>
    )
}

export default UpdateCourseModal
