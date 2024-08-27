import { Flex, Input } from 'antd';

import { useController } from 'react-hook-form';

const FormInput = ({ name, control, disabled, defaultValue }) => {
   const {
      field: { ref, ...field },
      fieldState,
   } = useController({
      name,
      control,
      defaultValue,
      disabled,
   });

   return (
      <Flex vertical>
         <Input ref={ref} {...field} status={fieldState.invalid ? 'error' : ''} />
         {fieldState.invalid && <p style={{ color: 'red' }}>{fieldState.error.message}</p>}
      </Flex>
   );
};

export default FormInput;
