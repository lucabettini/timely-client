import React from 'react';

import TextField from '@material-ui/core/TextField';

const CustomInput = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  isValid,
  schema,
  textarea,
  ...props
}) => {
  const inputProps = () => {
    return {
      name,
      value,
      label,
      id: name,
      error: isValid ? null : true,
      onChange: (e) => handleChange(name, e.target.value, schema),
      onBlur: (e) => handleBlur(name, e.target.value, schema),
      ...props,
    };
  };

  return <TextField {...inputProps()} />;
};

export default CustomInput;
