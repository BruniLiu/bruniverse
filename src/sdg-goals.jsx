import React from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import {
  fadeUp,
  GlassPanel,
  HeroSection,
  PageSection,
  PillLink,
  SectionHeader,
  StaticPageShell,
} from "./pages/AssessmentLayout";
import { rubricGoalSections } from "./pages/rubricGoalData";
import { allSdgGoals, sdgAgenda } from "./pages/siteData";

const selectedReports = [
  {
    number: "04",
    title: "Quality Education",
    theme: "Education as Empowerment",
    href: "./sdg-4.html",
    roleModel: "Malala Yousafzai",
    targets: ["Target 4.1", "Target 4.5"],
    focus:
      "China has expanded education access, but rural and low-income learners can still face weaker teacher support, digital access, and enrichment resources.",
    impact: "Unequal access to quality education between urban and rural communities.",
    response: "Open learning resources, peer tutoring, and digital literacy workshops.",
    metric: {
      value: "298M",
      label: "children educated in China, with equity and quality still central challenges",
      source: "UNICEF China",
      fill: 96,
    },
  },
  {
    number: "13",
    title: "Climate Action",
    theme: "Climate Action as Shared Responsibility",
    href: "./sdg-13.html",
    roleModel: "Christiana Figueres",
    targets: ["Target 13.1", "Target 13.2", "Target 13.3"],
    focus:
      "Climate action connects scientific evidence, public policy, community resilience, and low-carbon everyday behaviour.",
    impact: "Extreme heat, flood exposure, coastal vulnerability, and emissions pressure.",
    response: "Climate literacy, low-carbon transport, heat-health protection, and campus action.",
    metric: {
      value: "50,900",
      label: "estimated heatwave-related deaths in China in 2022",
      source: "Zhang et al., 2023",
      fill: 84,
    },
  },
  {
    number: "02",
    title: "Zero Hunger",
    theme: "Food Security Through Innovation and Waste Reduction",
    href: "./sdg-2.html",
    roleModel: "Yuan Longping",
    targets: ["Target 2.1", "Target 2.2", "Target 2.4"],
    focus:
      "Food security depends on nutritious diets, sustainable farming, responsible consumption, and reducing avoidable food waste.",
    impact: "Food waste and sustainable food security pressure in China.",
    response: "Measure food waste, reduce portions and leftovers, and run student-facing awareness campaigns.",
    metric: {
      value: "35M+",
      label: "tonnes of food lost or wasted in China annually",
      source: "IFAD, 2020",
      fill: 82,
    },
  },
  {
    number: "16",
    title: "Peace, Justice and Strong Institutions",
    theme: "Justice in the Digital Age",
    href: "./sdg-16.html",
    roleModel: "Nadia Murad",
    targets: ["Target 16.3", "Target 16.4", "Target 16.6"],
    focus:
      "Strong institutions are framed as protection from digital harm, fraud, identity misuse, and loss of public trust.",
    impact: "Telecom and online fraud affecting students and ordinary citizens in China.",
    response: "Anti-fraud scenario cards, verification habits, peer education, and clear reporting routes.",
    metric: {
      value: "78,000",
      label: "people prosecuted for telecom fraud crimes in China in 2024",
      source: "Supreme People's Procuratorate, 2025",
      fill: 88,
    },
  },
];

const selectedGoalNumbers = new Set(selectedReports.map((report) => report.number));

const guidanceReasons = [
  {
    title: "Shared language",
    copy: "The SDGs turn broad ethical problems into named priorities, targets, evidence, and actions that different communities can discuss together.",
  },
  {
    title: "Connected systems",
    copy: "Education, climate, health, justice, poverty, and equality shape one another. The framework helps explain these links instead of isolating each issue.",
  },
  {
    title: "Evidence and accountability",
    copy: "The goals invite users to compare data, identify adverse impacts, and ask whether policy and community action are improving real lives.",
  },
  {
    title: "Local response",
    copy: "A global agenda becomes practical when students translate it into resource pages, workshops, awareness campaigns, and everyday decisions.",
  },
];

const frameworkPillars = [
  {
    label: "People",
    goals: "01-05",
    count: 5,
    copy: "Poverty, hunger, health, education, and gender equality.",
  },
  {
    label: "Planet",
    goals: "06, 12-15",
    count: 5,
    copy: "Water, consumption, climate, oceans, land, and biodiversity.",
  },
  {
    label: "Prosperity",
    goals: "07-11",
    count: 5,
    copy: "Energy, work, infrastructure, inequality, and sustainable cities.",
  },
  {
    label: "Peace",
    goals: "16",
    count: 1,
    copy: "Justice, safety, trust, and accountable institutions.",
  },
  {
    label: "Partnership",
    goals: "17",
    count: 1,
    copy: "Implementation through cooperation, finance, and shared capacity.",
  },
];

const rubricSections = [
  {
    member: "Elvira (Zheng Xinyao)",
    number: "04",
    title: "SDG 4: Quality Education",
    theme: "Education as Empowerment",
    href: "./sdg-4.html",
    purpose:
      "SDG 4 aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. By 2030, it seeks to help all girls and boys complete free, equitable, and quality primary and secondary education with relevant learning outcomes. Target 4.1 focuses on free, equitable, and quality primary and secondary education, while Target 4.5 aims to eliminate disparities and ensure equal access for vulnerable learners (United Nations, n.d.). This goal also supports literacy, digital skills, vocational training, and education for sustainable development.",
    adverseTitle: "Unequal access to quality education in China",
    adverse: {
      why:
        "The issue is driven by regional development gaps, decentralised education financing, uneven teacher distribution, household income differences, and digital inequality. UNICEF China identifies education disparities as a major challenge, especially for rural children and learners affected by location, wealth, and migration status (UNICEF China, n.d.).",
      how:
        "China educates more than 298 million children, but school enrolment alone does not guarantee equal learning outcomes (UNICEF China, n.d.). Rural or low-income students may have weaker access to experienced teachers, stable internet, devices, extracurricular support, and family academic guidance, creating a long-term opportunity gap.",
      who:
        "Rural students, low-income students, migrant children, left-behind children, under-resourced schools, teachers, families, and local communities are most affected. Local governments, schools, households, and digital infrastructure providers all shape whether education access becomes equal in practice.",
    },
    response: [
      {
        title: "Open learning resources",
        copy:
          "Create a mobile-friendly resource page with study guides, vocabulary lists, exam tips, digital literacy notes, and downloadable materials for students with unstable internet access.",
      },
      {
        title: "Peer tutoring",
        copy:
          "Organise university-student tutoring sessions in English, mathematics, study planning, and confidence-building for younger students in under-resourced communities.",
      },
      {
        title: "Digital inclusion workshops",
        copy:
          "Teach students how to search reliable information, use online learning tools, prepare presentations, manage files, and protect personal information.",
      },
    ],
    expectedImpact:
      "These actions can reduce information barriers, improve digital participation, and give disadvantaged learners more practical support for moving from adversity toward opportunity and social mobility.",
    references: [
      "Guo, C., & Wan, B. (2022). The digital divide in online learning in China during the COVID-19 pandemic. Technology in Society, 71, Article 102122. https://doi.org/10.1016/j.techsoc.2022.102122",
      "UNICEF China. (n.d.). Education. https://www.unicef.cn/en/what-we-do/education",
      "United Nations. (n.d.). Goal 4: Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. https://sdgs.un.org/goals/goal4",
    ],
  },
  {
    member: "Janet (Hou Yuheng)",
    number: "13",
    title: "SDG 13: Climate Action",
    theme: "Climate Action as Shared Responsibility",
    href: "./sdg-13.html",
    purpose:
      "SDG 13 calls for urgent action to combat climate change and its impacts. By 2030, countries are expected to strengthen resilience to climate-related hazards, integrate climate measures into national planning, and improve climate education and capacity. Target 13.1 focuses on resilience and adaptive capacity, Target 13.2 focuses on policy integration, and Target 13.3 focuses on education and awareness (United Nations, n.d.). The goal links scientific evidence, public policy, community preparedness, and everyday behaviour change.",
    adverseTitle: "Climate risks and carbon emissions in China",
    adverse: {
      why:
        "The problem is caused by global greenhouse gas emissions and domestic development patterns, including energy demand, coal use, industry, transport, construction, and rapid urban growth. The IPCC states that human activities have unequivocally caused global warming, with global surface temperature reaching 1.1 degrees Celsius above 1850-1900 levels in 2011-2020 (IPCC, 2023).",
      how:
        "China faces extreme heat, drought, coastal flood exposure, water stress, and pressure to accelerate low-carbon transition. Coastal cities exposed to sea-level rise and flooding account for one fifth of China's population and one third of its GDP (World Bank Group, 2022). Heatwave-related mortality in China was estimated at about 50,900 deaths in 2022 (Zhang et al., 2023).",
      who:
        "Energy producers, heavy industry, transport systems, construction sectors, urban planners, businesses, consumers, and public institutions all contribute to or manage the problem. Urban residents, coastal communities, rural farmers, elderly people, outdoor workers, children, and low-income households are especially affected.",
    },
    response: [
      {
        title: "Climate literacy",
        copy:
          "Build simple data cards and campus materials explaining carbon footprints, heat risks, flood preparedness, and low-carbon choices.",
      },
      {
        title: "Low-carbon routines",
        copy:
          "Promote public transport, walking, cycling, electricity saving, and lower-carbon consumption through student pledges and visible campus campaigns.",
      },
      {
        title: "Heat-health protection",
        copy:
          "Share early-warning information, cooling-space guidance, hydration reminders, and check-in plans for elderly people and outdoor workers.",
      },
    ],
    expectedImpact:
      "The response turns climate risk from a distant global issue into practical mitigation, adaptation, and community resilience work that students can help organise.",
    references: [
      "Intergovernmental Panel on Climate Change. (2023). Climate change 2023: Synthesis report. https://www.ipcc.ch/report/ar6/syr/",
      "World Bank Group. (2022). China country climate and development report. https://www.worldbank.org/en/country/china/publication/china-country-climate-and-development-report",
      "Zhang, S., Zhang, C., Cai, W., Bai, Y., Callaghan, M., Chang, N., Chen, B., et al. (2023). The 2023 China report of the Lancet Countdown on health and climate change. The Lancet Public Health, 8(12), e978-e995. https://doi.org/10.1016/S2468-2667(23)00245-1",
      "United Nations. (n.d.). Goal 13: Take urgent action to combat climate change and its impacts. https://sdgs.un.org/goals/goal13",
    ],
  },
  {
    member: "Irene (Han Yutong)",
    number: "02",
    title: "SDG 2: Zero Hunger",
    theme: "Food Security Through Innovation and Waste Reduction",
    href: "./sdg-2.html",
    purpose:
      "SDG 2 aims to end hunger, achieve food security and improved nutrition, and promote sustainable agriculture. By 2030, it seeks to ensure year-round access to safe, nutritious, and sufficient food for all people, especially poor and vulnerable groups. Target 2.1 focuses on ending hunger, Target 2.2 focuses on ending all forms of malnutrition, and Target 2.4 calls for sustainable and resilient food production systems (United Nations, n.d.). This goal asks communities to consider the whole food system: production, distribution, consumption, nutrition, and sustainability.",
    adverseTitle: "Food waste and sustainable food security pressure in China",
    adverse: {
      why:
        "Food waste is driven by rapid urbanisation, income growth, eating out, takeaway platforms, banquets, over-ordering, and cultural pressure to show hospitality through abundant food. Food can also be lost before consumption through harvesting, storage, transport, processing, cold-chain gaps, and market standards for appearance. Feng et al. (2022) explain that cultural practices such as face-saving behaviour can make restaurant food waste difficult to reduce through voluntary action alone.",
      how:
        "IFAD reports that more than 35 million tonnes of food are lost or wasted in China annually, enough to feed 30 to 50 million people, with about 17 to 18 million tonnes wasted at the retail or consumption stage (IFAD, 2020). Globally, 1.052 billion tonnes of food were wasted at retail, food service, and household levels in 2022, including 631 million tonnes from households (UNEP, 2024). This wastes land, water, energy, labour, packaging, and emissions embedded in food that is never eaten.",
      who:
        "Consumers, students, households, restaurants, canteens, retailers, food producers, farmers, logistics providers, local governments, vulnerable communities, and future generations are affected. China's Anti-Food Waste Law aims to prevent food waste, safeguard national food security, conserve resources, protect the environment, and promote sustainable development (Standing Committee of the National People's Congress, 2021).",
    },
    response: [
      {
        title: "Measure food waste",
        copy:
          "Record personal or canteen food waste for one week, including food type, estimated amount, reason for waste, and a realistic prevention method.",
      },
      {
        title: "Reduce through planning",
        copy:
          "Use meal planning, smaller portions, refill-first canteen habits, fewer excessive dishes in group meals, and clear leftover packing options.",
      },
      {
        title: "Share awareness",
        copy:
          "Create posters, short videos, canteen data boards, and student pledges that connect daily meals with SDG 2 and the Act Now action: Throw away less food.",
      },
    ],
    expectedImpact:
      "These actions make food waste visible, reduce avoidable consumption-stage waste, respect farmers' labour, lower household spending, and help students move from passive awareness to practical food-system responsibility.",
    references: [
      "Feng, Y., Marek, C., & Tosun, J. (2022). Fighting food waste by law: Making sense of the Chinese approach. Journal of Consumer Policy, 45, 457-479. https://doi.org/10.1007/s10603-022-09519-2",
      "International Fund for Agricultural Development. (2020, September 29). Fighting food waste in China: Local efforts, global effects. https://www.ifad.org/en/w/opinions/fighting-food-waste-in-china-local-efforts-global-effects",
      "Standing Committee of the National People's Congress. (2021). Law of the People's Republic of China on food waste. https://en.npc.gov.cn.cdurl.cn/2021-04/29/c_689496.htm",
      "United Nations. (n.d.). Goal 2: End hunger, achieve food security and improved nutrition and promote sustainable agriculture. https://sdgs.un.org/goals/goal2",
      "United Nations Environment Programme. (2024). Food Waste Index Report 2024. https://www.unep.org/resources/publication/food-waste-index-report-2024",
    ],
  },
  {
    member: "Bruni (Liu Xiangyi)",
    number: "16",
    title: "SDG 16: Peace, Justice and Strong Institutions",
    theme: "Justice in the Digital Age",
    href: "./sdg-16.html",
    purpose:
      "SDG 16 aims to promote peaceful and inclusive societies, provide access to justice for all, and build effective, accountable, and inclusive institutions. By 2030, it seeks to reduce violence and organised crime, strengthen the rule of law, improve transparent institutions, and protect public access to information. Target 16.3 focuses on rule of law and equal access to justice, Target 16.4 addresses illicit financial flows and organised crime, and Target 16.6 focuses on effective and accountable institutions (United Nations Department of Economic and Social Affairs, n.d.). In a digital society, this goal also includes protection from online harm and fraud.",
    adverseTitle: "Telecom and online fraud in China",
    adverse: {
      why:
        "Telecom and online fraud expands because daily life increasingly depends on mobile payment, online shopping, social media, digital identity, online banking, and job platforms. Fraudsters exploit urgency, fear, trust, authority, and information gaps, which means prevention requires legal literacy, platform governance, public education, and coordinated enforcement.",
      how:
        "China prosecuted 78,000 people for telecom fraud crimes in 2024, a 53.9% increase from the previous year, and courts concluded 40,000 telecom fraud cases involving 82,000 people (Supreme People's Procuratorate, 2025). Public security organs also resolved nearly 1.95 million telecom and online fraud cases over a five-year period (Ministry of Public Security, 2024).",
      who:
        "Students, elderly people, low-income workers, online shoppers, job seekers, small business owners, and people with limited digital literacy are affected. Police, prosecutors, courts, banks, telecom operators, online platforms, universities, and families all have roles in prevention, reporting, investigation, and victim support.",
    },
    response: [
      {
        title: "Scenario cards",
        copy:
          "Design short cards for fake part-time jobs, fake customer-service refunds, fake loans, impersonation scams, phishing links, and investment scams.",
      },
      {
        title: "Pause-before-transfer checklist",
        copy:
          "Teach students to ask who is requesting money, why it is urgent, what evidence exists, and which official channel can verify it.",
      },
      {
        title: "Peer education and reporting routes",
        copy:
          "Run peer-led sessions with realistic screenshots, role-play, campus security contacts, counselling support, and official anti-fraud reporting information.",
      },
    ],
    expectedImpact:
      "The toolkit turns fear into practical guardianship: students can recognise fraud patterns earlier, reduce shame around reporting, and seek help faster through institutional channels.",
    references: [
      "Ministry of Public Security of the People's Republic of China. (2024, May 31). Major success in combating telecom and online fraud. https://www.mps.gov.cn/n2255079/n6865805/n7355748/n7355823/c9594173/content.html",
      "Supreme People's Procuratorate of the People's Republic of China. (2025, March 8). China intensifies crackdown on telecom fraud crimes in 2024. https://en.spp.gov.cn/2025-03/08/c_1076764.htm",
      "United Nations Department of Economic and Social Affairs. (n.d.). Goal 16: Peace, justice and strong institutions. https://sdgs.un.org/goals/goal16",
    ],
  },
];

function AnimatedBar({ fill, shouldReduceMotion, delay = 0 }) {
  const scale = Math.max(0.05, Math.min(fill, 100)) / 100;

  return (
    <div className="mt-5 h-1.5 overflow-hidden rounded-full border border-white/10 bg-white/[0.045]">
      <motion.div
        className="h-full rounded-full"
        style={{ background: "var(--apple-fg)", transformOrigin: "left" }}
        initial={{ scaleX: shouldReduceMotion ? scale : 0 }}
        whileInView={{ scaleX: scale }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: [0.23, 1, 0.32, 1], delay }}
      />
    </div>
  );
}

function PillarDistribution({ shouldReduceMotion }) {
  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="grid gap-3 lg:grid-cols-5">
      {frameworkPillars.map((pillar, index) => (
        <div
          key={pillar.label}
          className="rounded-lg border border-white/10 bg-white/[0.035] p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-sky-100/62">{pillar.label}</p>
              <p className="mt-2 text-3xl font-bold tabular-nums text-white">{pillar.count}</p>
            </div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-semibold text-white/48">
              {pillar.goals}
            </span>
          </div>
          <AnimatedBar fill={(pillar.count / 5) * 100} shouldReduceMotion={shouldReduceMotion} delay={index * 0.05} />
          <p className="mt-5 text-xs font-medium leading-5 text-white/50">{pillar.copy}</p>
        </div>
      ))}
    </motion.div>
  );
}

function EvidenceDashboard({ shouldReduceMotion }) {
  return (
    <motion.div variants={fadeUp(shouldReduceMotion)} className="grid gap-3 lg:grid-cols-4">
      {selectedReports.map((report, index) => (
        <article key={report.number} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold uppercase text-sky-100/62">SDG {report.number}</p>
            <span className="text-xs font-semibold text-white/36">{report.metric.source}</span>
          </div>
          <p className="mt-6 text-4xl font-bold leading-none tracking-normal text-white">
            {report.metric.value}
          </p>
          <p className="mt-4 text-sm font-medium leading-6 text-white/58">{report.metric.label}</p>
          <AnimatedBar fill={report.metric.fill} shouldReduceMotion={shouldReduceMotion} delay={index * 0.08} />
        </article>
      ))}
    </motion.div>
  );
}

function ResearchGoalSection({ section, shouldReduceMotion }) {
  const summary = selectedReports.find((report) => report.number === section.number);

  return (
    <motion.article
      variants={fadeUp(shouldReduceMotion)}
      className="min-w-0 rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase text-sky-100/62">
            SDG {section.number} case
          </p>
          <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">
            {section.title}
          </h3>
          <p className="mt-2 text-sm font-semibold text-white/42">{section.theme}</p>
        </div>
        <a
          href={section.href}
          className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-sky-100/76 transition hover:border-white/20 hover:text-sky-100"
        >
          Open full page
        </a>
      </div>

      <div className="mt-8 grid gap-5">
        <div className="border-t border-white/10 pt-5">
          <p className="text-[11px] font-semibold uppercase text-white/30">
            The goal
          </p>
          <p className="mt-3 text-base font-semibold text-white">{section.title}</p>
        </div>

        <div className="border-t border-white/10 pt-5">
          <p className="text-[11px] font-semibold uppercase text-white/30">
            2030 purpose
          </p>
          <p className="mt-3 max-w-4xl break-words text-sm font-medium leading-6 text-white/62">
            {section.purpose}
          </p>
          {summary?.targets && (
            <div className="mt-4 flex flex-wrap gap-2">
              {summary.targets.map((target) => (
                <span
                  key={target}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/44"
                >
                  {target}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-white/10 pt-5">
          <p className="text-[11px] font-semibold uppercase text-white/30">
            Pressure in China
          </p>
          <h4 className="mt-3 text-xl font-bold leading-tight text-white">{section.adverseTitle}</h4>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {[
              ["Root causes", section.adverse.why],
              ["What it looks like", section.adverse.how],
              ["People and power", section.adverse.who],
            ].map(([label, copy]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase text-sky-100/62">{label}</p>
                <p className="mt-3 break-words text-sm font-medium leading-6 text-white/58">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-5">
          <p className="text-[11px] font-semibold uppercase text-white/30">
            From adversity to prosperity
          </p>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {section.response.map((item, index) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-xs font-bold tabular-nums text-white/24">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-4 text-base font-bold text-white">{item.title}</h4>
                <p className="mt-3 break-words text-sm font-medium leading-6 text-white/58">{item.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 max-w-4xl break-words text-sm font-medium leading-6 text-white/62">
            <span className="font-semibold text-white/82">Expected impact: </span>
            {section.expectedImpact}
          </p>
        </div>

        <div className="border-t border-white/10 pt-5">
          <p className="text-[11px] font-semibold uppercase text-white/30">
            Evidence base
          </p>
          <ol className="mt-4 grid min-w-0 gap-3 text-xs leading-5 text-white/44">
            {section.references.map((reference) => (
              <li key={reference} className="break-words">
                {reference}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.article>
  );
}

function SDGGoalsPage() {
  return (
    <StaticPageShell transitionKey="sdg-goals" activeHref="./sdg-goals.html">
      {(shouldReduceMotion) => (
        <>
          <HeroSection
            eyebrow="2030 framework"
            title="The 17 Goals, organized for action."
            copy={sdgAgenda.summary}
            shouldReduceMotion={shouldReduceMotion}
          >
            <motion.div variants={fadeUp(shouldReduceMotion)} className="flex flex-wrap gap-3">
              <PillLink href="#all-goals">View All 17 Goals</PillLink>
              <PillLink href="#evidence-dashboard" variant="dark">
                View Evidence
              </PillLink>
            </motion.div>
          </HeroSection>

          <PageSection shouldReduceMotion={shouldReduceMotion} className="border-y border-white/10 bg-[#0a0a1a]/66">
            <SectionHeader
              eyebrow="Framework logic"
              title="A global agenda becomes usable when it is grouped, measured, and localised."
              copy={sdgAgenda.whyGuidanceMatters}
              shouldReduceMotion={shouldReduceMotion}
            />

            <PillarDistribution shouldReduceMotion={shouldReduceMotion} />

            <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {guidanceReasons.map((reason, index) => (
                <GlassPanel
                  key={reason.title}
                  variants={fadeUp(shouldReduceMotion)}
                  shouldReduceMotion={shouldReduceMotion}
                  className="min-h-[230px]"
                >
                  <p className="font-mono text-xs font-bold tabular-nums text-white/28">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-7 text-2xl font-bold leading-tight text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/58">
                    {reason.copy}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </PageSection>

          <PageSection id="all-goals" shouldReduceMotion={shouldReduceMotion}>
            <SectionHeader
              eyebrow="The complete framework"
              title="All 17 Sustainable Development Goals."
              copy="The list below keeps the whole framework visible, while the highlighted goals connect directly to the project research pages."
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allSdgGoals.map((goal) => (
                <GlassPanel
                  key={goal.number}
                  variants={fadeUp(shouldReduceMotion)}
                  shouldReduceMotion={shouldReduceMotion}
                  className={`min-h-[220px] ${selectedGoalNumbers.has(goal.number) ? "bg-white/[0.065]" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="font-mono text-3xl font-extrabold tabular-nums text-white/18">
                      {goal.number}
                    </p>
                    {selectedGoalNumbers.has(goal.number) ? (
                      <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-sky-100/76">
                        Country case
                      </span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-white/24" />
                    )}
                  </div>
                  <h3 className="mt-7 text-xl font-bold leading-tight text-white">
                    {goal.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-white/54">
                    {goal.summary}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </PageSection>

          <PageSection id="evidence-dashboard" shouldReduceMotion={shouldReduceMotion} className="border-y border-white/10 bg-[#0a0a1a]/50">
            <SectionHeader
              eyebrow="Evidence dashboard"
              title="Four selected goals, grounded in the project documents."
              copy="These animated data cards translate the markdown evidence into a quick reading layer before users enter each full research page."
              shouldReduceMotion={shouldReduceMotion}
            />

            <EvidenceDashboard shouldReduceMotion={shouldReduceMotion} />
          </PageSection>

          <PageSection id="research-sections" shouldReduceMotion={shouldReduceMotion}>
            <SectionHeader
              eyebrow="Country cases"
              title="Four selected goals, developed into focused stories."
              copy="Each section connects the official goal purpose with a China-focused challenge, stakeholder analysis, practical response ideas, and supporting evidence."
              shouldReduceMotion={shouldReduceMotion}
            />

            <div className="grid gap-5">
              {rubricGoalSections.map((section) => (
                <ResearchGoalSection
                  key={section.number}
                  section={section}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </PageSection>
        </>
      )}
    </StaticPageShell>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SDGGoalsPage />
  </React.StrictMode>,
);
