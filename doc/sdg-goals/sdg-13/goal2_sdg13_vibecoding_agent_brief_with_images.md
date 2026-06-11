# Vibe Coding Agent Brief — SDG 13 Climate Action Page

## Task

Build the SDG 13 section/page for the Assessment 3 SDG Website.

This section must satisfy Instruction 3 requirements:

1. Explain the purpose of the selected SDG goal.
2. Research and explain the national adverse impact using why / how / who.
3. Provide a personal response explaining steps to move from adversity to prosperity.
4. Use APA 7th in-text citations and include the sources in the Reference List page.

## Page Identity

```js
const sdg13 = {
  id: "sdg13",
  number: "SDG 13",
  title: "Climate Action",
  officialTitle: "Take urgent action to combat climate change and its impacts.",
  theme: "Climate Action as Shared Responsibility",
  tagline: "Climate action links science, policy, community resilience, and everyday behaviour.",
  nation: "China",
  adverseImpactTopic: "Climate risks and carbon emissions, focusing on extreme heat, flood exposure, urban vulnerability, and low-carbon transition.",
  roleModel: "Christiana Figueres"
};
```

## Recommended Page Layout

### 1. Hero section

Use the official SDG 13 icon and the page theme.

- Heading: `SDG 13 — Climate Action`
- Subheading: `Climate Action as Shared Responsibility`
- Short intro: `Climate action links scientific evidence, public policy, community resilience, and everyday behaviour.`

### 2. Purpose card

Include the paragraph from the full markdown under `Purpose of SDG 13`.

Add key target chips:

- `Target 13.1: Resilience and adaptive capacity`
- `Target 13.2: Climate measures in policy and planning`
- `Target 13.3: Climate education and capacity-building`

### 3. Role Model Spotlight card

Use Christiana Figueres as the role model.

Card fields:

- Name: Christiana Figueres
- Field: Climate diplomacy and international climate cooperation
- Why she matters: former UNFCCC Executive Secretary, 2010–2016
- Design tone: leadership, cooperation, optimism, diplomacy

### 4. Evidence visual section

Use three image cards:

```js
const sdg13Images = [
  {
    id: "sdg13-icon",
    src: "https://sdgs.un.org/sites/default/files/2025-07/2025_SDG_Goal-Level_Social_Media_Cards_Goal_13_small.png",
    alt: "Official UN SDG 13 Climate Action icon",
    caption: "Official SDG 13 Climate Action visual identity.",
    credit: "United Nations Department of Economic and Social Affairs Sustainable Development"
  },
  {
    id: "nasa-temperature",
    src: "https://svs.gsfc.nasa.gov/vis/a000000/a005300/a005311/GISTEMP_Lines_Rotate_2024_degF.00650_print.jpg",
    alt: "NASA global temperature anomaly visualisation",
    caption: "NASA visualisation of global surface temperature anomalies.",
    credit: "NASA Scientific Visualization Studio"
  },
  {
    id: "christiana-figueres",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Christiana%20Figueres%202011%20(cropped).jpg",
    alt: "Portrait of Christiana Figueres",
    caption: "Christiana Figueres, former Executive Secretary of the UNFCCC.",
    credit: "Wikimedia Commons; verify image licence on the file page before final submission"
  },
  {
    id: "east-asia-heatwave",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/East_Asian_Heat_Waves_in_July_10-16%2C_2022.png",
    alt: "NOAA map of Eastern Asia extreme maximum temperatures in July 2022",
    caption: "NOAA map of extreme maximum temperatures across Eastern Asia during July 10–16, 2022.",
    credit: "NOAA Climate Prediction Center / Wikimedia Commons"
  }
];
```

Render each image with `<figure>`, `<img>`, and `<figcaption>`.

### 5. Adverse impact section

Use a three-column `Why / How / Who` layout.

#### Why

- greenhouse gas emissions
- fossil fuel energy demand
- rapid urbanisation
- car dependence and energy-intensive consumption
- coastal exposure and urban heat island effects

#### How

- extreme heat
- drought
- coastal flooding
- health risks
- power system pressure
- agricultural and water security stress

#### Who

- urban residents
- coastal communities
- elderly people
- outdoor workers
- rural farmers
- low-income households
- children and people with chronic illness

### 6. Evidence stat cards

Create four stat cards:

```js
const sdg13Stats = [
  {
    value: "1.1°C",
    label: "Global surface temperature reached 1.1°C above 1850–1900 in 2011–2020.",
    source: "IPCC, 2023"
  },
  {
    value: "1/5 + 1/3",
    label: "China's exposed coastal cities account for one fifth of population and one third of GDP.",
    source: "World Bank Group, 2022"
  },
  {
    value: "50,900",
    label: "Estimated heatwave-related deaths in China in 2022.",
    source: "Zhang et al., 2023"
  },
  {
    value: "1/3",
    label: "China accounts for about one third of global CO₂ emissions.",
    source: "IEA, 2021"
  }
];
```

### 7. Personal response section

Use four action cards:

1. Climate literacy and public awareness
2. Low-carbon transport and consumption
3. Heat-health protection
4. Campus Climate Action Week

Each card should include a short paragraph and an icon. Use SVG icons or CSS icon blocks if external icons are unavailable.

### 8. Reference integration

Keep APA in-text citations visible near claims. Add all references from the complete markdown to the shared `Reference List` page.

## Design Style

Use a climate-themed palette:

```css
:root {
  --sdg13-green: #3F7E44;
  --climate-dark: #0f172a;
  --climate-card: #111827;
  --climate-soft: #e8f5e9;
  --climate-accent: #7bd88f;
}
```

Recommended UI components:

- large hero section
- evidence stat cards
- role model spotlight card
- image gallery
- why/how/who grid
- personal response action cards
- citation footnotes or compact source labels

## Accessibility Requirements

- Provide alt text for every image.
- Keep body text readable.
- Use high contrast between text and background.
- Avoid long paragraphs on the final website.
- Use cards, section headings, and bullet lists.
- Include image captions and source credits.

## Content Safety

Do not invent statistics. Use the evidence points and references provided in the full markdown. Keep citations close to each borrowed fact. Preserve APA 7th formatting on the Reference List page.

## Suggested Route / File Name

- `sdg13.html`
- or component: `src/pages/SDG13.jsx`
- or section data file: `src/data/sdg13.js`

## Completion Checklist

- [ ] Official SDG title included.
- [ ] Goal purpose explained.
- [ ] Targets 13.1, 13.2, 13.3 included.
- [ ] Christiana Figueres role model card included.
- [ ] China adverse impact selected.
- [ ] Why / How / Who section included.
- [ ] At least four evidence/stat cards included.
- [ ] Personal response section included.
- [ ] Images rendered with alt text and captions.
- [ ] APA 7th references added to Reference List page.
