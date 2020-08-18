/// <reference types="react" />
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';
export interface AutocompleteProps {
    array: string[];
    placeholder?: string;
    label?: string;
    textInputProps?: TextInputProps;
    onValueSelected?: (value: string) => void;
    onError?: () => void;
}
export default function Autocomplete({ array, placeholder, label, textInputProps, onValueSelected, onError }: AutocompleteProps): JSX.Element;
