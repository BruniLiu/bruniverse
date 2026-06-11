import React from "react";
import ReactDOM from "react-dom/client";
import ActionPage from "./pages/ActionPage";
import { actNowContent } from "./pages/actNowData";

const sourceAction = actNowContent.actions.find(
  (item) => item.action === "Consider your travel",
);

const travelAction = {
  id: "travel",
  ...sourceAction,
  references: [
    "United Nations. (n.d.). Actions for a healthy planet. Retrieved from: https://un.org/en/actnow/ten-actions",
    "Intergovernmental Panel on Climate Change. (2023). Climate change 2023: Synthesis report. https://www.ipcc.ch/report/ar6/syr/",
    "Hanna Lazar. (n.d.). People at a railway station with luggage [Photograph]. Unsplash. https://unsplash.com/photos/SO5JaABqo2w",
  ],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><ActionPage data={travelAction} /></React.StrictMode>,
);
