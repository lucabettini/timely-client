import { useState } from 'react';

export default function useForm(initialValues) {
  // Initial state
  const [fields, setFields] = useState(initialValues);

  const touchedAndInvalid = {};
  Object.keys(initialValues).forEach((key) => {
    touchedAndInvalid[key] = false;
  });

  const [touched, setTouched] = useState(touchedAndInvalid);
  const [invalid, setInvalid] = useState(touchedAndInvalid);

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
  const onSubmit = (validationSchema) => {
    Object.keys(fields).forEach((fieldName) => {
      const value = fields[fieldName];
      const schema = validationSchema[fieldName];
      onBlur(fieldName, value, schema);
    });
  };

  const canSubmit = () => {
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
    canSubmit,
    values: fields,
  };
}
