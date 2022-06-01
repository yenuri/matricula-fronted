import React from 'react';
import { Course } from '../../../types/Course';
import { ListItemComponent } from '../../CustomList/CustomList';
import {Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@mui/material";
import {Delete, Edit, FileCopy as FileCopyIcon} from "@mui/icons-material";

const CourseListItem: React.FC<ListItemComponent<Course>> = ({
                                                               item,
                                                               onUpdate,
                                                               onDelete,
                                                           }) => {
    return (
        <ListItem key={item.id}>
            <Avatar>
                <FileCopyIcon/>
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
