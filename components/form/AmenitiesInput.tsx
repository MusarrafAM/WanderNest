"use client";
import { useState } from "react";
import { amenities, Amenity, conservativeAmenities } from "@/utils/amenities";
import { Checkbox } from "@/components/ui/checkbox";

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
  // we need to create this conservativeAmenitiesWithIcons, since we don't fetch the icons from the db.
  // We need to create a new object with the amenities and icons. when try to update with previous values
  const conservativeAmenitiesWithIcons = defaultValue?.map(({ name, selected }) => {
    return {
      name,
      selected,
      icon: conservativeAmenities.find((amenity) => amenity.name === name)!.icon,
    };
  });

  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
    conservativeAmenitiesWithIcons || conservativeAmenities
    //! if want to be funny use amenities OR want to be professional use conservativeAmenities, just change above oen palace is enough
  );

  //! we save all the amenities in db with boole values
  // when clicked that amenity will toggle to true from false initially.
  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected }; // change the selected to opposite. and spread the rest of the values.
        }
        return a;
      });
    });
  };

  return (
    <section>
      {/* A hidden input is used to capture the selected amenities' values for form submission in the parent component. */}
      {/* HTML form elements cannot directly handle complex objects like arrays or nested structures. */}
      {/* To store an array as form data, we stringify it before assigning it to the input value. */}
      {/* This converts the array into a valid JSON string that can be sent as part of the form submission. */}

      <input type="hidden" name="amenities" value={JSON.stringify(selectedAmenities)} />
      <div className="grid grid-cols-2 gap-4">
        {selectedAmenities.map((amenity) => (
          <div key={amenity.name} className="flex items-center space-x-2">
            <Checkbox
              id={amenity.name}
              checked={amenity.selected}
              onCheckedChange={() => handleChange(amenity)}
            />
            <label
              htmlFor={amenity.name}
              className="text-sm font-medium leading-none capitalize flex gap-x-2 items-center"
            >
              {amenity.name}
              <amenity.icon className="w-4 h-4" />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
export default AmenitiesInput;
