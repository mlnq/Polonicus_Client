import React from "react";
import { useField } from "formik";
import { Form, Input, Label, Select } from "semantic-ui-react";
import { isPropertySignature } from "typescript";

interface Props {
  placeholder: string;
  name: string;
  options: any;
  label?: string;
  children?: React.ReactNode;
}

export default function MyFieldSelect(props: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Field 
    
    error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
     
      <Select
        clearable
        options={props.options}
        value={field.value}
      />

     {meta.error && meta.touched ? <Label color='red' basic>{meta.error}</Label> : null}
    </Form.Field>
  );
}
