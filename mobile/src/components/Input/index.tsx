import React, {
   useEffect,
   useRef,
   useImperativeHandle,
   forwardRef,
   useState,
   useCallback,
} from 'react';

import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon, Error } from './styles';

interface InputProps extends TextInputProps {
   name: string;
   icon: string;
   containerStyle?: {};
}

interface InputValueReference {
   value: string;
}

interface InputRef {
   focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
   { name, icon, containerStyle = {}, ...rest },
   ref,
) => {
   const inputElementRef = useRef<any>(null);

   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);

   const { registerField, defaultValue = '', fieldName, error } = useField(
      name,
   );
   const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

   useImperativeHandle(ref, () => ({
      focus() {
         inputElementRef.current.focus();
      },
   }));

   const handleInputFocus = useCallback(() => {
      setIsFocused(true);
   }, []);

   const handleInputBlur = useCallback(() => {
      setIsFocused(false);

      setIsFilled(!!inputValueRef.current.value);
   }, []);

   useEffect(() => {
      registerField<string>({
         name: fieldName,
         ref: inputValueRef.current,
         path: 'value',
         setValue(asda: any, value) {
            inputValueRef.current.value = value;
            inputElementRef.current.setNativeProps({ text: value });
         },
         clearValue() {
            inputValueRef.current.value = '';
            inputElementRef.current.clear();
         },
      });
   }, [fieldName, registerField]);

   return (
      <Container
         style={containerStyle}
         isErrored={!!error}
         isFocused={isFocused}
      >
         {icon && (
            <Icon
               name={icon}
               size={20}
               color={isFocused || isFilled ? '#ff9000' : '#676360'}
            />
         )}
         <TextInput
            ref={inputElementRef}
            keyboardAppearance="dark"
            placeholderTextColor="#666360"
            defaultValue={defaultValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onChangeText={(value) => {
               inputValueRef.current.value = value;
            }}
            {...rest}
         />

         {error && (
            <Error>
               <Icon
                  style={{ marginRight: 0 }}
                  name="alert-circle"
                  color="#c53030"
                  size={20}
               />
            </Error>
         )}
      </Container>
   );
};

export default forwardRef(Input);
