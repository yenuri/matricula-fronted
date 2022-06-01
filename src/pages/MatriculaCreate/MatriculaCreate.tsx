import {
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactFragment,
    ReactPortal,
    useEffect,
    useReducer,
    useState,
} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {studentsMapSelector} from '../../store/selectors/students'
import {coursesMapSelector} from '../../store/selectors/courses'

import Layout from '../../components/Layout/Layout'
import {StudentsActions} from '../../store/actions/students'
import {CoursesActions} from '../../store/actions/courses'
import {
    Button,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    TextField,
} from '@mui/material'
import {
    RemoveCircle as RemoveCircleIcon,
    AddCircle as AddCircleOutlineIcon,
} from '@mui/icons-material'
import {useCreateMatricula} from '../../hooks/useCreateMatricula'
import {Student} from '../../types/Student'
import {Course} from '../../types/Course'
import {
    fireAction,
    getInitialState,
    MatriculaCreateAction,
    matriculaCreateReducer,
} from './matriculaCreateReducer'

function MatriculaCreate() {
    const [student, setStudent] = useState<Student>()
    const [course, setCourse] = useState<Course>()

    const [state, localDispatch] = useReducer(
        matriculaCreateReducer,
        getInitialState()
    )
    const {orders: orderMap} = state

    const orders = Object.values(orderMap) as any

    const studentMap = useSelector(studentsMapSelector)
    const studentList = studentMap ? Object.values(studentMap) : null

    const courseMap = useSelector(coursesMapSelector)
    const courseList = courseMap ? Object.values(courseMap) : null

    const {updateResult, updateError, createMatricula} = useCreateMatricula()

    useEffect(() => {
        if (updateResult) {
            setStudent(undefined)
            setCourse(undefined)
            localDispatch(fireAction(MatriculaCreateAction.resetState))
        }
    }, [updateResult])

    useEffect(() => {
        if (updateError) {
            console.log(updateError)
        }
    }, [updateError])

    const dispatch = useDispatch()

    useEffect(() => {
        if (!studentList) {
            // @ts-ignore
            dispatch(StudentsActions.getStudents())
        }
        if (!courseList) {
            // @ts-ignore
            dispatch(CoursesActions.getCourses())
        }
    }, [])

    const onNewMatricula = async () => {
        function transformOrders() {
            return orders.map((p) => {
                return {
                    key: p.id,
                    course: {
                        id: p.id,
                    },
                }
            })
        }

        const payload = {
            courseList: transformOrders(),
            student: {
                id: student.id,
            },
        }

        createMatricula(payload)
    }

    const handleSelectStudent = (event: any) => {
        const studentId = event.target.value
        // @ts-ignore
        const selectedStudent = studentMap[studentId]
        setStudent(selectedStudent)
        localDispatch(fireAction(MatriculaCreateAction.resetOrders))
    }

    const handleSelectCourse = (event: any) => {
        const courseId = event.target.value
        // @ts-ignore
        const selectedCourse = courseMap[courseId]
        setCourse(selectedCourse)
    }

    const onChangeDescription = (event: any) => {
        localDispatch(
            fireAction(
                MatriculaCreateAction.updateDescription,
                event.target.value
            )
        )
    }

    const onChangeObservation = (event: any) => {
        localDispatch(
            fireAction(
                MatriculaCreateAction.updateObservation,
                event.target.value
            )
        )
    }

    const renderOrders = () => {
        // @ts-ignore
        return (
            <div className="tablePedidos">
                <div className="tableOrders__head">
                    <div className="tableOrders__head--item">Course</div>
                    <div className="tableOrders__head--item">action</div>
                </div>
                <div className="tableOrders__body">
                    {orders.map(
                        (order) => (
                            <div
                                className="tableOrders__body--row"
                                key={order.id}
                            >
                                <div className="tableOrders__body--col">
                                    {order.name}
                                </div>
                                <div className="tableOrders__body--col">
                                    <IconButton
                                        color="inherit"
                                        onClick={() =>
                                            localDispatch(
                                                fireAction(
                                                    MatriculaCreateAction.removeOrderEntry,
                                                    order
                                                )
                                            )
                                        }
                                    >
                                        <RemoveCircleIcon/>
                                    </IconButton>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        )
    }

    return (
        <Layout>
            <br/>
            <br/>
            <br/>
            <br/>

            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Select
                        id="student"
                        style={{width: '100%'}}
                        value={student}
                        onChange={handleSelectStudent}
                    >
                        {studentList &&
                            studentList.map((student) => (
                                <MenuItem value={student.id} key={student.id}>
                                    {student.names} {student.lastNames}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <Select
                        id="course"
                        style={{width: '100%'}}
                        value={course}
                        onChange={handleSelectCourse}
                    >
                        {courseList &&
                            courseList.map((course) => (
                                <MenuItem key={course.id} value={course.id}>
                                    {course.name}
                                </MenuItem>
                            ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <IconButton
                        color="inherit"
                        onClick={() =>
                            localDispatch(
                                fireAction(
                                    MatriculaCreateAction.addOrderEntry,
                                    course
                                )
                            )
                        }
                    >
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <div style={{padding: '15px'}}>
                            {orders.length === 0 && (
                                <div>
                                    There is no registration yet
                                </div>
                            )}
                            {orders.length > 0 && renderOrders()}
                        </div>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <br/>
                    <br/>
                    <Button
                        fullWidth
                        onClick={onNewMatricula}
                        variant="contained"
                        color="primary"
                    >
                        Save Matricula
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default MatriculaCreate
