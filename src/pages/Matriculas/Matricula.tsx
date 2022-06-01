import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout/Layout';
import { studentListSelector } from '../../store/selectors/students';
import { matriculaStateSelector } from '../../store/selectors/matriculas';
import {
    clearMatriculasByUser,
    getMatriculaList,
    getMatriculasByUser,
} from '../../store/actions/matriculas';
import { StudentsActions } from '../../store/actions/students';
import {
    Button,
    CircularProgress,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility as VisibilityIcon } from '@mui/icons-material';

function Matriculas() {
    const [idSelected, setIdSelected] = useState('');

    const state = useSelector(matriculaStateSelector);
    const studentList = useSelector(studentListSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event: any) => {
        setIdSelected(event.target.value);
    };

    const onSearchByUser = async () => {
        console.log('click');
        // @ts-ignore
        dispatch(getMatriculasByUser(idSelected));
    };

    const onClearFilter = () => {
        setIdSelected('');
        dispatch(clearMatriculasByUser());
    };

    const onDetail = (data: any) => {
        navigate(`/matriculas/${data.id}`);
    };

    const fetchMatriculas = () => {
        // @ts-ignore
        dispatch(getMatriculaList());
    };

    useEffect(() => {
        if (!studentList) {
            // @ts-ignore
            dispatch(StudentsActions.getStudents());
        }
        fetchMatriculas();
    }, []);

    const renderListStudents = () => {
        return state.list.data.map((data: any, i: any) => (
            <ListItem key={i}>
                <ListItemText primary={data.id} />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onDetail(data)}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
    };

    const renderListStudentsByUser = () => {
        if (state.filterList.data.length === 0) {
            return <div>There are no matriculas for this Student</div>;
        }
        return state.filterList.data.map((data: any, i: any) => (
            <ListItem key={i}>
                <ListItemText primary={data.id} />
                <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onDetail(data)}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
    };

    return (
        <Layout>
            <Grid item xs={12} md={12}>
                <Typography variant="h4" gutterBottom>
                    Matricula List
                </Typography>
                <div>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                style={{ width: '100%' }}
                                value={idSelected}
                                onChange={handleChange}
                            >
                                {studentList &&
                                    studentList.map((student, i) => (
                                        <MenuItem key={i} value={student.id}>
                                            {student.names} {student.lastNames}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={onSearchByUser}
                                variant="contained"
                                color="primary"
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={onClearFilter} variant="contained">
                                Clean
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                <br />
                <br />
                <Divider />
                <br />
                <br />
                <div>
                    <List dense={false}>
                        {(state.list.loading || state.filterList.loading) && (
                            <CircularProgress color="inherit" />
                        )}
                        {state.list.data &&
                            state.filterList.data === null &&
                            renderListStudents()}
                        {state.filterList.data !== null &&
                            renderListStudentsByUser()}
                    </List>
                </div>
            </Grid>
        </Layout>
    );
}

export default Matriculas;
