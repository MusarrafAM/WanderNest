import PropertyCard from "../card/PropertyCard";
import type { PropertyCardProps } from "@/utils/types";

function PropertiesList({ properties }: { properties: PropertyCardProps[] }) {
  return (
    //! We used  sm, lg, xl  and we don't use md here
    <section className="mt-4 gap-8 grid sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4">
      {properties.map((property) => {
        return <PropertyCard key={property.id} property={property} />;
      })}
    </section>
  );
}
export default PropertiesList;
