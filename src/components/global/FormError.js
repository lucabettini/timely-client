import React from 'react';

import Alert from '@material-ui/lab/Alert';

const FormError = (props) => {
  return (
    <Alert variant='filled' severity='warning' style={{ widht: '100%' }}>
      {props.children}
    </Alert>
  );
};

export default FormError;
