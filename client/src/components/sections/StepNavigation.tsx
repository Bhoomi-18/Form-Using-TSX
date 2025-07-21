import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
};

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  isSubmitting,
}: Props) {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between mt-6">
      {currentStep > 0 && (
        <Button type="button" onClick={onBack} variant="outline">
          Back
        </Button>
      )}

      {isLastStep ? (
        <Button type="submit" variant="success" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      ) : (
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      )}
    </div>
  );
}