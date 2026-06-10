import React from "react";
import ReactDOM from "react-dom/client";
import ActionPage from "./pages/ActionPage";
import { actNowContent } from "./pages/actNowData";

const transportAction = {
  id: "transport",
  member: "Janet (Yuheng Hou)",
  sdg: "SDG 13",
  action: "Walk, bike, or take public transport",
  image: "/images/sdg13/image7.jpg",
  imageCaption: "Source: ECO Reside — Environmental Benefits Of Public Transportation",
  explanation: actNowContent.actions[0].explanation,
  mechanism: actNowContent.actions[0].mechanism,
  example: actNowContent.actions[0].example,
  coBenefits: actNowContent.actions[0].coBenefits,
  offsetSolutions: actNowContent.actions[0].offsetSolutions,
  calculator: actNowContent.actions[0].calculator,
  references: [
    "Climate Change Tracker. (2024). China's Progress and Recent Impact. https://climatechangetracker.org/nations/greenhouse-gas-emissions/china/progress-and-recent-impact",
    "FasterCapital. (2025, April 9). Bike Environmental Impact: Biking vs. Public Transportation: Which Is Better for the Planet. https://fastercapital.com/content/Bike-Environmental-Impact--Biking-vs--Public-Transportation--Which-Is-Better-for-the-Planet.html",
    "Hodges, M. (2025, October 13). Eco-Friendly Commutes: Walking And Biking's Impact On Our Planet. SHUN WASTE: https://shunwaste.com/article/how-does-walking-or-riding-a-bike-affect-the-environment",
    "Nations, United. (n.d.). Actions for a healthy planet. United Nations: https://www.un.org/en/actnow/ten-actions",
    "TheGlobalEconomy. (2023). China: Coal Reserves. https://www.theglobaleconomy.com/China/coal_reserves/",
  ],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><ActionPage data={transportAction} /></React.StrictMode>,
);
