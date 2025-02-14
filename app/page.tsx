import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import LoadingCards from "@/components/card/LoadingCards";
import { Suspense } from "react";
import Footer from "@/components/footer/Footer";

// this is how we access the searchParams in server component.
function HomePage({ searchParams }: { searchParams: { category?: string; search?: string } }) {
  // console.log(searchParams);

  // if we fetch the properties in this page we won't be able to show skeleton loading.
  // thats why in here we fetch in component not page.
  return (
    <section>
      {/* since we don't need to show loading state for the entire home page, like we can just show the */}
      {/* CategoriesList without loading only need to show loading state for the PropertiesContainer */}
      {/* thats why we went with this suspense and fallback method for other pages we can just use loading.tsx */}
      <CategoriesList category={searchParams?.category} search={searchParams?.search} />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer category={searchParams?.category} search={searchParams?.search} />
        <Footer />
      </Suspense>
    </section>
  );
}
export default HomePage;
