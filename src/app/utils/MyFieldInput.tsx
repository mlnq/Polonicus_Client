import React from "react";
import { useField } from "formik";
import { Form,Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?:string;
  children?: React.ReactNode;
}

export default function MyFieldInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field 
    
    error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
     
      <input {...field} {...props} />
     {meta.error && meta.touched ? 
     <Label color='red' basic>{meta.error}</Label> : null}
    </Form.Field>
  );
}


