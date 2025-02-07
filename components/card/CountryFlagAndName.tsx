import { findCountryByCode } from "@/utils/countries";
import Flag from "react-world-flags";

function CountryFlagAndName({ countryCode }: { countryCode: string }) {
  const validCountry = findCountryByCode(countryCode)!;
  // the reason for ! at the end of the above code is, ts will show error that this might be undefined.
  // this ! means to tell the ts i know for sure the value exist.
  // if country name is bigger than 20 we cut it to 20
  const countryName =
    validCountry.name.length > 20
      ? `${validCountry.name.substring(0, 20)}...`
      : validCountry.name;
  return (
    <span className="flex justify-between items-center gap-2 text-sm ">
      <Flag code={countryCode} style={{ width: 20, height: 20 }} /> {countryName}
    </span>
  );
}
export default CountryFlagAndName;
