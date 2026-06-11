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
        "The world's roadways are clogged with vehicles, most of them burning diesel or gasoline. Walking or riding a bike instead of driving will reduce greenhouse gas emissions - and help your health and fitness. For longer distances, consider taking a train or bus. And carpool whenever possible. Living car-free can reduce your carbon footprint by up to 2 tons of CO2e per year compared to a lifestyle using a car (Nations, n.d.).",
      mechanism:
        "The core mechanism by which adopting walking, biking, or taking public transport reduces emissions is that these low-carbon or zero-carbon travel modes replace individual travel powered by fossil fuels, primarily gasoline or diesel vehicles. Walking and biking produce no direct emissions at all, while public transport can significantly cut per capita carbon emissions due to its higher passenger capacity per unit of energy consumed. The carbon footprint of bikes mainly comes from manufacturing and maintenance, averaging about 5 grams of CO2 per kilometer. In contrast, a diesel bus emits around 101 grams of CO2 per passenger per kilometer (FasterCapital, 2025).",
      example:
        "For daily commutes to work or school, prioritize public transport options such as subway and bus instead of private car. For short-distance trips, such as grocery shopping at the supermarket near your residence, attending a gathering with friends in the neighborhood, or studying at a nearby library, choose walking or biking directly. This approach not only allows you to flexibly avoid congested road sections, but also reduces carbon emissions.",
      calculator: {
        description:
          "Using the United Nations online platform for voluntary cancellation of certified emission reductions (CERs), the annual carbon emission of a representative household was calculated and analyzed.",
        calculatorImage: "/images/sdg13/image9.png",
        screenshots: Array.from({ length: 10 }, (_, i) => `/images/sdg13/image${i + 8}.png`),
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
      offsetSolutions: [
        {
          title: "Shift weekly commute kilometres to transit and retire verified credits",
          desc: "For unavoidable trips that still create emissions, I would record the remaining transport footprint each month and purchase verified carbon credits through a credible platform, prioritising public-transport or renewable-energy projects that avoid equivalent CO2e elsewhere.",
          evidence: "Required evidence: a dated public-transport ticket, transit card photo, walking route, or cycling record.",
          evidenceImage: "/images/team/janet-transport-evidence.jpg",
        },
        {
          title: "Fund urban tree planting near transport corridors",
          desc: "A practical offset is to support verified urban greening or reforestation programmes. This compensates for remaining commute emissions while improving shade, urban heat resilience, and local air quality around roads.",
          evidence: "Required evidence: a dated photo or receipt showing support for a greening or verified offset activity.",
          evidenceImage: "/images/team/janet-greening-evidence.jpg",
        },
        {
          title: "Support renewable electricity for stations and homes",
          desc: "Transport choices are cleaner when electricity and shared infrastructure use lower-carbon power. I would offset residual emissions by supporting renewable-energy certificates or local clean-energy programmes connected to daily travel and household charging needs.",
          evidence: "Required evidence: a dated app screen, project receipt, or record of a verified renewable-energy offset.",
          evidenceImage: "/images/team/janet-renewable-evidence.jpg",
        },
      ],
    },
    {
      member: "Irene (Han Yutong)",
      sdg: "SDG 2",
      action: "Eat more vegetables",
      image: "/images/act-now/eat-more-vegetables.jpg",
      imageCaption: "Photo: Jana Ohajdova on Unsplash - green vegetables and plant-based food",
      explanation:
        "Choosing more vegetables and plant-based meals is a practical Act Now response because food choices shape both personal health and climate pressure. The United Nations encourages people to eat more vegetables, fruits, whole grains, legumes, nuts, and seeds because plant-rich diets generally require fewer resources and generate lower greenhouse gas emissions than meat-heavy diets (United Nations, n.d.). For a student household, the goal is not to demand a perfect vegan lifestyle, but to replace several high-emission meals each week with balanced vegetable-based meals. This action connects SDG 2's concern for sustainable food systems with SDG 13's focus on climate action.",
      mechanism:
        "Diet changes lower emissions by reducing demand for foods with high land, feed, energy, methane, and supply-chain footprints. Plant foods usually need less land and produce fewer greenhouse gases per unit of nutrition than beef and other ruminant meat. A practical mechanism is substitution: replace meat-heavy meals with vegetables, legumes, tofu, eggs, whole grains, and seasonal local produce. This reduces indirect emissions from production, refrigeration, and transport while also encouraging more efficient use of farmland. Poore and Nemecek (2018) show that food's environmental impacts vary greatly across products, which means consumer choices can meaningfully reduce the footprint of daily meals.",
      example:
        "In daily life, I can begin with three concrete habits: choose a vegetable-based lunch at least three times per week, use tofu or beans as the main protein in home cooking, and order smaller meat portions when eating out. I can also plan meals before shopping so vegetables are used before they spoil. A realistic campus version would be to record one week of meals, identify the highest-emission meat meals, and replace them with affordable vegetable dishes. This makes the action visible, measurable, and easier to continue.",
      calculator: {
        description:
          "The representative household estimate compares a meat-heavy baseline with a more plant-forward diet. The change is modelled as a reduction in the diet component of annual per-capita emissions while keeping other lifestyle categories stable.",
        screenshots: [],
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
      offsetSolutions: [
        {
          title: "Record one week of plant-forward meals",
          desc: "I would keep a dated meal log showing which meat-heavy meals were replaced by vegetable-based options, then compare the estimated diet footprint before and after the change.",
          evidence: "Required evidence: a dated vegetable-based meal photo or one-week plant-forward meal log.",
          evidenceImage: "/images/team/irene-vegetables-evidence.jpg",
        },
        {
          title: "Support local seasonal produce",
          desc: "Choosing seasonal vegetables from local markets can reduce unnecessary packaging and transport pressure while supporting local food systems.",
          evidence: "Required evidence: a dated market, dining-hall, or kitchen photo showing seasonal vegetables.",
          evidenceImage: "/images/team/irene-seasonal-produce-evidence.jpg",
        },
        {
          title: "Share a low-carbon meal plan",
          desc: "I would prepare a simple three-day student meal plan and share it with classmates, making the action replicable rather than only personal.",
          evidence: "Required evidence: a dated meal-plan screenshot, class sharing record, or photo of the prepared plan.",
          evidenceImage: "/images/team/irene-meal-plan-evidence.jpg",
        },
      ],
    },
    {
      member: "Bruni (Liu Xiangyi)",
      sdg: "SDG 16",
      action: "Consider your travel",
      image: "/images/act-now/consider-your-travel.jpg",
      imageCaption: "Photo: Hanna Lazar on Unsplash - railway travel and luggage",
      explanation:
        "Considering travel means planning trips more carefully before choosing the highest-emission option. The United Nations Act Now guidance encourages people to fly less, use virtual meetings when possible, travel by train for shorter distances, and choose local destinations when they can (United Nations, n.d.). This topic is different from daily public transport because it focuses on occasional higher-impact decisions: flights, long-distance trips, vacations, conferences, and unnecessary repeated travel. For students, a realistic response is to combine trips, avoid unnecessary flights, choose rail for domestic travel when possible, and use online participation when physical attendance is not essential.",
      mechanism:
        "Travel planning lowers emissions by reducing high-carbon passenger kilometres and replacing them with lower-carbon alternatives. Flights are especially important because a single round trip can create a large share of an individual's annual footprint. The mechanism is therefore avoidance, substitution, and efficiency: avoid trips that can be replaced by online communication, substitute rail or coach for short-distance flights, and combine multiple purposes into one trip. These decisions reduce direct fuel combustion and also reduce indirect demand for airport, road, and tourism infrastructure.",
      example:
        "My personal implementation can start with a travel checklist before each long-distance trip: Is this trip necessary? Can the meeting be online? Is high-speed rail available? Can I combine several tasks into one journey? For family visits or short holidays, I can choose rail instead of flights where time and cost are reasonable. For university activities, I can suggest online participation for meetings that do not require fieldwork. The expected impact is fewer unnecessary trips, lower flight-related emissions, and more deliberate travel spending.",
      calculator: {
        description:
          "The representative household estimate compares a baseline with frequent long-distance travel against a lower-travel scenario that reduces flights and combines trips where possible.",
        screenshots: [],
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
      offsetSolutions: [
        {
          title: "Keep a low-carbon travel record",
          desc: "I would document each avoided flight or rail substitution with dated tickets, route screenshots, or meeting records, then estimate the saved emissions.",
          evidence: "Required evidence: a dated rail ticket, route screenshot, or low-carbon trip record.",
          evidenceImage: "/images/team/bruni-travel-evidence.jpg",
        },
        {
          title: "Use online participation when suitable",
          desc: "For meetings without fieldwork or required attendance, online participation can replace travel while preserving communication and learning outcomes.",
          evidence: "Required evidence: a dated online-meeting screenshot or remote participation notes.",
          evidenceImage: "/images/team/bruni-online-meeting-evidence.jpg",
        },
        {
          title: "Offset unavoidable long-distance trips",
          desc: "When a trip is necessary, I would calculate the remaining emissions and support verified climate projects or renewable-energy credits with transparent records.",
          evidence: "Required evidence: a dated offset receipt or verified climate-project record.",
          evidenceImage: "/images/team/bruni-offset-evidence.jpg",
        },
      ],
    },
    {
      member: "Elvira (Zheng Xinyao)",
      sdg: "SDG 4",
      action: "Reduce, reuse, repair, recycle",
      image: "/images/sdg4/image9.png",
      imageCaption: "Source: Visual China Group - Carbon footprint distribution",
      explanation:
        "Electronics, clothes, plastics and other items we buy cause carbon emissions at each point in production, from the extraction of raw materials to manufacturing and transporting goods to market. To protect the climate, buy fewer things, shop second-hand, and repair what you can. Plastics alone generated 1.8 billion metric tons of greenhouse gas emissions in 2019 - 3.4 per cent of the global total. Less than 10 per cent is recycled, and once plastic is discarded, it can linger for hundreds of years. Every kilogram of textiles produced generates about 17 kilograms of CO2e (United Nations, n.d.).",
      mechanism:
        "The 4R action reduces greenhouse gas emissions by targeting every stage in the lifecycle of products. Every product generates emissions throughout its lifecycle, involving raw material extraction, manufacturing, transporting, and disposal. By diminishing unnecessary consumption, we cut down production, avoiding carbon emissions. Reusing items lengthens their lifespan, eliminating the need for new production. Repairing extends product life further. Recycling diverts materials back into production cycles, which uses far less energy than producing from virgin materials (Scells et al., 2022). Together, these actions break the conventional product lifecycle, realising measurable reductions in emissions.",
      example:
        "In daily life, the 4R approach works as follows: bring a reusable water bottle to reduce disposable items; use second-hand textbooks and stationery whenever possible; mend torn clothes and repair broken books instead of buying replacements; categorise paper, plastic, and metal waste for proper recycling. This lifestyle not only contributes to a more affordable and sustainable way of living, but also plays an essential role in reducing carbon emissions.",
      calculator: {
        description:
          "Using the United Nations online platform for voluntary cancellation of certified emission reductions (CERs), the annual carbon footprint of a representative household was calculated. Food and transportation account for 43% and 34% of emissions respectively - the two largest contributors.",
        screenshots: Array.from({ length: 15 }, (_, i) => `/images/sdg4/image${i + 10}.png`),
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
      offsetSolutions: [
        {
          title: "Finance certified recycling and material recovery",
          desc: "After reducing purchases, I would offset unavoidable product emissions by supporting certified recycling, textile recovery, or e-waste collection projects that prevent new raw-material extraction and save equivalent emissions.",
          evidence: "Required evidence: a dated photo of sorted recyclables, e-waste delivery, or material recovery.",
          evidenceImage: "/images/team/elvira-recycle-evidence.jpg",
        },
        {
          title: "Donate to repair and reuse programmes",
          desc: "Repair cafes, second-hand libraries, and community reuse projects reduce demand for new production. Funding or volunteering in these projects can compensate for the remaining emissions attached to products I still need to buy.",
          evidence: "Required evidence: a dated photo of a repaired item, repair process, or second-hand reuse record.",
          evidenceImage: "/images/team/elvira-repair-evidence.jpg",
        },
        {
          title: "Buy verified circular products for unavoidable purchases",
          desc: "When purchasing is unavoidable, I would choose products with credible recycled content, durability, and repairability claims. This shifts spending toward lower-carbon supply chains and offsets part of the impact of consumption.",
          evidence: "Required evidence: a dated photo or receipt showing a repaired, second-hand, or circular product.",
          evidenceImage: "/images/team/elvira-circular-product-evidence.jpg",
        },
      ],
    },
  ],
  references: [
    "Britannica Editors. (2026, May 5). Carbon dioxide. Retrieved from Britannica: https://www.britannica.com/science/carbon-dioxide",
    "Climate Change Tracker. (2024). China's Progress and Recent Impact. https://climatechangetracker.org/nations/greenhouse-gas-emissions/china/progress-and-recent-impact",
    "FasterCapital. (2025, April 9). Bike Environmental Impact: Biking vs. Public Transportation: Which Is Better for the Planet. https://fastercapital.com/content/Bike-Environmental-Impact--Biking-vs--Public-Transportation--Which-Is-Better-for-the-Planet.html",
    "Hilton, I. (2026, March 26). As It Boosts Renewables, China Still Can't Break Its Coal Addiction. Yale School of the Environment: https://e360.yale.edu/features/china-coal-five-year-plan",
    "Hodges, M. (2025, October 13). Eco-Friendly Commutes: Walking And Biking's Impact On Our Planet. SHUN WASTE: https://shunwaste.com/article/how-does-walking-or-riding-a-bike-affect-the-environment",
    "Nations, United. (n.d.). Actions for a healthy planet. United Nations: https://www.un.org/en/actnow/ten-actions",
    "Scells, H., Zhuang, S., & Zuccon, G. (2022). Reduce, Reuse, Recycle: Green Information Retrieval Research. Proceedings of the 45th ACM SIGIR Conference. https://doi.org/10.1145/3477495.3531738",
    "TheGlobalEconomy. (2023). China: Coal Reserves. https://www.theglobaleconomy.com/China/coal_reserves/",
    "United Nation. (2015, September 25). Department of Economic and Social Affairs. Sustainable Development: https://sdgs.un.org/goals/goal13#targets_and_indicators",
    "United Nations. (n.d.). Actions for a healthy planet. Retrieved from: https://un.org/en/actnow/ten-actions",
    "United Nations Development Programme. (n.d.). A circular economy aligns environmental protection with long-term economic and social well-being. Retrieved from: https://www.undp.org/chemicals-waste/our-work/circular-economy",
    "Jana Ohajdova. (n.d.). Green vegetables in a bowl [Photograph]. Unsplash. https://unsplash.com/photos/9nzQserYaN8",
    "Hanna Lazar. (n.d.). People at a railway station with luggage [Photograph]. Unsplash. https://unsplash.com/photos/SO5JaABqo2w",
    "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987-992. https://doi.org/10.1126/science.aaq0216",
    "Wang, J., Huang, J., Rozelle, S. (2010, May 1). Climate Change and China's Agricultural Sector: Impacts, Adaptation, and Mitigation. Stanford University: https://aparc.fsi.stanford.edu/publications/climate_change_and_chinas_agricultural_sector_impacts_adaptation_and_mitigation",
  ],
};
