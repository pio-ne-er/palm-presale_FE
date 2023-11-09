import { useScrollPosition } from "@features/hooks";
import { Explain, LPHeader } from "@features/ui/lp";

export default function LandingPage() {
  const { y } = useScrollPosition();

  return (
    <>
      <LPHeader position={y > 10} />
      <Explain />
      {/* <MainButton width={64} title="Button" color="white" small /> */}
    </>
  );
}
