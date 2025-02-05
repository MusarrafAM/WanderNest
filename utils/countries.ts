import countries from "world-countries";

// getting countries from the world-countries library and create a organized variable with relevant data and export it.
export const formattedCountries = countries.map((item) => ({
  code: item.cca2,
  name: item.name.common,
  flag: item.flag,
  location: item.latlng, // this will be used to find country in the map.
  region: item.region,
}));

export const findCountryByCode = (code: string) =>
  formattedCountries.find((item) => item.code === code);
