import React from 'react'
import { withStyles } from '@mui/styles'
import { Add as AddIcon } from '@mui/icons-material'

const styles = theme => ({
    root: {
        background: theme.palette.primary[900],
        borderRadius: '3px',
        padding: '15px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
    },

    icon: {
        fontSize: '65px',
        color: theme.palette.primary.main
    }
})

const AddBox = ({
    classes,
    ...rest
}) => {
    return (
        <div className={classes.root} {...rest}>
            <AddIcon className={classes.icon} />
        </div>
    )
}

export default withStyles(styles)(AddBox);