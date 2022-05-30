import React from 'react';
import { Course } from '../../../types/Course';
import { ListItemComponent } from '../../CustomList/CustomList';
import {Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {Delete, Edit, Fastfood} from "@mui/icons-material";

const CourseListItem: React.FC<ListItemComponent<Course>> = ({
                                                               item,
                                                               onUpdate,
                                                               onDelete,
                                                           }) => {
    return (
        <ListItem key={item.id}>
            <Avatar>
                <Fastfood />
            </Avatar>
            <ListItemText
                primary={item.name}
                secondary={`Acronym: ${item.acronym}`}
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

export default CourseListItem;
