import React from 'react'
import { withStyles } from '@mui/styles'

import { Grid } from '@mui/material'

const styles = theme => ({
    root: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '3px',
        padding: '10px'
    },
    title: {
        color: theme.palette.primary.main,
        margin: 0,
        textTransform: 'uppercase'
    }
})

function DashboardBox({
    children,
    classes,
    title,
    renderAddButton
}) {
    return (
        <Grid item xs={12} className={classes.root}>
            <div style={{ float: 'right' }}>
                {renderAddButton()}
            </div>
            <div>
                <h2 className={classes.title}>{title}</h2>
            </div>
            <div>
                {children}
            </div>
        </Grid>
    )
}

export default withStyles(styles)(DashboardBox);