"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  // need to pass the action and initial value to useFormState,it returns the state, formAction(which we need to pass in the form action)
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  //! whenever form submitted and the state changes we show a toast for it.
  //! This handles the toast in al forms.
  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
