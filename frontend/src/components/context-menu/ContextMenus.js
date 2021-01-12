import React from 'react';
import { ContextMenu, MenuItem } from "react-contextmenu";
import './contextmenu.css';

export const AdminGalleryContextMenu = (props) => {
    return (
        <ContextMenu id="same_unique_identifier">
            <MenuItem onClick={() => props.handleClick("set")}>
                Set as avatar
            </MenuItem>
            <MenuItem divider />
            <MenuItem onClick={() => props.handleClick("delete")}>
                Delete
            </MenuItem>
        </ContextMenu>)
}
