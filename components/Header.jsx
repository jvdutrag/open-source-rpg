import React from 'react'
import { withStyles } from '@mui/styles'

import { Grid } from '@mui/material'

function Header({
    title,
    classes
}) {
    return (
        <Grid
            item
            xs={12}
            justifyContent="center"
            style={{ textAlign: 'center', marginTop: 50 }}
        >
            <img 
                style={{ 
                    width: '150px'
                }}
                src="/assets/logo.svg"
                alt="Open Source RPG"
            />
            <h1
                className={classes.title}
            >
                {title}
            </h1>
        </Grid>
    )
}

const styles = theme => ({
    title: {
        color: '#FFFFFF',
        marginTop: 60,
    }
});

export default withStyles(styles)(Header);
