"use client";
import { SignInButton, useAuth } from "@clerk/nextjs";
//! There are 2 useAuth from clerk, 1 is from @clerk/nextjs for client component. Another is from @clerk/nextjs/sever this si for server component.
import { Button } from "@/components/ui/button";
import { useProperty } from "@/utils/store";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { createBookingAction } from "@/utils/actions";

function ConfirmBooking() {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  if (!userId)
    return (
      <SignInButton mode="modal">
        <Button type="button" className="w-full">
          Sign In to Complete Booking
        </Button>
      </SignInButton>
    );

  // !We are not passing the price from client. We will calculate the price on the server.
  //! If we pass the price from the client and use it on the server. anyone can edit the price and buy items with 0.

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });

  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text="Reserve" className="w-full" />
      </FormContainer>
    </section>
  );
}
export default ConfirmBooking;
