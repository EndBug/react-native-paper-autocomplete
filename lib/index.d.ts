/// <reference types="react" />
export interface AutocompleteProps {
    array: string[];
    initialValue?: string;
    label?: string;
    onValueSelected?: (value: string) => void;
    onError?: () => void;
}
export default function Autocomplete({ array, initialValue, label, onValueSelected, onError }: AutocompleteProps): JSX.Element;
