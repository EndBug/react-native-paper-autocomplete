/// <reference types="react" />
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';
import { FormikProps } from 'formik';
export interface InputProps extends Partial<TextInputProps> {
    label?: undefined;
    value?: undefined;
    error?: undefined;
    onChangeText?: undefined;
    onFocus?: undefined;
    onBlur?: undefined;
}
export interface AutocompleteProps {
    array: string[];
    placeholder?: string;
    label?: string;
    textInputProps?: InputProps;
    onValueSelected?: (value: string) => void;
    onError?: () => void;
}
export declare function Autocomplete({ array, placeholder, label, textInputProps, onValueSelected, onError }: AutocompleteProps): JSX.Element;
export interface AutocompleteFormikProps {
    array: string[];
    formikProps: FormikProps<any>;
    id: string;
    label?: string;
    parser?: <T>(value: T) => T;
    textInputProps?: InputProps;
}
export declare function AutocompleteFormik({ array, formikProps, id, label, parser, textInputProps }: AutocompleteFormikProps): JSX.Element;
