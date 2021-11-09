import React from 'react'
import { withStyles } from '@mui/styles'
import { InputLabel, OutlinedInput, FilledInput, Input, InputAdornment, IconButton, FormControl } from '@mui/material'

const styles = theme => ({ })

const TextFieldIcon = ({
    classes,
    variant,
    label,
    type,
    Icon,
    fullWidth,
    onClickIcon,
    ...props
}) => {
    const InputVariant = (props) => {
        if(!variant) {
            return null;
        }

        switch(variant) {
            case 'outlined':
                return <OutlinedInput {...props} />
            case 'filled':
                return <FilledInput {...props} />
            default:
                return <Input {...props} />;
        }
    }

    return (
        <FormControl variant={variant} fullWidth={fullWidth}>
            <InputLabel>{label}</InputLabel>
            <InputVariant
                type={type}
                endAdornment={
                    <InputAdornment position="end" onClick={onClickIcon}>
                        <IconButton
                            edge="end"
                        >
                            <Icon />
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                {...props}
            />
      </FormControl>
    )
}

export default withStyles(styles)(TextFieldIcon);