import React from 'react'
import { withStyles } from '@mui/styles'

const styles = theme => ({
    root: {
        background: theme.palette.primary[600],
        borderRadius: '6px',
        padding: '15px',
        height: '100%',
        overflow: 'auto'
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
    title,

    renderButton
}) {
    return (
        <div className={classes.root}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>
                    <h2 className={classes.title}>{title}</h2>
                </div>
                {
                    renderButton && (
                        <div style={{ alignSelf: 'center' }}>
                            {renderButton()}
                        </div>
                    )
                }
            </div>
            <div style={{ padding: '20px' }}>
                {children}
            </div>
        </div>
    )
}

export default withStyles(styles)(DashboardBox);