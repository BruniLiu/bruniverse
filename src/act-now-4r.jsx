import React from "react";
import ReactDOM from "react-dom/client";
import ActionPage from "./pages/ActionPage";
import { actNowContent } from "./pages/actNowData";

const sourceAction = actNowContent.actions.find(
  (item) => item.action === "Reduce, reuse, repair, recycle",
);

const fourRAction = {
  id: "4r",
  ...sourceAction,
  references: [
    "Britannica Editors. (2026, May 5). Carbon dioxide. Retrieved from Britannica: https://www.britannica.com/science/carbon-dioxide",
    "Scells, H., Zhuang, S., & Zuccon, G. (2022). Reduce, Reuse, Recycle: Green Information Retrieval Research. Proceedings of the 45th ACM SIGIR Conference. https://doi.org/10.1145/3477495.3531738",
    "United Nations. (n.d.). Actions for a healthy planet. Retrieved from: https://un.org/en/actnow/ten-actions",
    "United Nations Development Programme. (n.d.). A circular economy aligns environmental protection with long-term economic and social well-being. Retrieved from: https://www.undp.org/chemicals-waste/our-work/circular-economy",
  ],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><ActionPage data={fourRAction} /></React.StrictMode>,
);
