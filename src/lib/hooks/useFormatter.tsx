import {useMemo} from "react";

interface IFormatter {
  formatter: Intl.NumberFormat;
}

const useFormatter = (notation?: "compact" | "standard"): IFormatter => {
  const formatter = useMemo((): Intl.NumberFormat => Intl.NumberFormat("en", {notation}), [notation]);

  return {formatter};
};

export default useFormatter;
