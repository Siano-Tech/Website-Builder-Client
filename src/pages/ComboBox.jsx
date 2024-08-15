import Multiselect from 'multiselect-react-dropdown';

export const ComboBox = ({data, displayKey, placeholder, onSelected}) => {
    return(
        <Multiselect
            displayValue={displayKey}
            options={data}
            onSelect={onSelected}
            placeholder={placeholder ?? 'Select'}
            showCheckbox
        />
    )
}