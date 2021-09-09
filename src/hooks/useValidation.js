import { useState } from 'react';

export default function useValidation(initialValues) {
  // Initial state
  const [fields, setFields] = useState(initialValues);

  const init = (boolean) => {
    let object = {};
    Object.keys(initialValues).forEach((key) => {
      object[key] = boolean;
      // If values are already present, set as touched and valid
      if (initialValues[key] !== '') object[key] = !boolean;
    });
    return object;
  };

  const [touched, setTouched] = useState(init(false));
  const [invalid, setInvalid] = useState(init(true));

  // Validate field
  const checkField = async (name, value, schema) => {
    const isValid = await schema.isValid(value);
    setInvalid((state) => {
      return { ...state, [name]: !isValid };
    });
  };

  // Validate after changin values - this way, the user
  // is notified if the input becomes valid after a change
  const onChange = async (name, value, schema) => {
    setFields((state) => {
      return {
        ...state,
        [name]: value,
      };
    });

    await checkField(name, value, schema);
  };

  // Set touched to true after onBlur event, or after the form
  // is submitted - this way, the user is notified when leaving
  // a field with an invalid value
  const onBlur = async (name, value, schema) => {
    setTouched((state) => {
      return {
        ...state,
        [name]: true,
      };
    });

    await checkField(name, value, schema);
  };

  // This function is used to style the input field, showing
  // errors only if the field was visited
  const isValid = (fieldName) => {
    return !(invalid[fieldName] && touched[fieldName]);
  };

  // Set all touched and run validation on submit
  const onSubmit = async (validationSchema) => {
    Object.keys(fields).forEach(async (fieldName) => {
      const value = fields[fieldName];
      const schema = validationSchema[fieldName];
      await onBlur(fieldName, value, schema);
    });

    let validity = true;
    Object.keys(invalid).forEach((field) => {
      if (invalid[field]) validity = false;
    });
    return validity;
  };

  return {
    onChange,
    onBlur,
    isValid,
    onSubmit,
    values: fields,
  };
}
