import { MainButton } from "@features/buttons";
import { useScrollPosition } from "@features/hooks";
import { Explain, LPHeader } from "@features/ui/lp";

export default function LandingPage() {
  const { y } = useScrollPosition();

  return (
    <>
      <LPHeader position={y > 10} />
      <Explain />

      <MainButton width={128} title="Button" color="white" />
    </>
  );
}
