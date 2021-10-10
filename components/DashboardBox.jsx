import React from 'react'
import { withStyles } from '@mui/styles'

const styles = theme => ({
    root: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '6px',
        padding: '10px',
        height: '100%'
    },
    title: {
        color: theme.palette.primary.main,
        textTransform: 'uppercase',
        margin: 0,
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '5px'
    }
})

function DashboardBox({
    children,
    classes,
    title
}) {
    return (
        <div className={classes.root}>
            <div>
                <h2 className={classes.title}>{title}</h2>
            </div>
            <div style={{ padding: '20px' }}>
                {children}
            </div>
        </div>
    )
}

export default withStyles(styles)(DashboardBox);