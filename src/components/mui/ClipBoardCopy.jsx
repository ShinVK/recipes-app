/* eslint-disable react/no-multi-comp */
import PropTypes from 'prop-types';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

const Alert = React.forwardRef(
  (props, ref) => <MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />,
);

export default function ClipBoardCopy({ url }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${url}`);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={ 2 } sx={ { width: '100%' } }>
      <IconButton aria-label="add to favorites" onClick={ () => handleClick() }>
        <ShareIcon data-testid="share-btn" />
      </IconButton>
      <Snackbar open={ open } autoHideDuration={ 6000 } onClose={ handleClose }>
        <Alert onClose={ handleClose } severity="success" sx={ { width: '100%' } }>
          Link Copied!
        </Alert>
      </Snackbar>
    </Stack>
  );
}

ClipBoardCopy.propTypes = {
  url: PropTypes.string.isRequired,
};
