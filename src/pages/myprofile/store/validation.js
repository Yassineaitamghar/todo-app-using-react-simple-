import * as yup from 'yup';

const validationSchema = yup.object({
   name: yup.string().required('Name is required'),
});

export default validationSchema;
