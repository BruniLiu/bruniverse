const unfcccProcessStepFiles = [
  "01-intro-first.png",
  "02-home-00.png",
  "03-home-03.png",
  "04-home-08-1.png",
  "05-home-10.png",
  "06-transport-27.png",
  "07-transport-20.png",
  "08-transport-30-2.png",
  "09-lifestyle-47-1.png",
  "10-lifestyle-44-1.png",
  "11-lifestyle-40-1.png",
  "12-diet-50.png",
  "13-intro-last.png",
];

const makeUnfcccCalculatorEvidence = ({
  member,
  totalTonnes,
  totalKg,
  resultImage,
  sectors,
  assumptions,
}) => ({
  title: `${member} UNFCCC Lifestyle Calculator result`,
  sourceLabel: "Lifestyle Calculator by Doconomy and the UNFCCC Secretariat",
  sourceUrl: "https://lifestylecalculator.com/unfccc",
  methodologyUrl: "https://lifestylecalculator.com/files/MethodLifestyleCalculator.pdf",
  resultImage,
  totalTonnes,
  totalKg,
  profile: "Climate expert",
  generatedAt: "2026-06-13",
  note:
    `This official calculator run is ${member}'s individual carbon-footprint evidence for the Act Now section. It models a China-based student lifestyle and connects the selected action with a visible CO2e result (UN Climate Change & Doconomy, n.d.).`,
  sourceNote:
    "Calculator source: Lifestyle Calculator by Doconomy and the UNFCCC Secretariat. The member-specific process screenshots document each calculator step, while the final result screenshot and listed input assumptions identify the individual calculation.",
  references: [
    "UN Climate Change & Doconomy. (n.d.). Lifestyle Calculator by Doconomy and the UNFCCC Secretariat. https://lifestylecalculator.com/unfccc",
    "UN Climate Change & Doconomy. (2026). Method Lifestyle Calculator. https://lifestylecalculator.com/files/MethodLifestyleCalculator.pdf",
  ],
  sectors,
  assumptions,
});

const makeUnfcccScreenshots = (memberSlug, resultImage) => [
  ...unfcccProcessStepFiles.map((file) => `/images/act-now/un-calculator/member-process/${memberSlug}/${file}`),
  resultImage,
];

const unfcccCalculatorEvidenceByMember = {
  janet: makeUnfcccCalculatorEvidence({
    member: "Janet (Hou Yuheng)",
    totalTonnes: "2.69",
    totalKg: "2694.60",
    resultImage: "/images/act-now/un-calculator/member-results/janet-unfccc-result.png",
    sectors: [
      { label: "Transport", value: "0.57t" },
      { label: "Home", value: "1.00t" },
      { label: "Shopping", value: "0.38t" },
      { label: "Food", value: "0.74t" },
    ],
    assumptions: [
      "Country of residence: China",
      "Household renewable electricity: I do not know",
      "Primary heating: district heating; cooking gas: yes",
      "Car ownership: no",
      "Flights in last 12 months: 0 short, 0 medium, 0 long",
      "Public transport: 90 minutes per day",
      "Annual lifestyle spending: furniture 0, sports/cultural events 400, beauty/hairdresser/spa 200",
      "Appliances bought in past 12 months: 0 large, 0 medium, 0 small",
      "Past 6 months clothing: 3 new clothes, 1 second-hand clothes, 1 new pair of shoes",
      "Diet: I do not eat red meat",
    ],
  }),
  irene: makeUnfcccCalculatorEvidence({
    member: "Irene (Han Yutong)",
    totalTonnes: "2.13",
    totalKg: "2128.64",
    resultImage: "/images/act-now/un-calculator/member-results/irene-unfccc-result.png",
    sectors: [
      { label: "Transport", value: "0.15t" },
      { label: "Home", value: "1.00t" },
      { label: "Shopping", value: "0.25t" },
      { label: "Food", value: "0.73t" },
    ],
    assumptions: [
      "Country of residence: China",
      "Household renewable electricity: I do not know",
      "Primary heating: district heating; cooking gas: yes",
      "Car ownership: no",
      "Flights in last 12 months: 0 short, 0 medium, 0 long",
      "Public transport: 20 minutes per day",
      "Annual lifestyle spending: furniture 0, sports/cultural events 300, beauty/hairdresser/spa 100",
      "Appliances bought in past 12 months: 0 large, 0 medium, 0 small",
      "Past 6 months clothing: 2 new clothes, 1 second-hand clothes, 0 new shoes",
      "Diet: vegetarian",
    ],
  }),
  bruni: makeUnfcccCalculatorEvidence({
    member: "Bruni (Liu Xiangyi)",
    totalTonnes: "4.65",
    totalKg: "4646.02",
    resultImage: "/images/act-now/un-calculator/member-results/bruni-unfccc-result.png",
    sectors: [
      { label: "Transport", value: "2.26t" },
      { label: "Home", value: "1.00t" },
      { label: "Shopping", value: "0.65t" },
      { label: "Food", value: "0.74t" },
    ],
    assumptions: [
      "Country of residence: China",
      "Household renewable electricity: I do not know",
      "Primary heating: district heating; cooking gas: yes",
      "Car ownership: no",
      "Flights in last 12 months: 2 short, 1 medium, 0 long",
      "Public transport: 45 minutes per day",
      "Annual lifestyle spending: furniture 0, sports/cultural events 800, beauty/hairdresser/spa 300",
      "Appliances bought in past 12 months: 0 large, 0 medium, 0 small",
      "Past 6 months clothing: 4 new clothes, 0 second-hand clothes, 1 new pair of shoes",
      "Diet: I do not eat red meat",
    ],
  }),
  elvira: makeUnfcccCalculatorEvidence({
    member: "Elvira (Zheng Xinyao)",
    totalTonnes: "2.09",
    totalKg: "2085.29",
    resultImage: "/images/act-now/un-calculator/member-results/elvira-unfccc-result.png",
    sectors: [
      { label: "Transport", value: "0.21t" },
      { label: "Home", value: "1.00t" },
      { label: "Shopping", value: "0.13t" },
      { label: "Food", value: "0.74t" },
    ],
    assumptions: [
      "Country of residence: China",
      "Household renewable electricity: I do not know",
      "Primary heating: district heating; cooking gas: yes",
      "Car ownership: no",
      "Flights in last 12 months: 0 short, 0 medium, 0 long",
      "Public transport: 30 minutes per day",
      "Annual lifestyle spending: furniture 0, sports/cultural events 150, beauty/hairdresser/spa 80",
      "Appliances bought in past 12 months: 0 large, 0 medium, 0 small",
      "Past 6 months clothing: 1 new clothes, 3 second-hand clothes, 1 second-hand pair of shoes",
      "Diet: I do not eat red meat",
    ],
  }),
};

const actionReferenceBank = {
  unActNow:
    "United Nations. (n.d.). Actions for a healthy planet. https://www.un.org/en/actnow/ten-actions",
  ipcc2023:
    "Intergovernmental Panel on Climate Change. (2023). Climate Change 2023: Synthesis report. https://www.ipcc.ch/report/ar6/syr/",
  pooreNemecek:
    "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987-992. https://doi.org/10.1126/science.aaq0216",
  unepWaste:
    "United Nations Environment Programme. (2024). Global Waste Management Outlook 2024: Beyond an age of waste. https://www.unep.org/resources/global-waste-management-outlook-2024",
  undpCircular:
    "United Nations Development Programme. (n.d.). Circular economy. https://www.undp.org/chemicals-waste/our-work/circular-economy",
  unfcccCalculator:
    "UN Climate Change & Doconomy. (n.d.). Lifestyle Calculator by Doconomy and the UNFCCC Secretariat. https://lifestylecalculator.com/unfccc",
  unfcccMethod:
    "UN Climate Change & Doconomy. (2026). Method Lifestyle Calculator. https://lifestylecalculator.com/files/MethodLifestyleCalculator.pdf",
};

export const actNowContent = {
  title: "SDG Act Now",
  subtitle:
    "To preserve a liveable climate, the average emissions per person per year will need to drop to around 2 tons of CO2e by 2030. The UN's SDGs provide guidance to meet this target, starting with the Ten Actions to help tackle the climate crisis.",
  carbonFootprint:
    "As Britannica Editors (2026) note, carbon dioxide is the most significant greenhouse gas linked to global warming. A carbon footprint refers to the total greenhouse gases linked to an individual, product, or activity, commonly expressed as CO2e so different greenhouse gases can be compared in one unit. It includes direct emissions from choices such as driving and energy use, as well as indirect emissions embedded in food, goods, services, and travel. The United Nations Act Now guidance connects this measurement with practical daily actions such as travelling more carefully, eating more plant-rich meals, and reducing waste (United Nations, n.d.).",
  actions: [
    {
      member: "Janet (Hou Yuheng)",
      sdg: "SDG 13",
      action: "Walk, bike, or take public transport",
      image: "/images/sdg13/image7.jpg",
      imageCaption: "Source: ECO Reside - Environmental Benefits Of Public Transportation",
      explanation:
        "The UN Act Now action is Walk, bike, or take public transport. Its purpose is to reduce emissions from routine mobility by replacing private-car trips with walking, cycling, buses, subways, and trains whenever these options are practical. The United Nations notes that living car-free can reduce a person's footprint by up to 2 tons of CO2e per year compared with a car-based lifestyle (United Nations, n.d.). For Janet, this action is realistic because many student trips are short, repeated, and located near existing public-transport routes.",
      mechanism:
        "The mechanism is mode shift: walking and cycling avoid tailpipe emissions for short trips, while buses, subways, and trains spread energy use across many passengers. Demand-side changes such as avoiding unnecessary car travel and shifting to lower-carbon mobility are recognised climate mitigation measures because they reduce fossil-fuel combustion as well as congestion-related energy waste (Intergovernmental Panel on Climate Change, 2023). The action also changes habit formation: once a route becomes familiar by bike, subway, or rail, the lower-carbon option becomes easier to repeat.",
      example:
        "Janet can apply the action through a weekly mobility rule: bike or walk for nearby errands, use the underground for routine city trips, and choose rail for longer regional journeys when the route is available. The action is time-bound because the evidence records show three completed low-carbon trips between 2026.06.01 and 2026.06.03. The expected impact is a smaller transport footprint, lower travel cost, more physical activity, and a clearer personal link between SDG 13 and everyday choices.",
      calculator: {
        description:
          "Janet's UN Climate Change and Doconomy Lifestyle Calculator result is used as individual visual evidence. The action-specific comparison below then models how shifting daily mobility from private-car use toward walking, cycling, and public transport reduces per-capita emissions.",
        sourceLabel: "Lifestyle Calculator by Doconomy and the UNFCCC Secretariat",
        unfcccEvidence: unfcccCalculatorEvidenceByMember.janet,
        screenshots: makeUnfcccScreenshots("janet", unfcccCalculatorEvidenceByMember.janet.resultImage),
        before: {
          total: "22.96",
          perCapita: "5.74",
          details:
            "Based on a four-member household, the per capita annual carbon emission is approximately 5.74 tons of CO2e. Although this figure is lower than the average level of Chinese households, it is still far higher than the per capita target of 2 tons of CO2e by 2030 proposed by the United Nations, reaching nearly three times the target value. From the perspective of emission structure, food consumption accounts for the largest proportion, while transportation accounts for 26%, which mainly comes from the use of private cars.",
        },
        after: {
          total: "19.05",
          perCapita: "4.76",
          details:
            "After the implementation of the initiative, the household annual carbon emission reaches 19.05 tons of CO2e, with a per capita emission of 4.76 tons - a reduction of approximately one ton compared to before, demonstrating significant results. This transportation emission reduction measure proves to be an effective solution.",
        },
      },
      coBenefits: [
        {
          title: "Ease Traffic Congestion",
          desc: "Reducing the use of private vehicles can lower vehicle density on urban roads, effectively alleviate commuting congestion during peak hours, and improve the operational efficiency of transportation systems.",
        },
        {
          title: "Improve Physical and Mental Health",
          desc: "Regularly walking or biking for a certain distance every day can effectively enhance cardiovascular function and reduce the risk of diseases such as obesity and hypertension. Moreover, increasing the duration of outdoor activities can alleviate daily stress and improve mental health.",
        },
        {
          title: "Reduce Economic Expenditure",
          desc: "Opting for public transport, walking, or biking can eliminate multiple expenditures associated with private car use, including fuel costs, parking fees, and insurance, thereby reducing living burdens.",
        },
        {
          title: "Optimize the Ecological Environment",
          desc: "Mitigation of traffic congestion and reduction of private vehicle usage can further lower urban noise pollution and exhaust emission pollution, thereby improving both residents' living quality and urban air quality (Hodges, 2025).",
        },
        {
          title: "Ensure National Energy Security",
          desc: "As private car usage decreases, fuel consumption also declines accordingly. This can reduce the country's dependence on petroleum imports, mitigate the geopolitical risks associated with energy supply, while creating greater space for energy structure transition.",
        },
      ],
      reductionPathway:
        "Janet's three records are treated as behavioural carbon-reduction solutions rather than paid carbon-credit offsets. Together they show avoidance of private-car travel for short trips, substitution with underground travel for routine city movement, and rail use for longer journeys. This creates a practical pathway from a high-emission mobility habit toward repeated lower-carbon transport choices.",
      offsetSolutions: [
        {
          title: "Bike for short-distance trips",
          desc: "The file name bike points to a direct low-carbon mobility choice. For nearby errands, campus travel, or short journeys between daily destinations, using a bike can replace taxi or private-car use while keeping the action simple and repeatable.",
          evidence: "Evidence photo taken by Janet on 2026.06.01, showing a short-distance bike trip completed without using a private car.",
          evidenceImage: "/images/act-now/evidence/bike.jpg",
          credibility:
            "This is credible because it documents a completed short-distance mobility choice, not a stock image. The photo matches the selected UN action and shows a behaviour that can be repeated for campus errands and nearby study trips.",
        },
        {
          title: "Underground instead of private-car travel",
          desc: "The file name underground suggests an urban public-transport choice. Taking the subway or underground for routine city trips can reduce reliance on private cars, especially for routes where metro travel is already convenient and predictable.",
          evidence: "Evidence photo taken by Janet on 2026.06.02, showing an underground or public-transport trip used instead of private-car travel.",
          evidenceImage: "/images/act-now/evidence/underground.jpg",
          credibility:
            "The image is tied to an actual public-transport route, so the evidence is directly connected to the claimed action. It supports the offset comparison because replacing private-car kilometres with metro travel is one of the clearest transport substitutions in a city.",
        },
        {
          title: "Railway for longer public-transport trips",
          desc: "The railway photo extends Janet's action from daily commuting to longer-distance public transport. When a train or high-speed rail route is practical, choosing rail can reduce reliance on private cars or short flights while keeping the journey efficient.",
          evidence: "Evidence photo taken by Janet on 2026.06.03, showing a railway travel record used as a lower-carbon transport choice.",
          evidenceImage: "/images/act-now/evidence/railway.jpg",
          credibility:
            "This record broadens the action beyond one local trip. It shows that the same low-carbon logic can apply to longer journeys, which makes the plan more personal and realistic than a single one-off photograph.",
        },
      ],
      references: [actionReferenceBank.unActNow, actionReferenceBank.ipcc2023],
    },
    {
      member: "Irene (Han Yutong)",
      sdg: "SDG 2",
      action: "Eat more vegetables",
      image: "/images/act-now/eat-more-vegetables.jpg",
      imageCaption: "Photo: Jana Ohajdova on Unsplash - green vegetables and plant-based food",
      explanation:
        "The UN Act Now action is Eat more vegetables. Its purpose is to reduce food-related emissions while improving daily nutrition through more vegetables, fruits, whole grains, legumes, nuts, and seeds (United Nations, n.d.). For a student household, the goal is not to demand a perfect vegan lifestyle, but to replace several high-emission meals each week with balanced plant-forward meals. This action connects SDG 2's concern for sustainable food systems with SDG 13's focus on climate action.",
      mechanism:
        "Diet changes lower emissions by reducing demand for foods with high land, feed, energy, methane, and supply-chain footprints. A practical mechanism is substitution: replace meat-heavy meals with vegetables, legumes, tofu, eggs, whole grains, and seasonal local produce. Poore and Nemecek (2018) show that food's environmental impacts vary greatly across products, which means consumer choices can meaningfully reduce the footprint of daily meals. For Irene, the most credible approach is small but repeated substitution rather than a dramatic claim that would be hard to sustain.",
      example:
        "Irene can begin with three concrete habits: choose a vegetable-based lunch at least three times per week, use tofu or beans as the main protein in simple dormitory meals, and plan snacks or meals before buying food. The evidence records from 2026.06.03 to 2026.06.05 show a vegetable meal, a plant-based snack, and a short meal plan. This makes the action visible, measurable, and easier to continue without requiring expensive ingredients.",
      calculator: {
        description:
          "Irene's UN Climate Change and Doconomy Lifestyle Calculator result is used as individual visual evidence. The representative estimate compares a meat-heavy baseline with a more plant-forward diet while keeping other lifestyle categories stable.",
        sourceLabel: "Lifestyle Calculator by Doconomy and the UNFCCC Secretariat",
        unfcccEvidence: unfcccCalculatorEvidenceByMember.irene,
        screenshots: makeUnfcccScreenshots("irene", unfcccCalculatorEvidenceByMember.irene.resultImage),
        before: {
          total: "41.12",
          perCapita: "8.22",
          details:
            "Before the action, the reference household's annual per-capita footprint is estimated at 8.22 tons CO2e. Food is one of the largest lifestyle categories, so meat-heavy meals create a clear opportunity for reduction.",
        },
        after: {
          total: "33.60",
          perCapita: "6.72",
          details:
            "After replacing several meat-heavy meals with vegetable-based meals each week, the per-capita footprint falls to 6.72 tons CO2e. The action does not reach the 2-ton target alone, but it creates a measurable and repeatable reduction.",
        },
      },
      coBenefits: [
        {
          title: "Healthier Daily Diet",
          desc: "Eating more vegetables, legumes, fruits, and whole grains can improve dietary diversity and help students build healthier long-term habits.",
        },
        {
          title: "Lower Food-System Pressure",
          desc: "Plant-forward meals reduce demand for resource-intensive food production, lowering pressure on land, water, feed, and energy systems.",
        },
        {
          title: "Budget-Friendly Choices",
          desc: "Vegetables, beans, tofu, grains, and seasonal produce can be cheaper than frequent meat-based meals, which makes the action realistic for students.",
        },
        {
          title: "Food Waste Awareness",
          desc: "Meal planning helps vegetables get used before they spoil, linking diet change with waste reduction and responsible consumption.",
        },
        {
          title: "Campus Influence",
          desc: "Visible food choices can encourage friends and classmates to try lower-carbon meals without turning sustainability into a slogan.",
        },
      ],
      reductionPathway:
        "Irene's three records are treated as food-related carbon-reduction solutions. The strategy is not to claim that one snack or one meal offsets an entire footprint, but to show a repeatable pathway: add more vegetables, replace some highly processed snacks with plant-based options, and plan meals before purchasing food. This makes the action measurable, affordable, and realistic in a dormitory setting.",
      offsetSolutions: [
        {
          title: "Eat vegetables",
          desc: "The file name eat vegetables gives the action very directly: choose a vegetable-based meal and make vegetables a visible part of daily diet choices. For a student, this can begin with replacing some meat-heavy lunches with affordable vegetable dishes.",
          evidence: "Evidence photo taken by Irene on 2026.06.03, showing a vegetable-based meal used as part of a plant-forward daily diet.",
          evidenceImage: "/images/act-now/evidence/eat-vegetables.jpg",
          credibility:
            "The photo directly matches the selected action because it shows a completed vegetable-based meal. It is credible as a behavioural record because it documents a real food choice Irene can repeat on campus.",
        },
        {
          title: "Choose plant-based dormitory snacks",
          desc: "The dates photo supports the same Act Now direction without pretending to be a full vegetable meal. In a dormitory setting, choosing fruit or other plant-based snacks can replace highly processed snacks and make plant-forward eating easier to practise between meals.",
          evidence: "Evidence photo taken by Irene on 2026.06.04, showing dried dates as a plant-based dormitory snack chosen instead of highly processed snacks.",
          evidenceImage: "/images/act-now/evidence/irene-dates-snack.jpg",
          credibility:
            "This evidence is intentionally framed as a plant-based snack rather than as a full vegetable meal. That makes the claim more credible: it supports the wider plant-forward action while staying honest about what the photo actually shows.",
        },
        {
          title: "Plan three plant-forward meals",
          desc: "The meal-plan photo turns the action into a time-bound routine rather than a single food choice. Writing meals in advance helps Irene include vegetables, eggs, rice, yoghurt, salad, and fruit across several days while reducing impulsive meat-heavy or highly processed options.",
          evidence: "Evidence photo taken by Irene on 2026.06.05, showing a handwritten three-day plant-forward meal plan prepared in the dormitory.",
          evidenceImage: "/images/act-now/evidence/irene-meal-plan-web.jpg",
          credibility:
            "The meal plan strengthens the action because it shows implementation before consumption. A dated plan is useful evidence for this rubric because it connects intention, timing, and repeated meal choices.",
        },
      ],
      references: [actionReferenceBank.unActNow, actionReferenceBank.pooreNemecek, actionReferenceBank.ipcc2023],
    },
    {
      member: "Bruni (Liu Xiangyi)",
      sdg: "SDG 16",
      action: "Consider your travel",
      image: "/images/act-now/consider-your-travel.jpg",
      imageCaption: "Photo: Hanna Lazar on Unsplash - railway travel and luggage",
      explanation:
        "The UN Act Now action is Consider your travel. Its purpose is to make occasional travel decisions more deliberate before choosing the highest-emission option. The United Nations encourages people to fly less, use virtual meetings when possible, travel by train for shorter distances, and choose nearby destinations when they can (United Nations, n.d.). For Bruni, the action is not to deny that some research or study travel is necessary, but to reduce avoidable journeys and select lower-carbon options when the purpose of the trip allows it.",
      mechanism:
        "Travel planning lowers emissions through avoidance, substitution, and efficiency. Avoidance means using online participation when physical presence is unnecessary; substitution means choosing rail or public transport for suitable routes; efficiency means combining several tasks into one journey. The IPCC identifies demand-side measures, including changes in transport behaviour, as part of climate mitigation because they reduce energy demand and fossil-fuel combustion (Intergovernmental Panel on Climate Change, 2023). For a research student, the most defensible version of this action is to document the travel decision itself: why the trip was needed, whether an online option existed, and what lower-carbon choice was selected.",
      example:
        "Bruni's implementation can start with a travel checklist before each long-distance trip: Is this trip necessary? Can the meeting be online? Is high-speed rail available? Can several tasks be combined into one journey? The evidence includes an online research meeting record, a necessary flight record with a small green-flying choice, and a high-speed rail ticket record. Together they show that the action is not a slogan; it is a decision process applied across different travel situations.",
      calculator: {
        description:
          "Bruni's UN Climate Change and Doconomy Lifestyle Calculator result is used as individual visual evidence. The representative estimate compares frequent long-distance travel with a lower-travel scenario that reduces avoidable flights and combines trips where possible.",
        sourceLabel: "Lifestyle Calculator by Doconomy and the UNFCCC Secretariat",
        unfcccEvidence: unfcccCalculatorEvidenceByMember.bruni,
        screenshots: makeUnfcccScreenshots("bruni", unfcccCalculatorEvidenceByMember.bruni.resultImage),
        before: {
          total: "22.96",
          perCapita: "5.74",
          details:
            "Before the action, the reference household's annual per-capita footprint is estimated at 5.74 tons CO2e. Transport is a major contributor, and occasional long-distance travel can raise the total quickly.",
        },
        after: {
          total: "17.36",
          perCapita: "4.34",
          details:
            "After reducing avoidable flights, choosing rail for shorter trips, and combining travel purposes, the per-capita footprint falls to 4.34 tons CO2e. The result shows that occasional travel choices can have a large effect.",
        },
      },
      coBenefits: [
        {
          title: "Lower Travel Costs",
          desc: "Combining trips and avoiding unnecessary travel can reduce ticket, accommodation, and local transport expenses.",
        },
        {
          title: "Better Time Management",
          desc: "Online meetings and planned routes reduce wasted travel time and make study or work schedules more stable.",
        },
        {
          title: "Less Travel Fatigue",
          desc: "Fewer rushed journeys can reduce physical stress and support better sleep, concentration, and mental well-being.",
        },
        {
          title: "Support Local Tourism",
          desc: "Choosing nearby destinations can shift spending toward local communities while reducing long-distance emissions.",
        },
        {
          title: "Stronger Climate Literacy",
          desc: "Comparing flight, rail, coach, and online options helps students understand the carbon consequences of everyday decisions.",
        },
      ],
      reductionPathway:
        "Bruni's three records are treated as travel-decision carbon-reduction solutions. The pathway is avoidance first, substitution second, and efficiency third: hold online meetings when travel is unnecessary, choose rail for suitable regional routes, and make smaller green-flying choices when a flight cannot be avoided. This framing keeps the claim honest while still showing completed action.",
      offsetSolutions: [
        {
          title: "Hold research meetings online when travel is unnecessary",
          desc: "The online meeting preparation photo connects Bruni's travel action with research work. When a meeting can be handled remotely, online participation avoids an extra trip while still allowing collaboration, discussion, and academic progress.",
          evidence: "Evidence photo taken by Bruni on 2025.07.22, showing her UCL research meeting preparation for an online group discussion with an Imperial College student.",
          evidenceImage: "/images/act-now/evidence/bruni-online-meeting.jpg",
          credibility:
            "This is credible because the image is tied to Bruni's actual research context rather than a generic online-meeting screenshot. It supports the action by showing that academic collaboration can sometimes continue without extra travel.",
        },
        {
          title: "Flight without meals as greener flying",
          desc: "The file name flight without meals makes the green-flying idea specific. When flying is necessary, skipping in-flight meals can reduce unnecessary food waste and packaging, and it shows that greener travel can include small booking choices as well as larger route choices.",
          evidence: "Evidence photo taken by Bruni on 2026.06.05, showing flight tickets used to document necessary air travel and the choice to avoid in-flight meals.",
          evidenceImage: "/images/act-now/evidence/flight-without-meals.jpg",
          credibility:
            "This card does not claim that skipping a meal offsets a flight. It is credible because it records a small but verifiable choice made during necessary air travel, while the wider plan still prioritises avoiding flights or choosing rail where possible.",
        },
        {
          title: "Choose high-speed rail for regional travel",
          desc: "The rail ticket photo shows a lower-carbon regional travel habit. For routes such as Hangzhou to Shanghai, high-speed rail can be a practical alternative to private-car travel or short-distance flights while still supporting efficient mobility.",
          evidence: "Evidence photo from Bruni's travel record on 2023.07.30, showing a high-speed rail trip from Hangzhou East to Shanghai Hongqiao as a lower-carbon regional travel choice.",
          evidenceImage: "/images/act-now/evidence/bruni-rail-ticket-web.jpg",
          credibility:
            "The ticket is a real dated travel record. Although it is older than the current project week, it credibly demonstrates Bruni's existing preference for rail on regional routes and supports the personal feasibility of the action.",
        },
      ],
      references: [actionReferenceBank.unActNow, actionReferenceBank.ipcc2023],
    },
    {
      member: "Elvira (Zheng Xinyao)",
      sdg: "SDG 4",
      action: "Reduce, reuse, repair, recycle",
      image: "/images/sdg4/image9.png",
      imageCaption: "Source: Visual China Group - Carbon footprint distribution",
      explanation:
        "The UN Act Now action is Reduce, reuse, repair, recycle. Its purpose is to lower the emissions embedded in products by buying fewer new items, extending the life of existing items, and sending materials back into useful circulation (United Nations, n.d.). For a student, this action can be practised through paper saving, second-hand books, repaired stationery, reusable bottles, and careful waste sorting. It also connects naturally with SDG 4 because education materials can become part of a lower-waste learning routine.",
      mechanism:
        "The 4R action reduces emissions by targeting the product lifecycle. Reducing demand avoids some extraction, manufacturing, packaging, transport, and disposal emissions; reusing and repairing extend product life; recycling keeps materials in circulation instead of sending them directly to landfill or incineration. UNEP (2024) frames waste reduction and circular management as central to moving beyond a linear take-make-waste model, while UNDP links circular economy approaches with long-term environmental and social well-being (United Nations Environment Programme, 2024; United Nations Development Programme, n.d.).",
      example:
        "Elvira can apply the action inside ordinary study routines: print course materials double-sided, reuse notes and second-hand books, repair stationery before buying replacements, and sort recyclable paper or plastic after class. The evidence records from 2026.06.06 to 2026.06.08 make the plan time-bound and personal. The expected impact is lower consumption-related emissions, lower study cost, and a clearer link between sustainable learning materials and responsible consumption.",
      calculator: {
        description:
          "Elvira's UN Climate Change and Doconomy Lifestyle Calculator result is used as individual visual evidence. The action-specific comparison below then models how buying less, reusing more, repairing items, and recycling materials can reduce a consumption footprint.",
        sourceLabel: "Lifestyle Calculator by Doconomy and the UNFCCC Secretariat",
        unfcccEvidence: unfcccCalculatorEvidenceByMember.elvira,
        screenshots: makeUnfcccScreenshots("elvira", unfcccCalculatorEvidenceByMember.elvira.resultImage),
        before: {
          total: "41.12",
          perCapita: "8.22",
          details:
            "Based on a five-member household, the per capita annual carbon emission is approximately 8.22 tons of CO2e - more than four times the UN 2030 target of 2 tons per capita. This figure exceeds both the China country average and the world average. Food (43%) and transportation (34%) are the dominant sources.",
        },
        after: {
          total: "21.93",
          perCapita: "4.39",
          details:
            "After implementing the 4R actions and reducing car use by 5,000 km annually, cutting flights to 3 per year, and shifting to a more plant-based diet, household emissions fell from 41.12 to 21.93 tons. Transportation emissions dropped by nearly 50% through reduced fossil fuel use. These actions are highly replicable and practical for most households.",
        },
      },
      coBenefits: [
        {
          title: "Financial Savings",
          desc: "Extending the lifecycle of items and avoiding unnecessary purchases can lower expenditure on goods, subsequently cutting down the cost of living.",
        },
        {
          title: "Biodiversity and Ecosystem Protection",
          desc: "Decreasing demand for raw materials lessens the destruction caused by mining, logging, and manufacturing, helping preserve natural habitats.",
        },
        {
          title: "Public Health Improvements",
          desc: "Cutting down plastic use lowers exposure to harmful chemicals, while less waste means fewer pollutants released into the environment from incineration and landfill.",
        },
        {
          title: "Circular Economy Promotion",
          desc: "This action supports a shift from the linear 'take-make-waste' model to a circular economy (UNDP, n.d.), decreasing waste and improving resource efficiency.",
        },
        {
          title: "Education and Social Impacts",
          desc: "Practising these habits helps foster sustainable awareness towards consumption, which aligns with SDG 4 and encourages others to adopt a low-carbon lifestyle.",
        },
      ],
      reductionPathway:
        "Elvira's three records are treated as consumption-related carbon-reduction solutions. They cover the 4R sequence in a student context: reduce paper demand through double-sided printing, repair stationery before replacement, and reuse second-hand books or notes. These actions reduce the need for newly produced goods and make sustainable learning materials visible in daily study.",
      offsetSolutions: [
        {
          title: "Double-sided printing and paper saving",
          desc: "The file name double-sided printing and paper saving directly supports the reduce part of 4R. Printing on both sides, keeping useful handouts, and avoiding duplicate copies reduce paper demand in daily academic work.",
          evidence: "Evidence photo taken by Elvira on 2026.06.06, showing double-sided printed study materials and paper-saving course notes.",
          evidenceImage: "/images/act-now/evidence/double-sided-printing-paper-saving.png",
          credibility:
            "The photo is credible because it shows an everyday study material choice directly related to the reduce principle. It is also easy to repeat across courses, which makes the action more than a one-time display.",
        },
        {
          title: "Repairing stationery",
          desc: "The file name repairing stationery directly supports the repair part of 4R. Fixing pens, folders, notebooks, or small study tools extends their useful life and avoids unnecessary replacement purchases.",
          evidence: "Evidence photo taken by Elvira on 2026.06.07, showing stationery being repaired before buying a replacement.",
          evidenceImage: "/images/act-now/evidence/repairing-stationery.png",
          credibility:
            "This record is credible because it captures the repair step itself, not only the final item. It supports the lifecycle logic of 4R by showing how a small object can remain useful for longer.",
        },
        {
          title: "Using second-hand books",
          desc: "The file name using second-hand books directly supports reuse in a student context. Second-hand textbooks, borrowed books, and annotated notes extend the life of learning materials and reduce the need for newly printed copies.",
          evidence: "Evidence photo taken by Elvira on 2026.06.08, showing second-hand books and reused notes with visible study use.",
          evidenceImage: "/images/act-now/evidence/using-second-hand-books.png",
          credibility:
            "The evidence fits Elvira's student context because books and notes are recurring academic materials. Reusing them is a credible completed action because it reduces new-material demand while still supporting learning.",
        },
      ],
      references: [actionReferenceBank.unActNow, actionReferenceBank.unepWaste, actionReferenceBank.undpCircular],
    },
  ],
  references: [
    "Britannica Editors. (2026, May 5). Carbon dioxide. Retrieved from Britannica: https://www.britannica.com/science/carbon-dioxide",
    actionReferenceBank.unActNow,
    actionReferenceBank.ipcc2023,
    actionReferenceBank.pooreNemecek,
    actionReferenceBank.unepWaste,
    actionReferenceBank.undpCircular,
    actionReferenceBank.unfcccCalculator,
    actionReferenceBank.unfcccMethod,
    "Jana Ohajdova. (n.d.). Green vegetables in a bowl [Photograph]. Unsplash. https://unsplash.com/photos/9nzQserYaN8",
    "Hanna Lazar. (n.d.). People at a railway station with luggage [Photograph]. Unsplash. https://unsplash.com/photos/SO5JaABqo2w",
  ],
};
