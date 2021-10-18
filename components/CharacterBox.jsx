import React from 'react'
import { withStyles } from '@mui/styles'
import { Button, Grid } from '@mui/material'

import {
    Link as LinkIcon,
    Delete as DeleteIcon
} from '@mui/icons-material'

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
        minHeight: '300px'
    },

    characterImage: {
        width: '150px',
        borderRadius: '50%'
    },

    characterName: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '8px'
    },

    hpInfo: {
        fontWeight: 'bold',
        color: '#cc5084'
    }
})

const CharacterBox = ({
    classes,
    character,
    deleteCharacter,
    ...rest
}) => {
    return (
        <div className={classes.root} {...rest}>
            <img
                src={`/assets/user.png`}
                alt="Character Portrait"
                className={classes.characterImage}
            />
            <span className={classes.characterName}>{character.name}</span>
            <div>
                Vida:&nbsp;
                <span className={classes.hpInfo}>
                    {character.current_hit_points}/{character.max_hit_points}
                </span>
            </div>
            <Grid container spacing={3} style={{ marginTop: '8px' }}>
                <Grid item xs={6}>
                    <Button
                        variant="outlined"
                        href={`/sheet/${character.id}`}
                        target="_blank"
                        fullWidth
                    >
                        <LinkIcon />
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="outlined"
                        onClick={() => deleteCharacter(character.id)}
                        fullWidth
                    >
                        <DeleteIcon />
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(CharacterBox);