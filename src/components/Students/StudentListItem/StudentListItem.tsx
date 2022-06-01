import React from 'react';
import { Student } from '../../../types/Student';
import { ListItemComponent } from '../../CustomList/CustomList';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import {Delete, Edit, People as PeopleIcon} from '@mui/icons-material';

const StudentListItem: React.FC<ListItemComponent<Student>> = ({
                                                                     item,
                                                                     onUpdate,
                                                                     onDelete,
                                                                 }) => {
    return (
        <ListItem key={item.id}>
            <Avatar>
                <PeopleIcon/>
            </Avatar>
            <ListItemText
                primary={`${item.names} ${item.lastNames}`}
                secondary={`DNI: ${item.dni}`}
            />

            <ListItemSecondaryAction>
                <IconButton onClick={() => onUpdate(item)}>
                    <Edit />
                </IconButton>

                <IconButton onClick={() => onDelete(item)}>
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default StudentListItem;
