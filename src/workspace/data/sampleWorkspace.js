const now = "2026-06-13T00:00:00.000Z";

export const sampleCases = [
  {
    id: "case-sdg16-bruni",
    sdg: "SDG 16",
    title: "Peace, Justice and Strong Institutions",
    country: "China",
    owner: "Bruni Liu",
    focus: "Digital trust, online fraud, and access to justice",
    researchQuestion:
      "How does telecom and online fraud weaken institutional trust, and what evidence-backed responses can protect vulnerable users?",
    status: "active",
    progress: 82,
    updatedAt: now,
  },
  {
    id: "case-sdg13-janet",
    sdg: "SDG 13",
    title: "Climate Action",
    country: "China",
    owner: "Janet Hou",
    focus: "Heat exposure, low-carbon mobility, and climate adaptation",
    researchQuestion:
      "How can climate mitigation and heat-health adaptation be argued together in a China-focused SDG 13 case?",
    status: "review",
    progress: 74,
    updatedAt: now,
  },
  {
    id: "case-sdg2-irene",
    sdg: "SDG 2",
    title: "Zero Hunger",
    country: "China",
    owner: "Irene Han",
    focus: "Food waste, nutrition, and sustainable food choices",
    researchQuestion:
      "How does consumer food waste weaken food security even when national food production is strong?",
    status: "active",
    progress: 70,
    updatedAt: now,
  },
  {
    id: "case-sdg4-elvira",
    sdg: "SDG 4",
    title: "Quality Education",
    country: "China",
    owner: "Elvira Zheng",
    focus: "Education quality, access gaps, and repair-oriented consumption learning",
    researchQuestion:
      "Which education gaps remain hidden when national enrolment indicators look strong, and how can practical learning close them?",
    status: "drafting",
    progress: 66,
    updatedAt: now,
  },
];

export const sampleEvidence = [
  {
    id: "ev-sdg16-unodc",
    caseId: "case-sdg16-bruni",
    type: "dataset",
    title: "UNODC data portal for SDG 16 indicators",
    source: "United Nations Office on Drugs and Crime",
    year: 2025,
    url: "https://data.unodc.org/",
    citation: "United Nations Office on Drugs and Crime. (2025). UNODC data portal.",
    reliability: "institutional",
    summary:
      "Provides institutional justice, crime, and governance indicators that can anchor the SDG 16 case.",
    linkedClaimIds: ["claim-sdg16-adverse"],
    createdAt: now,
  },
  {
    id: "ev-sdg16-travel",
    caseId: "case-sdg16-bruni",
    type: "photo",
    title: "Green mobility evidence photo",
    source: "Team action evidence",
    year: 2023,
    path: "/actionpic/ticket.jpg",
    citation: "Liu, X. (2023). Train ticket from Hangzhou East to Shanghai Hongqiao [Photograph].",
    reliability: "primary evidence",
    summary:
      "Shows a lower-carbon travel choice that connects personal action with responsible institutional systems.",
    linkedClaimIds: ["claim-sdg16-response"],
    createdAt: now,
  },
  {
    id: "ev-sdg13-iea",
    caseId: "case-sdg13-janet",
    type: "dataset",
    title: "China energy-related CO2 emissions",
    source: "International Energy Agency",
    year: 2024,
    url: "https://www.iea.org/countries/china/emissions",
    citation: "International Energy Agency. (2024). China: CO2 emissions.",
    reliability: "institutional",
    summary:
      "Used to explain the mitigation side of SDG 13 and the need for low-carbon transport choices.",
    linkedClaimIds: ["claim-sdg13-adverse"],
    createdAt: now,
  },
  {
    id: "ev-sdg13-underground",
    caseId: "case-sdg13-janet",
    type: "photo",
    title: "Public transport action evidence",
    source: "Team action evidence",
    year: 2026,
    path: "/actionpic/underground.jpg",
    citation: "Hou, Y. (2026). Underground transport action evidence [Photograph].",
    reliability: "primary evidence",
    summary:
      "Documents an everyday mobility choice that reduces transport emissions compared with private car use.",
    linkedClaimIds: ["claim-sdg13-response"],
    createdAt: now,
  },
  {
    id: "ev-sdg2-fao",
    caseId: "case-sdg2-irene",
    type: "dataset",
    title: "FAOSTAT food and agriculture statistics",
    source: "Food and Agriculture Organization",
    year: 2025,
    url: "https://www.fao.org/faostat/en/",
    citation: "Food and Agriculture Organization. (2025). FAOSTAT.",
    reliability: "institutional",
    summary:
      "Supports food security analysis with production, food balance, and agricultural indicator data.",
    linkedClaimIds: ["claim-sdg2-adverse"],
    createdAt: now,
  },
  {
    id: "ev-sdg2-meal",
    caseId: "case-sdg2-irene",
    type: "photo",
    title: "Plant-based meal planning evidence",
    source: "Team action evidence",
    year: 2026,
    path: "/actionpic/meal-plan.jpg",
    citation: "Han, Y. (2026). Plant-forward meal planning evidence [Photograph].",
    reliability: "primary evidence",
    summary:
      "Shows a practical food-choice intervention that can reduce waste and support healthier diets.",
    linkedClaimIds: ["claim-sdg2-response"],
    createdAt: now,
  },
  {
    id: "ev-sdg4-uis",
    caseId: "case-sdg4-elvira",
    type: "dataset",
    title: "UNESCO UIS education statistics",
    source: "UNESCO Institute for Statistics",
    year: 2025,
    url: "https://databrowser.uis.unesco.org/",
    citation: "UNESCO Institute for Statistics. (2025). UIS data browser.",
    reliability: "institutional",
    summary:
      "Provides official education data for completion, enrolment, literacy, and learning indicators.",
    linkedClaimIds: ["claim-sdg4-adverse"],
    createdAt: now,
  },
  {
    id: "ev-sdg4-recycle",
    caseId: "case-sdg4-elvira",
    type: "photo",
    title: "Repair and reuse action evidence",
    source: "Team action evidence",
    year: 2026,
    path: "/actionpic/recycle.jpg",
    citation: "Zheng, X. (2026). Reuse and repair action evidence [Photograph].",
    reliability: "primary evidence",
    summary:
      "Connects practical sustainability learning with SDG 4 education for responsible action.",
    linkedClaimIds: ["claim-sdg4-response"],
    createdAt: now,
  },
];

export const sampleClaims = [
  {
    id: "claim-sdg16-adverse",
    caseId: "case-sdg16-bruni",
    type: "adverse",
    text: "Digital fraud is not only a private safety issue; it can erode trust in justice systems and online institutions.",
    evidenceIds: ["ev-sdg16-unodc"],
    citationState: "supported",
    updatedAt: now,
  },
  {
    id: "claim-sdg16-response",
    caseId: "case-sdg16-bruni",
    type: "response",
    text: "A prosperity pathway combines digital literacy, accountable platforms, and lower-carbon institutional travel choices.",
    evidenceIds: ["ev-sdg16-travel"],
    citationState: "primary evidence",
    updatedAt: now,
  },
  {
    id: "claim-sdg13-adverse",
    caseId: "case-sdg13-janet",
    type: "adverse",
    text: "High emissions and heat exposure make climate action both a mitigation and public-health adaptation challenge.",
    evidenceIds: ["ev-sdg13-iea"],
    citationState: "supported",
    updatedAt: now,
  },
  {
    id: "claim-sdg13-response",
    caseId: "case-sdg13-janet",
    type: "response",
    text: "Public transport choices can connect personal climate action with city-level decarbonisation.",
    evidenceIds: ["ev-sdg13-underground"],
    citationState: "primary evidence",
    updatedAt: now,
  },
  {
    id: "claim-sdg2-adverse",
    caseId: "case-sdg2-irene",
    type: "adverse",
    text: "Food waste weakens food security by wasting land, water, labour, and nutrition before food reaches people.",
    evidenceIds: ["ev-sdg2-fao"],
    citationState: "supported",
    updatedAt: now,
  },
  {
    id: "claim-sdg2-response",
    caseId: "case-sdg2-irene",
    type: "response",
    text: "Plant-forward meal planning can reduce avoidable waste while making sustainable food choices visible and repeatable.",
    evidenceIds: ["ev-sdg2-meal"],
    citationState: "primary evidence",
    updatedAt: now,
  },
  {
    id: "claim-sdg4-adverse",
    caseId: "case-sdg4-elvira",
    type: "adverse",
    text: "Strong national enrolment can hide uneven education quality, digital access, and practical learning opportunities.",
    evidenceIds: ["ev-sdg4-uis"],
    citationState: "supported",
    updatedAt: now,
  },
  {
    id: "claim-sdg4-response",
    caseId: "case-sdg4-elvira",
    type: "response",
    text: "Repair and reuse practices make sustainability education tangible instead of abstract.",
    evidenceIds: ["ev-sdg4-recycle"],
    citationState: "primary evidence",
    updatedAt: now,
  },
];

export const sampleBriefs = sampleCases.map((researchCase) => ({
  id: `brief-${researchCase.id}`,
  caseId: researchCase.id,
  title: `${researchCase.sdg} ${researchCase.country} Research Brief`,
  status: researchCase.status === "review" ? "review" : "draft",
  citationStatus: "needs review",
  sections: {
    problem:
      "Frame the official SDG purpose, the 2030 direction, and the country-specific adverse impact with dated evidence.",
    evidence:
      "Use institutional datasets, primary action evidence, and linked claims to create a transparent evidence trail.",
    response:
      "Translate adversity into a concrete prosperity pathway with named stakeholders, implementation steps, and expected impact.",
  },
  updatedAt: researchCase.updatedAt,
}));

export const sampleLiterature = sampleEvidence
  .filter((item) => item.type === "dataset")
  .map((item, index) => ({
    id: `lit-${item.id}`,
    title: item.title,
    authors: [item.source],
    abstract: item.summary,
    doi: "",
    year: item.year,
    tags: ["institutional source", item.caseId.replace("case-", "")],
    source: "sample",
    relationships: [],
    graphPosition: {
      x: 180 + index * 90,
      y: 180 + (index % 2) * 120,
    },
    createdAt: now,
  }));

export const sampleNotes = sampleCases.map((researchCase) => ({
  id: `note-${researchCase.id}`,
  title: `${researchCase.sdg} case note`,
  content: `# ${researchCase.sdg}: ${researchCase.title}\n\nCountry: ${researchCase.country}\nOwner: ${researchCase.owner}\n\n## Research question\n${researchCase.researchQuestion}\n\n## Evidence to verify\n- Add at least one dated institutional source.\n- Link each major claim to evidence.\n- Keep the prosperity response concrete and stakeholder-aware.\n`,
  linkedLiteratureIds: [],
  tags: ["sample-case", researchCase.sdg.toLowerCase().replaceAll(" ", "-")],
  createdAt: now,
  updatedAt: now,
}));

export function createSampleWorkspace() {
  return {
    version: 1,
    cases: sampleCases,
    evidence: sampleEvidence,
    claims: sampleClaims,
    briefs: sampleBriefs,
    literature: sampleLiterature,
    notes: sampleNotes,
    activityLog: [
      {
        id: "activity-sample-loaded",
        type: "sample_workspace",
        description: "Loaded four sample SDG research cases",
        timestamp: now,
      },
    ],
    updatedAt: now,
  };
}
