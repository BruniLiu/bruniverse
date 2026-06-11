import React from "react";
import ReactDOM from "react-dom/client";
import ActionPage from "./pages/ActionPage";
import { actNowContent } from "./pages/actNowData";

const sourceAction = actNowContent.actions.find(
  (item) => item.action === "Eat more vegetables",
);

const vegetablesAction = {
  id: "vegetables",
  ...sourceAction,
  references: [
    "United Nations. (n.d.). Actions for a healthy planet. Retrieved from: https://un.org/en/actnow/ten-actions",
    "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987-992. https://doi.org/10.1126/science.aaq0216",
    "Jana Ohajdova. (n.d.). Green vegetables in a bowl [Photograph]. Unsplash. https://unsplash.com/photos/9nzQserYaN8",
  ],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><ActionPage data={vegetablesAction} /></React.StrictMode>,
);
