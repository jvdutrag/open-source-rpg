import { CircularProgress } from '@mui/material';

const Loader = ({ size, ...rest }) => (
    <CircularProgress color="primary" size={size} {...rest} />
)

export default Loader;