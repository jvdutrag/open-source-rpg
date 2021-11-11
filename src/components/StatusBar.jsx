import { LinearProgress, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

function LinearProgressWithLabel(props) {
    const useStyles = makeStyles({
        primaryColor: {
            backgroundColor: props.primaryColor
        },
        secondaryColor: {
            backgroundColor: props.secondaryColor
        }
    });

    const classes = useStyles();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    style={{ height: '30px', borderRadius: '4px', cursor: 'pointer' }}
                    variant="determinate"
                    value={props.value}
                    classes={{
                        root: classes.secondaryColor,
                        bar: classes.primaryColor
                    }}
                    onClick={props.onClick}
                />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body1" color="text.secondary" style={{ userSelect: 'none' }}>
                    {props.label}
                </Typography>
            </Box>
        </Box>
    )
}

const StatusBar = ({
    label,
    max,
    current,
    primaryColor,
    secondaryColor,
    onClick
}) => {
    const normalise = (current, max) => ((current - 0) * 100) / (max - 0);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel
                value={normalise(current, max)}
                label={label}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                onClick={onClick}
            />
        </Box>
    )
}

export default StatusBar;