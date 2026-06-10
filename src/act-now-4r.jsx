import React from "react";
import ReactDOM from "react-dom/client";
import ActionPage from "./pages/ActionPage";
import { actNowContent } from "./pages/actNowData";

const fourRAction = {
  id: "4r",
  member: "Janet (Yuheng Hou)",
  sdg: "SDG 4",
  action: "Reduce, reuse, repair, recycle",
  image: "/images/sdg4/image9.png",
  imageCaption: "Source: Visual China Group — Carbon footprint distribution",
  explanation: actNowContent.actions[1].explanation,
  mechanism: actNowContent.actions[1].mechanism,
  example: actNowContent.actions[1].example,
  coBenefits: actNowContent.actions[1].coBenefits,
  offsetSolutions: actNowContent.actions[1].offsetSolutions,
  calculator: actNowContent.actions[1].calculator,
  references: [
    "Britannica Editors. (2026, May 5). Carbon dioxide. Retrieved from Britannica: https://www.britannica.com/science/carbon-dioxide",
    "Green.Earth. (n.d.). Understanding carbon footprints: impact, benefits, and reporting. https://www.green.earth/carbonfootprints",
    "Scells, H., Zhuang, S., & Zuccon, G. (2022). Reduce, Reuse, Recycle: Green Information Retrieval Research. Proceedings of the 45th ACM SIGIR Conference. https://doi.org/10.1145/3477495.3531738",
    "United Nations. (n.d.). Actions for a healthy planet. Retrieved from: https://un.org/en/actnow/ten-actions",
    "United Nations Development Programme. (n.d.). A circular economy aligns environmental protection with long-term economic and social well-being. Retrieved from: https://www.undp.org/chemicals-waste/our-work/circular-economy",
  ],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><ActionPage data={fourRAction} /></React.StrictMode>,
);
