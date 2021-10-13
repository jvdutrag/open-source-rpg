import React from 'react'
import { withStyles } from '@mui/styles'
import { Add as AddIcon } from '@mui/icons-material'

const styles = theme => ({
    root: {
        border: `1px dashed ${theme.palette.primary.main}`,
        borderRadius: '3px',
        padding: '15px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer'
    },

    icon: {
        fontSize: '65px',
        color: theme.palette.primary.main
    }
})

function AddBox({
    classes,
    ...rest
}) {
    return (
        <div className={classes.root} {...rest}>
            <AddIcon className={classes.icon} />
        </div>
    )
}

export default withStyles(styles)(AddBox);