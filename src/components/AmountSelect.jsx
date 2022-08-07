import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
export const AmountSelect = (props) => {
   const { amount, handleAmountChange } = props;
   return (
      <FormControl fullWidth>
         <InputLabel id="product-amount-label">Amount</InputLabel>
         <Select
            labelId="product-amount-label"
            id="product-amount"
            value={amount}
            label="Amount"
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
