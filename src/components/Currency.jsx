import { Input } from "@chakra-ui/react";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

const defaultMaskOptions = {
  prefix: "Rp ",
  suffix: "",
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ",",
  allowDecimal: true,
  decimalSymbol: ".",
  decimalLimit: 5, // how many digits allowed after the decimal
  integerLimit: 20, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const CurrencyInput = ({ maskOptions, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });

  return (
    <Input
      borderRadius="10px"
      border="1px solid #E9ECEF"
      placeholder={`Pilih kategori wisata`}
      h={["42px", "42px", "42px", "50px"]}
      mask={currencyMask}
      {...inputProps}
      as={MaskedInput}
    />
  );
};

CurrencyInput.defaultProps = {
  inputMode: "numeric",
  maskOptions: {},
};

CurrencyInput.propTypes = {
  inputmode: PropTypes.string,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
  }),
};

export default CurrencyInput;
