import { styled } from "styled-components";

import { LPCard } from "@features/cards";
import { Landing_Page_Intet } from "utilities";

const ExplainMin = styled.div``;

export const Explain = () => {
  return (
    <ExplainMin>
      <LPCard
        url={Landing_Page_Intet[0].image}
        title={Landing_Page_Intet[0].title}
        description={Landing_Page_Intet[0].description}
      />
    </ExplainMin>
  );
};
