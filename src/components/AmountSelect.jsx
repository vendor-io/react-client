import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ArrowDropDownIcon } from '@mui/icons-material/ArrowDropDown';
export const AmountSelect = (props) => {
   const { amount, readOnly, handleAmountChange } = props;
   return (
      <FormControl fullWidth>
         <InputLabel id="product-amount-label">Amount</InputLabel>
         <Select
            labelId="product-amount-label"
            id="product-amount"
            value={amount}
            label="Amount"
            disabled={readOnly}
            IconComponent={readOnly ? null : ArrowDropDownIcon}
            onChange={handleAmountChange}>
            {Array.from({ length: 10 }).map((_item, index) => (
               <MenuItem key={index} value={index + 1}>
                  {index + 1}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
};
