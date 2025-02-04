"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type btnSize = "default" | "lg" | "sm"; // we made this, so the shadcn accept this sm size. normally shadcn won't accept sm for the button.

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

// below default values => { className = "", text = "submit" }
export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className={`capitalize ${className}`} size={size}>
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
