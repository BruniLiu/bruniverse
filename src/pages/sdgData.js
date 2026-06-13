export const sdgDetails = {
  4: {
    number: "SDG 4",
    title: "Quality Education",
    subtitle: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    color: "from-red-400/20 to-red-500/10",
    borderColor: "border-red-400/30",
    textColor: "text-red-200/80",
    heroGradient: "radial-gradient(circle_at_50%_30%,rgba(248,113,113,0.18)_0%,rgba(248,113,113,0.06)_40%,transparent_70%)",
    heroImage: "/images/sdg4/image1.png",
    overview:
      "SDG 4 aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all (United Nations Department of Economic and Social Affairs, n.d.). In China, the question is no longer only whether children can enter school, but whether rural, migrant, low-income, disabled, and digitally excluded learners can receive comparable quality and support. UNICEF China identifies education equity and inclusion as continuing priorities, especially for disadvantaged children (UNICEF China, n.d.). Quality education is also a multiplier for poverty reduction, public health, gender equality, employability, and civic participation.",
    targets: [
      "By 2030, ensure all girls and boys complete free, equitable, and quality primary and secondary education",
      "Ensure all girls and boys have access to quality early childhood development and pre-primary education",
      "Equal access to affordable technical, vocational, and higher education for all women and men",
      "Eliminate gender disparities in education and ensure equal access for the vulnerable",
      "Universal literacy and numeracy among youth and a substantial proportion of adults",
      "Education for sustainable development and global citizenship",
    ],
    facts: [
      "China's nine-year compulsory education retention rate reached 95.9% in 2024, showing broad access but also leaving a visible completion gap (National Bureau of Statistics of China, 2025).",
      "The gross enrolment ratio in senior secondary education reached 92.0% in 2024, but access to high-quality teachers, digital tools, and enrichment resources still differs by region and household income (National Bureau of Statistics of China, 2025).",
      "UNICEF China highlights rural children, migrant children, left-behind children, and children with disabilities as groups needing stronger inclusive education support (UNICEF China, n.d.).",
      "Research on online learning in China during COVID-19 found that devices, internet access, parental support, and home learning environments shaped students' ability to benefit from digital education (Guo & Wan, 2022).",
      "Lifelong learning is also part of SDG 4 because adult and older learners need digital and vocational skills to participate in a fast-changing economy (UN DESA, n.d.).",
    ],
    dataViz: {
      title: "Education access is rising, but quality still has to catch up.",
      copy:
        "The chart tracks two official access indicators. Both have improved, but SDG 4 still asks whether learning quality, digital access, and support are equally available after students enter school.",
      source: "China National Bureau of Statistics and Ministry of Education, 2020-2024.",
      stats: [
        { value: "95.9%", label: "Nine-year compulsory education retention, 2024" },
        { value: "92.0%", label: "Senior secondary gross enrolment, 2024" },
        { value: "14.30M", label: "Migrant children in compulsory education, 2020" },
      ],
      charts: [
        {
          type: "line",
          title: "China education access indicators",
          unit: "%",
          yMin: 90,
          yMax: 97,
          source: "NBS final monitoring reports, MOE statistical reports, and NBS statistical communiques.",
          series: [
            {
              name: "Compulsory retention",
              points: [
                { label: "2020", value: 95.2 },
                { label: "2021", value: 95.4 },
                { label: "2022", value: 95.5 },
                { label: "2023", value: 95.7 },
                { label: "2024", value: 95.9 },
              ],
            },
            {
              name: "Senior secondary enrolment",
              points: [
                { label: "2020", value: 91.2 },
                { label: "2021", value: 91.4 },
                { label: "2022", value: 91.6 },
                { label: "2023", value: 91.8 },
                { label: "2024", value: 92.0 },
              ],
            },
          ],
        },
        {
          type: "bar",
          title: "2024 access snapshot",
          unit: "%",
          yMax: 100,
          source: "National Bureau of Statistics of China, 2025.",
          bars: [
            { label: "Compulsory retention", value: 95.9 },
            { label: "Senior secondary", value: 92.0 },
          ],
        },
      ],
    },
    connections: "Quality education underpins progress across most other SDGs. Better-educated populations make more informed health choices (SDG 3), are more likely to adopt sustainable consumption habits (SDG 12) and climate action (SDG 13), and drive economic growth that reduces poverty (SDG 1) and inequality (SDG 10). Education also strengthens civic participation and institution-building (SDG 16).",
    richSections: [
      {
        id: "education-challenges",
        label: "Education Challenges in China",
        type: "challenges",
        intro: "Despite immense advancement in education, China still faces persistent issues in achieving SDG 4. Rural students, left-behind children, children of migrant workers, students with disabilities, and the elderly all face barriers. Teachers in under-resourced regions work with limited support, and government departments must invest more to close the gaps between regions.",
        challenges: [
          {
            title: "Regional Education Imbalance",
            image: "/images/sdg4/image2.jpeg",
            imageCaption: "Source: Leadership Society of Arizona - Issues of China education system",
            content: "Economically developed areas, such as major cities and special economic zones, benefit from industrial agglomeration effects and higher fiscal revenues, allowing them to receive significantly more education funding (Huang, 2024). Well-developed regions enjoy sufficient funding, advanced teaching facilities, and knowledgeable teachers. However, economically developing areas, like remote villages, lack all these resources. As a result, these poorer regions are unlikely to provide diverse and high-quality education for students.",
          },
          {
            title: "Disadvantaged Groups and Unequal Access",
            image: "/images/sdg4/image3.jpeg",
            imageCaption: "Source: BTIME Report - Challenges in Yunnan's rural education",
            content: "Unequal educational chances for disadvantaged groups stem from systemic factors including family poverty, geographic isolation, and lack of parental care. Many low-income students cannot afford tuition fees and are more likely to drop out of school due to inconvenient access, high family education expenditure, and lack of parental companionship. The retention rate of nine-year compulsory education is 95.9%, but 4.1% of students are still unable to graduate (Ministry of Education of the People's Republic of China, 2025). In Yunnan province, children walk hours on unsafe paths such as bridges to go to school.",
          },
          {
            title: "Inadequate Lifelong Learning",
            image: "/images/sdg4/image4.png",
            imageCaption: "Source: China Daily - More nuanced approach to aging needed",
            content: "The popularisation of lifelong learning remains inadequate, primarily due to limited public funding for adult education and low penetration rates of digital learning platforms. Rural adults often have no access to literacy classes or vocational training. For instance, many seniors cannot use smartphones to access learning apps, which restricts their potential abilities in digital lifelong learning and excludes them from the knowledge economy.",
          },
          {
            title: "The Digital Divide",
            image: "/images/sdg4/image5.png",
            imageCaption: "Source: CGTN - Shanghai to resume in-person classes",
            content: "Online education has become a crucial trend; nevertheless, it also widens new gaps. Urban students are equipped with stable internet, personal devices, and comprehensive digital resources. However, rural students lack even basic resources. During the pandemic, some had to walk kilometres to find a signal. This digital divide not only undermines education equality but also slows progress toward SDG 4, creating a two-tier system where technology amplifies existing inequalities rather than bridging them.",
          },
        ],
      },
      {
        id: "personal-solutions",
        label: "Personal Solutions",
        type: "challenges",
        intro: "With the aim of addressing these challenges and advancing SDG 4 in China, as a university student, I propose several feasible solutions that can be implemented at the individual level.",
        challenges: [
          {
            title: "Tutoring Programmes for Rural Students",
            image: "/images/sdg4/image6.png",
            imageCaption: "Source: Class Central - List of Chinese Online Course Platforms in 2026",
            content: "Everyone should actively participate in tutoring programmes for rural students, principally concentrating on improving their digital literacy skills. Leading weekly online classes to impart basic digital skills will be conducive to narrowing the existing education gap. University students can volunteer their time to provide one-on-one mentoring through existing online education platforms, helping bridge the resource divide between urban and rural schools.",
          },
          {
            title: "Curriculum and Assessment Reform",
            image: "/images/sdg4/image7.png",
            imageCaption: "Source: New GCSE Curriculum Review 2026 - Preparation Guide",
            content: "Revising curricula and assessment systems is integral to improving education quality. Schools can include various practical tasks in regular evaluation, involving collaborative projects, internet use assessment, and basic critical thinking tests. Moving beyond rote memorisation toward skills-based, project-driven learning better prepares students for the modern workforce and fosters the creativity needed for sustainable development.",
          },
          {
            title: "Lifelong Learning and Vocational Education",
            image: "/images/sdg4/image8.png",
            imageCaption: "Source: Wuxi Agricultural and Rural Bureau - Jiangyin youth rural classroom report",
            content: "Advocating for lifelong learning and vocational education is essential. More information about professional opportunities and the significance of perpetual learning need to reach the wider population. Lectures held by professionals can help students explore diverse career paths, while community-based adult education programmes can ensure that learning does not stop after formal schooling ends. This is particularly important for rural adults and the elderly who have been left behind by rapid technological change.",
          },
        ],
      },
      {
        id: "references",
        label: "References",
        type: "references",
        references: [
          "Guo, C., & Wan, B. (2022). The digital divide in online learning in China during the COVID-19 pandemic. Technology in Society, 71, Article 102122. https://doi.org/10.1016/j.techsoc.2022.102122",
          "Huang, X. (2024). Research on the formation and evolution mechanism of the urban-rural education gap in China. Academic Journal of Humanities & Social Sciences, 7(7), 152-157. https://doi.org/10.25236/AJHSS.2024.070723",
          "Ministry of Education of the People's Republic of China. (2022). Statistical report on China's educational achievements in 2021. https://en.moe.gov.cn/documents/reports/202209/t20220924_664436.html",
          "Ministry of Education of the People's Republic of China. (2023). Statistical report on China's educational achievements in 2022. https://en.moe.gov.cn/documents/reports/202304/t20230403_1054100.html",
          "National Bureau of Statistics of China. (2021, December 31). Final statistical monitoring report on the implementation of China National Program for Child Development (2011-2020). https://www.stats.gov.cn/english/PressRelease/202112/t20211231_1825803.html",
          "National Bureau of Statistics of China. (2024, February 28). Statistical communique of the People's Republic of China on the 2023 national economic and social development. https://www.stats.gov.cn/english/PressRelease/202402/t20240228_1947918.html",
          "National Bureau of Statistics of China. (2025, February 28). Statistical communique of the People's Republic of China on the 2024 national economic and social development. https://www.stats.gov.cn/english/PressRelease/202502/t20250228_1958822.html",
          "UNICEF China. (2024). Children in China: An atlas of social indicators 2024. https://www.unicef.cn/en/media/28801/file/Children%20in%20China%3A%20An%20Atlas%20of%20Social%20Indicators%202024.pdf",
          "UNICEF China. (n.d.). Education. https://www.unicef.cn/en/what-we-do/education",
          "United Nations Department of Economic and Social Affairs. (n.d.). Goal 4: Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. https://sdgs.un.org/goals/goal4",
        ],
      },
    ],
  },
  2: {
    number: "SDG 2",
    title: "Zero Hunger",
    subtitle: "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.",
    color: "from-amber-400/20 to-yellow-500/10",
    borderColor: "border-amber-400/30",
    textColor: "text-amber-200/80",
    heroGradient: "radial-gradient(circle_at_50%_30%,rgba(221,166,58,0.18)_0%,rgba(221,166,58,0.06)_40%,transparent_70%)",
    overview:
      "SDG 2 aims to end hunger, achieve food security and improved nutrition, and promote sustainable agriculture (United Nations Department of Economic and Social Affairs, n.d.). Globally, SOFI 2025 estimates that about 673 million people faced hunger in 2024, which shows why food security remains urgent even when some countries have made strong production gains (FAO et al., 2025). This page studies China through food waste, nutrition, agricultural innovation, and responsible consumption. The central question is how a society can protect food security not only by producing more food, but also by wasting less of the food it already grows, transports, cooks, and buys.",
    targets: [
      "End hunger and ensure access to safe, nutritious, and sufficient food all year round",
      "End all forms of malnutrition, including child stunting and wasting",
      "Double agricultural productivity and incomes of small-scale food producers",
      "Ensure sustainable food production systems and resilient agricultural practices",
      "Maintain genetic diversity of seeds, cultivated plants, farmed animals, and wild species",
      "Correct and prevent trade restrictions and distortions in world agricultural markets",
    ],
    facts: [
      "About 673 million people experienced hunger globally in 2024, and about 2.3 billion people faced moderate or severe food insecurity (FAO et al., 2025).",
      "Global consumer-level food waste reached about 1.05 billion tonnes in 2022 (UNEP, 2024).",
      "Households generated 631 million tonnes of measured consumer-level food waste in 2022, making household behaviour central to waste reduction (UNEP, 2024).",
      "More than 35 million tonnes of food are lost or wasted in China annually, enough to feed 30 to 50 million people (IFAD, 2020).",
      "China wastes about 17 to 18 million tonnes of food annually at the retail or consumption stage (IFAD, 2020).",
    ],
    dataViz: {
      title: "Food security pressure appears in both hunger and waste.",
      copy:
        "SOFI 2025 shows global hunger remains high, while UNEP shows food waste is concentrated in daily consumption spaces. The paired view connects SDG 2 with the student-level action of wasting less food.",
      source: "FAO et al., 2025; UNEP, 2024; IFAD, 2020.",
      stats: [
        { value: "673M", label: "People facing hunger globally, 2024" },
        { value: "1.05B t", label: "Food wasted globally at retail, food service, and household levels, 2022" },
        { value: "35M+ t", label: "Food lost or wasted in China each year" },
      ],
      charts: [
        {
          type: "line",
          title: "Global hunger rate",
          unit: "%",
          yMin: 7.8,
          yMax: 9,
          source: "FAO, IFAD, UNICEF, WFP, & WHO, 2025.",
          series: [
            {
              name: "Population facing hunger",
              points: [
                { label: "2022", value: 8.7 },
                { label: "2023", value: 8.5 },
                { label: "2024", value: 8.2 },
              ],
            },
          ],
        },
        {
          type: "bar",
          title: "Food waste by sector, 2022",
          unit: "million tonnes",
          yMax: 700,
          source: "UNEP Food Waste Index Report 2024.",
          bars: [
            { label: "Households", value: 631 },
            { label: "Food service", value: 290 },
            { label: "Retail", value: 131 },
          ],
        },
      ],
    },
    connections:
      "Zero Hunger is connected to health, poverty reduction, climate resilience, land use, responsible consumption, and social stability. Reducing food waste supports SDG 12 on responsible consumption and SDG 13 on climate action because it lowers pressure on land, water, energy, transport, labour, and emissions embedded in uneaten food.",
    richSections: [
      {
        id: "role-model",
        label: "Role Model Spotlight",
        type: "challenges",
        intro:
          "Yuan Longping shows how agricultural science can transform food scarcity into food security. His hybrid rice research connects SDG 2 with innovation, farmer adoption, public support, and long-term resilience.",
        challenges: [
          {
            title: "Yuan Longping and Hybrid Rice",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Yuan_Longping_at_news_conference.png",
            imageCaption: "Source: Wikimedia Commons - Yuan Longping at news conference",
            content:
              "Yuan Longping is widely known as the Father of Hybrid Rice. The World Food Prize Foundation explains that he developed technologies needed to breed the first hybrid rice varieties, and that higher-yielding hybrid rice helped nourish approximately 70 million more people per year in China alone (World Food Prize Foundation, n.d.). His work shows that science, field experimentation, farmer adoption, and public investment can strengthen food availability at population scale.",
          },
        ],
      },
      {
        id: "china-impact",
        label: "Adverse Impact in China",
        type: "challenges",
        intro:
          "China has made major progress in feeding a large population, but food waste still places pressure on land, water, energy, labour, household spending, emissions, and food security governance.",
        challenges: [
          {
            title: "Why: Consumption and Supply-Chain Causes",
            image: "https://sdgs.un.org/sites/default/files/2023-08/SDG_report_2023_infographics_Goal%202.jpg",
            imageCaption: "Source: United Nations Sustainable Development Goals Report 2023",
            content:
              "Food waste in China is driven by rapid urbanisation, income growth, eating out, takeaway services, banquets, and over-ordering. Cultural habits around hospitality and face-saving can increase restaurant waste, while harvesting, storage, transport, processing, cold-chain gaps, and appearance standards can cause food loss before food reaches consumers (Feng et al., 2022).",
          },
          {
            title: "How: Waste at Meals, Retail, and Households",
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Treasure_trove_of_wasted_food.JPG",
            imageCaption: "Source: Wikimedia Commons - Treasure trove of wasted food",
            content:
              "The problem appears through discarded meals, leftovers, spoiled ingredients, and avoidable restaurant, school, household, and food-service waste. IFAD reports that more than 35 million tonnes of food are lost or wasted in China annually, including about 17 to 18 million tonnes at the retail or consumption stage (IFAD, 2020). Globally, consumer-level food waste reached 1.052 billion tonnes in 2022 (UNEP, 2024).",
          },
          {
            title: "Who: Stakeholders and Affected Groups",
            image: "https://sdgs.un.org/sites/default/files/2023-08/SDG_report_2023_infographics_Goal%202.jpg",
            imageCaption: "Source: United Nations Department of Economic and Social Affairs",
            content:
              "Consumers, students, households, restaurants, canteens, retailers, farmers, food producers, logistics providers, low-income communities, and future generations are affected. China's Anti-Food Waste Law aims to prevent food waste, safeguard national food security, conserve resources, protect the environment, and promote sustainable development (Standing Committee of the National People's Congress, 2021).",
          },
        ],
      },
      {
        id: "personal-response",
        label: "Personal Response",
        type: "action",
        action: "Throw away less food",
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Treasure_trove_of_wasted_food.JPG",
        imageCaption: "Source: Wikimedia Commons - discarded food visual evidence",
        explanation:
          "A practical response can start with daily behaviour and then expand into school or university communities. The key steps are to measure waste, reduce waste, and share awareness.",
        mechanism:
          "First, record food waste for one week, including food type, amount, reason, and prevention method. Second, use meal planning, smaller portions, refill-first canteen habits, and leftover packing. Third, create posters, short videos, canteen data boards, and student pledges that connect everyday meals with SDG 2.",
        example:
          "A campus campaign can show weekly food-waste data beside the canteen, promote half portions, and encourage students to take only what they can finish. This turns food security from an abstract global issue into a repeated local habit.",
        coBenefits: [
          {
            title: "Food security",
            desc: "Reducing avoidable waste makes the food system more efficient and helps communities respect food as a shared resource.",
          },
          {
            title: "Household savings",
            desc: "Meal planning and portion control reduce unnecessary spending on food that would otherwise be thrown away.",
          },
          {
            title: "Climate and resources",
            desc: "Less wasted food means less wasted land, water, fertiliser, energy, transport, packaging, and landfill emissions.",
          },
          {
            title: "Student leadership",
            desc: "Campaigns, data boards, and peer pledges help students turn SDG knowledge into visible community action.",
          },
        ],
      },
      {
        id: "references",
        label: "References",
        type: "references",
        references: [
          "Feng, Y., Marek, C., & Tosun, J. (2022). Fighting food waste by law: Making sense of the Chinese approach. Journal of Consumer Policy, 45, 457-479. https://doi.org/10.1007/s10603-022-09519-2",
          "FAO, IFAD, UNICEF, WFP, & WHO. (2025). The state of food security and nutrition in the world 2025: Addressing high food price inflation for food security and nutrition. FAO. https://openknowledge.fao.org/handle/20.500.14283/cd6008en",
          "International Fund for Agricultural Development. (2020, September 29). Fighting food waste in China: Local efforts, global effects. https://www.ifad.org/en/w/opinions/fighting-food-waste-in-china-local-efforts-global-effects",
          "Standing Committee of the National People's Congress. (2021). Law of the People's Republic of China on food waste. https://en.npc.gov.cn.cdurl.cn/2021-04/29/c_689496.htm",
          "United Nations. (n.d.). Goal 2: End hunger, achieve food security and improved nutrition and promote sustainable agriculture. https://sdgs.un.org/goals/goal2",
          "United Nations Environment Programme. (2024). Food Waste Index Report 2024. https://www.unep.org/resources/publication/food-waste-index-report-2024",
          "World Food Prize Foundation. (n.d.). 2004: Monty P. Jones and Yuan Longping. https://www.worldfoodprize.org/en/laureates/20002009_laureates/2004_jones_and_yuan/",
        ],
      },
    ],
  },
  13: {
    number: "SDG 13",
    title: "Climate Action",
    subtitle: "Take urgent action to combat climate change and its impacts across all sectors of society.",
    color: "from-emerald-400/20 to-green-500/10",
    borderColor: "border-emerald-400/30",
    textColor: "text-emerald-200/80",
    heroGradient: "radial-gradient(circle_at_50%_30%,rgba(52,211,153,0.18)_0%,rgba(52,211,153,0.06)_40%,transparent_70%)",
    heroImage: "/images/sdg13/image1.png",
    overview:
      "SDG 13 calls for urgent action to combat climate change and its impacts by strengthening resilience, integrating climate measures into policy, and improving education and institutional capacity (United Nations Department of Economic and Social Affairs, n.d.). The IPCC states that human activities have unequivocally caused global warming, with global surface temperature reaching about 1.1 degrees Celsius above 1850-1900 levels in 2011-2020 (IPCC, 2023). In China, climate action has two sides: reducing emissions from energy, industry, transport, buildings, and consumption, while also adapting to heat, floods, drought, water stress, and coastal risk. This makes SDG 13 a shared responsibility across government, industry, schools, communities, and everyday behaviour.",
    targets: [
      "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries",
      "Integrate climate change measures into national policies, strategies, and planning",
      "Improve education, awareness-raising, and institutional capacity on climate change mitigation and adaptation",
      "Implement the UNFCCC commitment of $100 billion annually by developed countries",
      "Promote mechanisms for raising capacity for effective climate planning in least developed countries",
    ],
    facts: [
      "Human activities have unequivocally caused global warming, with global surface temperature about 1.1 degrees Celsius above 1850-1900 levels in 2011-2020 (IPCC, 2023).",
      "The IEA reports that China's per-capita energy-related CO2 emissions in 2024 were 16% higher than those of advanced economies and nearly twice the global average (IEA, 2025).",
      "Low-elevation coastal cities account for about one fifth of China's population and one third of its GDP, creating major sea-level-rise and flood exposure (World Bank Group, 2022).",
      "Heatwave-related mortality in China was estimated at about 50,900 deaths in 2022, more than twice the number in 2021 (Zhang et al., 2023).",
      "China is also a major clean-energy investor, so the challenge is not simply awareness but accelerating the shift from high-carbon systems to resilient low-carbon systems (IEA, n.d.).",
    ],
    dataViz: {
      title: "Climate change is visible as a trend, not a single event.",
      copy:
        "The temperature line shows the rapid recent warming signal. The China risk bars connect that global signal to coastal exposure, economic exposure, and heat-health pressure.",
      source: "WMO, 2025; World Bank Group, 2022; Zhang et al., 2023; IEA, 2025.",
      stats: [
        { value: "1.55 C", label: "Global temperature above 1850-1900 level, 2024" },
        { value: "50,900", label: "Estimated heatwave-related deaths in China, 2022" },
        { value: "+16%", label: "China per-capita energy CO2 above advanced economies, 2024" },
      ],
      charts: [
        {
          type: "line",
          title: "Global temperature above pre-industrial level",
          unit: "C",
          yMin: 1,
          yMax: 1.65,
          source: "World Meteorological Organization, 2025.",
          series: [
            {
              name: "Temperature anomaly",
              points: [
                { label: "2020", value: 1.2 },
                { label: "2021", value: 1.11 },
                { label: "2022", value: 1.15 },
                { label: "2023", value: 1.45 },
                { label: "2024", value: 1.55 },
              ],
            },
          ],
        },
        {
          type: "bar",
          title: "China climate risk signals",
          unit: "%",
          yMax: 360,
          source: "World Bank Group, 2022; Zhang et al., 2023.",
          bars: [
            { label: "Coastal population", value: 20 },
            { label: "Coastal GDP", value: 33 },
            { label: "Heat mortality increase", value: 342 },
          ],
        },
      ],
    },
    connections: "Climate action is deeply interconnected with every SDG. Rising temperatures threaten food security (SDG 2), exacerbate health risks (SDG 3), worsen water scarcity (SDG 6), and disrupt economic growth (SDG 8). Transitioning to clean energy (SDG 7) and building sustainable cities (SDG 11) are essential climate mitigation strategies.",
    richSections: [
      {
        id: "climate-transition-context",
        label: "Climate Transition Context",
        type: "challenges",
        intro:
          "China is central to SDG 13 because it is both highly exposed to climate impacts and deeply involved in the global low-carbon transition. The country faces a difficult double task: reducing emissions from a large industrial economy while protecting cities, workers, farms, and coastal communities from climate hazards.",
        challenges: [
          {
            title: "A high-carbon system under transition pressure",
            image: "/images/sdg13/sdg13-coal-power.jpg",
            imageCaption: "Source: Wikimedia Commons - Shuozhou coal power plant",
            content:
              "China's development has relied heavily on energy-intensive industry, construction, manufacturing, and coal-fired electricity. This created the material base for rapid growth, but it also locked many communities, jobs, grids, and local budgets into high-carbon systems. The IEA reports that China's per-capita energy-related CO2 emissions in 2024 were 16% higher than those of advanced economies and nearly twice the global average (International Energy Agency, 2025). The adverse impact is therefore not caused by one sector alone. It comes from an interlinked system of power generation, steel, cement, transport, buildings, land use, and consumption patterns.",
            secondaryImage: "/images/sdg13/sdg13-solar-golmud.jpg",
            secondaryCaption: "Source: Planet Labs via Wikimedia Commons - Golmud solar farm, China",
          },
          {
            title: "Clean energy progress does not automatically erase risk",
            image: "/images/sdg13/image4.jpeg",
            imageCaption: "Visual: urban infrastructure and transport demand in a high-growth city",
            content:
              "China is also a major clean-energy investor. Solar, wind, batteries, electric vehicles, and grid technologies show that climate action can create prosperity rather than only sacrifice. However, renewable expansion does not immediately remove climate risk because existing fossil-fuel assets, urban heat exposure, industrial demand, and consumption patterns continue to shape emissions. The transition challenge is to make clean energy replace high-carbon activity, not simply grow beside it. This requires policy integration, technology, finance, behaviour change, and support for workers and regions affected by industrial restructuring.",
          },
        ],
      },
      {
        id: "china-climate-impact",
        label: "Adverse Impact in China",
        type: "challenges",
        intro:
          "The China case can be read through the rubric questions of why, how, and who. Climate pressure is rooted in emissions and development patterns, appears through heat, floods, drought, coastal exposure, and health impacts, and affects people unevenly depending on age, work, income, location, and institutional protection.",
        challenges: [
          {
            title: "Why: emissions, urbanisation, and locked-in infrastructure",
            image: "/images/sdg13/image3.png",
            imageCaption: "Visual: industrial emissions beside urban and agricultural land",
            content:
              "The root causes include global greenhouse gas accumulation and domestic development choices. Coal-fired electricity, heavy industry, urban construction, transport growth, and energy-intensive production all contribute to emissions. The IPCC states that human activities have unequivocally caused global warming, with global surface temperature reaching about 1.1 degrees Celsius above 1850-1900 levels in 2011-2020 (IPCC, 2023). In China, this scientific reality meets a development structure where some regions still depend on fossil-fuel industries for employment, revenue, and energy security. That makes climate action a social transition problem as well as an environmental problem.",
          },
          {
            title: "How: heat, coastal exposure, and health stress",
            image: "/images/sdg13/sdg13-heat-wave.jpg",
            imageCaption: "Source: NOAA/NWS via Wikimedia Commons - heat wave illustration",
            content:
              "Climate risk appears through more intense heat, flood exposure, drought, water stress, and coastal vulnerability. The World Bank warns that low-elevation coastal cities account for about one fifth of China's population and one third of its GDP, which makes sea-level rise and coastal flooding a major economic risk (World Bank Group, 2022). Health impacts are already visible. The 2023 China report of the Lancet Countdown estimated about 50,900 heatwave-related deaths in China in 2022, more than twice the number in 2021 (Zhang et al., 2023). These figures show that SDG 13 is not abstract: it affects bodies, homes, work hours, electricity demand, and public health systems.",
            secondaryImage: "/images/sdg13/sdg13-urban-heat-island.png",
            secondaryCaption: "Source: U.S. EPA via Wikimedia Commons - urban heat island profile",
          },
          {
            title: "Who: unequal exposure and unequal capacity to adapt",
            image: "/images/sdg13/image6.jpeg",
            imageCaption: "Visual: coastal and water-edge exposure as climate risk becomes spatial",
            content:
              "The people most affected are not always the people most responsible for emissions. Elderly people, children, outdoor workers, delivery riders, farmers, low-income households, and coastal residents often face higher exposure or weaker ability to adapt. Rural farmers face crop and water risks; coastal cities face flood and infrastructure pressure; workers in high-emission sectors face uncertainty during industrial transition. Governments, energy companies, construction firms, transport systems, schools, and households all shape whether climate policy becomes fair and practical. A just response must therefore combine mitigation with adaptation and social protection.",
          },
          {
            title: "What prosperity would look like",
            image: "/images/sdg13/image7.jpg",
            imageCaption: "Visual: public transport as a practical low-carbon prosperity pathway",
            content:
              "Prosperity under SDG 13 is not simply lower emissions. It also means cleaner air, safer cities, lower heat-health vulnerability, resilient food systems, efficient buildings, reliable public transport, and jobs in low-carbon industries. Climate action becomes credible when people can see these co-benefits in daily life. For China, this means using clean energy growth, urban planning, emergency warning systems, school education, and public participation to make the transition understandable and useful for ordinary communities.",
          },
        ],
      },
      {
        id: "climate-personal-response",
        label: "Personal Response",
        type: "action",
        action: "Build low-carbon and heat-safe routines",
        image: "/images/sdg13/image5.jpg",
        imageCaption: "Visual: small-scale planting and local adaptation practice",
        explanation:
          "A student or small group cannot solve national emissions alone, but it can turn SDG 13 into visible campus and community practice. The most useful response is to combine mitigation, adaptation, and communication: reduce avoidable emissions, prepare for climate hazards, and help people understand the data behind the risk.",
        mechanism:
          "First, measure a small set of behaviours such as transport mode, air-conditioning use, electricity use, food choices, and disposable consumption. Second, convert the data into weekly targets: use public transport or walking for short trips, keep air-conditioning at a reasonable setting, switch off idle devices, and reduce unnecessary purchases. Third, add adaptation actions such as heatwave reminders, hydration posters, shaded rest maps, and check-in plans for elderly people or outdoor workers. Finally, publish simple data cards so the campaign is based on evidence rather than slogans.",
        example:
          "A university campaign could run a two-week 'cool and low-carbon campus' project. Students would track electricity-saving actions, compare transport choices, publish a small dashboard, and distribute heat-safety guidance before hot days. The project could involve student unions, campus facility staff, teachers, nearby community centres, and local transport information. Its expected impact is modest but real: lower avoidable energy use, stronger heat-health awareness, and a habit of connecting personal choices with public resilience.",
        coBenefits: [
          {
            title: "Lower emissions",
            desc: "Transport, electricity, food, and consumption choices reduce avoidable carbon output when repeated as habits.",
          },
          {
            title: "Health protection",
            desc: "Heat-safety reminders, hydration, shade maps, and check-ins reduce risk for vulnerable people during extreme heat.",
          },
          {
            title: "Better climate literacy",
            desc: "Data cards and visual explanations help classmates understand why climate action is a practical issue, not only a political debate.",
          },
          {
            title: "Community resilience",
            desc: "Students can connect campus action with local residents, outdoor workers, and public services before extreme weather occurs.",
          },
        ],
      },
      {
        id: "references",
        label: "References",
        type: "references",
        references: [
          "Intergovernmental Panel on Climate Change. (2023). Climate change 2023: Synthesis report. https://www.ipcc.ch/report/ar6/syr/",
          "International Energy Agency. (2025). Global energy review 2025: Key findings. https://www.iea.org/reports/global-energy-review-2025/key-findings",
          "International Energy Agency. (n.d.). China: Countries and regions. https://www.iea.org/countries/china",
          "United Nations Department of Economic and Social Affairs. (n.d.). Goal 13: Take urgent action to combat climate change and its impacts. https://sdgs.un.org/goals/goal13",
          "World Meteorological Organization. (2025). State of the global climate 2024. https://wmo.int/publication-series/state-of-global-climate/state-of-global-climate-2024",
          "World Bank Group. (2022). China country climate and development report. https://www.worldbank.org/en/country/china/publication/china-country-climate-and-development-report",
          "Zhang, S., Zhang, C., Cai, W., Bai, Y., Callaghan, M., Chang, N., Chen, B., et al. (2023). The 2023 China report of the Lancet Countdown on health and climate change. The Lancet Public Health, 8(12), e978-e995. https://doi.org/10.1016/S2468-2667(23)00245-1",
          "Wikimedia Commons contributors. (n.d.). Shuozhou coal power plant [Photograph]. https://commons.wikimedia.org/wiki/File:Shuozhou_coal_power_plant.JPG",
          "Planet Labs. (n.d.). Chinese Solar Farm, Golmud, China [Satellite image]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Chinese_Solar_Farm,_Golmud,_China_by_Planet_Labs.jpg",
          "National Oceanic and Atmospheric Administration. (n.d.). Heat Wave [Illustration]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Heat_Wave.jpg",
          "U.S. Environmental Protection Agency. (n.d.). Urban heat island profile [Illustration]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Urban_heat_island_(Celsius).png",
        ],
      },
    ],
  },
  16: {
    number: "SDG 16",
    title: "Peace, Justice and Strong Institutions",
    subtitle: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable institutions.",
    color: "from-blue-400/20 to-indigo-500/10",
    borderColor: "border-blue-400/30",
    textColor: "text-blue-200/80",
    heroGradient: "radial-gradient(circle_at_50%_30%,rgba(96,165,250,0.18)_0%,rgba(96,165,250,0.06)_40%,transparent_70%)",
    overview:
      "SDG 16 aims to promote peaceful and inclusive societies, provide access to justice for all, and build effective, accountable, and inclusive institutions (United Nations Department of Economic and Social Affairs, n.d.). In this project, the China case focuses on telecom and online fraud because digital scams turn weak information protection, illicit money movement, and low digital literacy into a justice problem. Victims need safe reporting routes, fast institutional response, and public trust in police, courts, prosecutors, banks, telecom operators, and online platforms. This makes SDG 16 visible in everyday digital life rather than only in conflict or courtroom settings.",
    targets: [
      "Significantly reduce all forms of violence and related death rates everywhere",
      "End abuse, exploitation, trafficking, and all forms of violence against children",
      "Promote the rule of law at the national and international levels and ensure equal access to justice",
      "Significantly reduce illicit financial and arms flows and combat organized crime",
      "Substantially reduce corruption and bribery in all their forms",
      "Ensure responsive, inclusive, participatory, and representative decision-making",
    ],
    facts: [
      "China prosecuted 78,000 people for telecom fraud crimes in 2024, a 53.9% increase from the previous year (Supreme People's Procuratorate, 2025).",
      "Chinese courts concluded about 40,000 telecom and online fraud cases in 2024, involving about 82,000 people (Supreme People's Procuratorate, 2025).",
      "Public security organs resolved nearly 1.95 million telecom and online fraud cases over a five-year period (Ministry of Public Security, 2024).",
      "China's Anti-Telecom and Online Fraud Law took effect on December 1, 2022 and covers telecommunications, finance, internet governance, and comprehensive measures (Ministry of Justice of China, 2023).",
      "Students, elderly people, job seekers, online shoppers, and people with limited digital literacy can be especially vulnerable to emotional pressure, phishing links, impersonation scams, and fake investment schemes.",
    ],
    dataViz: {
      title: "Digital justice can be tracked through enforcement signals.",
      copy:
        "Telecom and online fraud data shows why SDG 16 matters in everyday digital life. The bars make the institutional response visible: prosecutions, court cases, and long-term police resolution work.",
      source: "Supreme People's Procuratorate, 2025; Ministry of Public Security, 2024; Ministry of Justice of China, 2023.",
      stats: [
        { value: "78,000", label: "People prosecuted for telecom fraud crimes, 2024" },
        { value: "40,000", label: "Telecom and online fraud cases concluded by courts, 2024" },
        { value: "1.95M", label: "Cases resolved by public security organs over five years" },
      ],
      charts: [
        {
          type: "bar",
          title: "Telecom fraud prosecutions",
          unit: "thousand people",
          yMax: 90,
          source: "Supreme People's Procuratorate, 2025. 2023 value is inferred from the reported 53.9% year-on-year increase.",
          bars: [
            { label: "2023", value: 50.7 },
            { label: "2024", value: 78 },
          ],
        },
        {
          type: "bar",
          title: "2024 enforcement snapshot",
          unit: "thousand",
          yMax: 90,
          source: "Supreme People's Procuratorate, 2025; Ministry of Public Security, 2024. Five-year resolved cases are scaled to fit this panel.",
          bars: [
            { label: "Prosecuted people", value: 78 },
            { label: "Court cases", value: 40 },
            { label: "Five-year resolved cases", value: 1950, displayValue: "1.95M", scaledValue: 90 },
          ],
        },
      ],
    },
    connections: "Peace and justice are foundational enablers for the entire SDG framework. Conflict destroys infrastructure (SDG 9), displaces communities from homes (SDG 11), disrupts food systems (SDG 2), and prevents children from attending school (SDG 4). Without accountable institutions, investments in health, education, and climate all face systemic barriers.",
    richSections: [
      {
        id: "digital-justice-context",
        label: "Digital Justice Context",
        type: "challenges",
        intro:
          "SDG 16 is often associated with courts, conflict, corruption, and public institutions, but in China it can also be seen through everyday digital safety. Telecom and online fraud show how peace, justice, and strong institutions now depend on trustworthy payment systems, data protection, platform governance, and fast reporting channels.",
        challenges: [
          {
            title: "Digital life expands the surface of fraud",
            image: "/images/sdg16/sdg16-mobile-pay-qr.jpg",
            imageCaption: "Source: Wikimedia Commons - QR codes for mobile pay in China",
            content:
              "China's highly connected digital economy makes daily life convenient, but it also creates many entry points for fraud. Mobile payments, online shopping, social media, job platforms, delivery services, and investment apps all rely on trust between users, companies, and institutions. When criminals impersonate officials, sellers, employers, delivery services, banks, or friends, they exploit that trust and move victims quickly toward transfers, passwords, verification codes, or loans. China's Anti-Telecom and Online Fraud Law, which took effect on December 1, 2022, responds to this risk by covering telecommunications, finance, internet services, information protection, monitoring, prevention, and penalties (Ministry of Justice of China, 2023).",
          },
          {
            title: "Strong institutions have to coordinate",
            image: "/images/sdg16/sdg16-digital-justice-gavel.jpg",
            imageCaption: "Source: Pexels - Sora Shimazaki, legal technology and gavel",
            content:
              "Telecom and online fraud cannot be handled by one agency alone. Police need to investigate networks and freeze suspicious flows; prosecutors need to bring cases; courts need to judge evidence; banks and payment platforms need to detect abnormal transactions; telecom operators and internet companies need to reduce spoofing, phishing, and illegal accounts. This is why SDG 16 Target 16.3 on access to justice, Target 16.4 on illicit financial flows and organized crime, and Target 16.6 on accountable institutions are directly connected to digital fraud prevention (United Nations Department of Economic and Social Affairs, n.d.). Public security organs reported resolving nearly 1.95 million telecom and online fraud cases over a five-year campaign, showing that institutional coordination is already a major part of the response (Ministry of Public Security, 2024).",
          },
        ],
      },
      {
        id: "china-digital-fraud-impact",
        label: "Adverse Impact in China",
        type: "challenges",
        intro:
          "The harm is not only financial. Telecom and online fraud can damage household savings, mental health, privacy, social trust, and confidence in digital services. It affects people unevenly because vulnerability depends on age, income, digital literacy, emotional pressure, and access to reliable help.",
        challenges: [
          {
            title: "The pressure starts before the crime is visible",
            image: "/images/sdg16/sdg16-phone-scam.jpg",
            imageCaption: "Source: Pexels - Mikhail Nilov, phone scam scenario",
            content:
              "The root causes include fast digital adoption, personal information leakage, cross-platform payment tools, social engineering, and unequal digital literacy. Scammers often create urgency: a fake refund must be accepted now, a fake police investigation must stay secret, a fake job deposit must be paid first, or a fake investment opportunity will disappear. These scripts work because they combine technical tools with emotional pressure. The 2022 anti-fraud law treats telecom fraud as a cross-sector issue involving communication services, financial accounts, internet platforms, personal information protection, and public education, which shows that the problem is institutional as well as individual (Ministry of Justice of China, 2023; Library of Congress, 2023).",
          },
          {
            title: "The impact appears in courts, accounts, and everyday fear",
            image: "/images/sdg16/sdg16-fraud-sign.jpg",
            imageCaption: "Source: Pexels - Tima Miroshnichenko, fraud sign",
            content:
              "The scale is large enough to make digital fraud a public justice issue. China prosecuted 78,000 people for telecom fraud crimes in 2024, a 53.9% increase from the previous year (Supreme People's Procuratorate of the People's Republic of China, 2025). Chinese courts also concluded about 40,000 telecom and online fraud cases in 2024 involving about 82,000 people (Supreme People's Procuratorate of the People's Republic of China, 2025). Behind those numbers are victims who may lose tuition savings, medical money, rent, wages, or family funds. Even when money is partly recovered, the experience can make people afraid of online payment, suspicious of real institutions, and less willing to participate confidently in digital society.",
            secondaryImage: "/images/sdg16/sdg16-fraud-cash.jpg",
            secondaryCaption: "Source: Pexels - Tima Miroshnichenko, financial fraud visual",
          },
          {
            title: "Responsibility is shared across society",
            image: "/images/sdg16/sdg16-lady-justice.jpg",
            imageCaption: "Source: Pexels - Karola G, Lady Justice",
            content:
              "The people most affected include students looking for part-time jobs, elderly people facing impersonation scams, job seekers, small merchants, online shoppers, migrant workers, and people with limited experience checking official sources. The actors responsible include criminal networks, illegal data sellers, account-renting intermediaries, and platform loopholes that allow suspicious accounts or links to circulate. Government agencies, prosecutors, courts, banks, telecom operators, schools, community groups, and internet companies also shape the outcome because prevention depends on warnings, frozen transfers, verified reporting channels, evidence collection, prosecution, and public education. A strong SDG 16 response therefore means building trust through prevention before people become victims, not only punishment after harm happens.",
          },
          {
            title: "Prosperity means safer participation in digital life",
            image: "/images/sdg16/sdg16-cybersecurity.png",
            imageCaption: "Source: Wikimedia Commons - cybersecurity illustration",
            content:
              "For SDG 16, prosperity is not only the absence of crime. It means students can search for jobs without fear, elderly people can use mobile payment with confidence, small businesses can trade online safely, and victims can report fraud without shame or confusion. It also means institutions become visible and responsive: warnings arrive before risky transfers, banks explain freezes clearly, platforms remove suspicious accounts quickly, and communities know where to ask for help. In this sense, digital justice turns institutional strength into something people can feel in ordinary decisions.",
          },
        ],
      },
      {
        id: "digital-justice-response",
        label: "Personal Response",
        type: "action",
        action: "Build a pause-before-transfer anti-fraud toolkit",
        image: "/images/sdg16/sdg16-cyber-monitor.jpg",
        imageCaption: "Source: Pexels - Tima Miroshnichenko, cybersecurity monitors",
        explanation:
          "A student group cannot replace police, banks, courts, or platforms, but it can reduce vulnerability by making anti-fraud knowledge practical. The response should focus on moments when people are about to act under pressure: clicking a link, sharing a code, sending a deposit, transferring money, or following instructions from someone claiming authority.",
        mechanism:
          "The group could design a small anti-fraud toolkit with three parts. First, create scenario cards for common scams such as fake refunds, fake police calls, fake part-time jobs, fake investment groups, package delivery links, and account-verification messages. Second, build a one-page checklist that asks: Who contacted me, what do they want, why is it urgent, what official channel can I verify, and who can I call before paying? Third, connect the checklist to trusted reporting routes such as campus security, local police anti-fraud guidance, bank hotlines, and official platform reporting pages.",
        example:
          "On campus, the project could become a monthly digital-safety table with role-play conversations, QR-code examples, poster cards, and short talks in dorms or classrooms. Students could invite a bank staff member, a campus security officer, or a local community worker to explain how suspicious transfers are frozen and what evidence victims should save. The expected impact is practical: fewer impulsive transfers, faster reporting, less victim-blaming, stronger peer support, and better trust between students and institutions.",
        coBenefits: [
          {
            title: "Financial protection",
            desc: "A simple pause-and-verify habit helps people avoid panic transfers, fake deposits, and risky investment messages.",
          },
          {
            title: "Faster reporting",
            desc: "Clear reporting routes make it easier for victims to preserve screenshots, transaction records, phone numbers, and chat histories.",
          },
          {
            title: "Digital literacy",
            desc: "Scenario practice teaches students and families to recognise social engineering, phishing links, impersonation, and suspicious urgency.",
          },
          {
            title: "Institutional trust",
            desc: "When schools, banks, platforms, and public agencies communicate clearly, justice feels closer and more usable.",
          },
        ],
      },
      {
        id: "references",
        label: "References",
        type: "references",
        references: [
          "Library of Congress. (2023, January 31). China: New law takes effect to combat telecom and online fraud. https://www.loc.gov/item/global-legal-monitor/2023-01-31/china-new-law-takes-effect-to-combat-telecom-and-online-fraud/",
          "Ministry of Justice of China. (2023, December 15). Anti-Telecom and Online Fraud Law of the People's Republic of China. https://en.moj.gov.cn/2023-12/15/c_948363.htm",
          "Ministry of Public Security of the People's Republic of China. (2024, May 31). Major success in combating telecom and online fraud. https://www.mps.gov.cn/n2255079/n6865805/n7355748/n7355823/c9594173/content.html",
          "Supreme People's Procuratorate of the People's Republic of China. (2025, March 8). China intensifies crackdown on telecom fraud crimes in 2024. https://en.spp.gov.cn/2025-03/08/c_1076764.htm",
          "Supreme People's Procuratorate of the People's Republic of China. (2025, March 8). Courts handle more telecom, fraud cases. https://en.spp.gov.cn/2025-03/08/c_1076747.htm",
          "United Nations Department of Economic and Social Affairs. (n.d.). Goal 16: Peace, justice and strong institutions. https://sdgs.un.org/goals/goal16",
          "Karola G. (n.d.). Figurine of the Lady Justice on a table [Photograph]. Pexels. https://www.pexels.com/photo/figurine-of-the-lady-justice-on-a-table-7876148/",
          "Mikhail Nilov. (n.d.). Shocked man staring wide-eyed on a computer [Photograph]. Pexels. https://www.pexels.com/photo/shocked-man-staring-wide-eyed-on-a-computer-6964367/",
          "Sora Shimazaki. (n.d.). Professional male judge working on laptop with gavel [Photograph]. Pexels. https://www.pexels.com/photo/professional-male-judge-working-on-laptop-with-gavel-5668772/",
          "Tima Miroshnichenko. (n.d.). A person with handcuffs holding a sign that says fraud [Photograph]. Pexels. https://www.pexels.com/photo/a-person-with-handcuffs-holding-a-sign-that-says-fraud-6266506/",
          "Tima Miroshnichenko. (n.d.). Close-up shot of system hacking [Photograph]. Pexels. https://www.pexels.com/photo/close-up-shot-of-system-hacking-5380792/",
          "Tima Miroshnichenko. (n.d.). Man in black sweater holding money [Photograph]. Pexels. https://www.pexels.com/photo/man-in-black-sweater-holding-money-6266308/",
          "Wikimedia Commons contributors. (n.d.). Cybersecurity [Illustration]. https://commons.wikimedia.org/wiki/File:Cybersecurity.png",
          "Wikimedia Commons contributors. (n.d.). QR codes for mobile pay in China [Photograph]. https://commons.wikimedia.org/wiki/File:QR_codes_for_mobile_pay_in_China.jpg",
        ],
      },
    ],
  },
};
