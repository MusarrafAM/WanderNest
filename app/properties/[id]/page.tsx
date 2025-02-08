import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import Amenities from "@/components/properties/Amenities";
import BookingCalendar from "@/components/properties/booking/BookingCalendar";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import PropertyMap from "@/components/properties/PropertyMap";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPropertyDetails } from "@/utils/actions";
import dynamic from "next/dynamic";

import { redirect } from "next/navigation";

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect("/");
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

  // one rule in the map documentation is, where we render the map component has to be a client component.
  // so if we just render the PropertyMap since its a server component it won't work
  // Here we can utilize the lazy loading. which the component won't render in server only if it visible to user.
  // to use lazy loading we can use dynamic in next. and its callback is the import of the component.
  const DynamicMap = dynamic(() => import("@/components/properties/PropertyMap"), {
    ssr: false, // setting server side rendering to false.
    loading: () => <Skeleton className="h-[400px] w-full" />, // we can set loading for the component like this.
  });

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold ">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={property.name} propertyId={property.id} />
          {/* below directive comment to fix the ts error warning of - cannot be used as a JSX component */}
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      {/* 2 column setup */}
      {/* split into 12 col, in first div used 8 and second div has 4, both add upto 12 col */}
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            {/* below directive comment to fix the ts error warning of - cannot be used as a JSX component */}
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <BookingCalendar />
        </div>
      </section>
    </section>
  );
}
export default PropertyDetailsPage;
