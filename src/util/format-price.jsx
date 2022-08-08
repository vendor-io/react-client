export const formatPrice = (value) => {
   if (typeof value === 'undefined') {
      return '0.00';
   }
   const stringPrice = value.toString();
   if (stringPrice.length === 1) {
      return `0.0${stringPrice}`;
   } else if (stringPrice.length === 2) {
      return `0.${stringPrice.substring(stringPrice.length - 2, stringPrice.length)}`;
   }
   return `${stringPrice.substring(0, stringPrice.length - 2)}.${stringPrice.substring(
      stringPrice.length - 2,
      stringPrice.length
   )}`;
};
