# Vibe Coding Agent Brief: SDG 2 — Zero Hunger Page

## Goal

Build a polished SDG 2 section/page for the static SDG group website.

This page should support Assessment 3 Instruction 3: each member selects one different SDG goal, explains the goal purpose, analyses a national adverse impact through why/how/who, and provides a personal response.

---

## Page Identity

- **SDG:** SDG 2 — Zero Hunger
- **Theme:** Food Security Through Innovation and Waste Reduction
- **Selected nation:** China
- **Adverse impact:** Food waste and sustainable food security pressure
- **Role model:** Yuan Longping
- **Primary colour:** `#DDA63A`
- **Accent colours:** warm cream `#FFF7E0`, dark charcoal `#1F2933`, muted green `#4D7C0F`

---

## Required Sections

### 1. Hero Section

Use:

- title: `SDG 2: Zero Hunger`
- subtitle: `Food Security Through Innovation and Waste Reduction`
- short paragraph about ending hunger, improving nutrition, sustainable agriculture, and reducing waste
- image: SDG 2 official infographic

Image URL to download into assets:

```text
https://sdgs.un.org/sites/default/files/2023-08/SDG_report_2023_infographics_Goal%202.jpg
```

Suggested local path:

```text
assets/sdg2-infographic.jpg
```

Alt text:

```text
Official SDG 2 infographic showing Zero Hunger and food security messages.
```

---

### 2. Purpose of SDG 2

Create a text section with one intro paragraph and three target cards:

- Target 2.1: end hunger and ensure access to safe, nutritious, and sufficient food all year round
- Target 2.2: end all forms of malnutrition
- Target 2.4: ensure sustainable food production systems and resilient agricultural practices

Source citation in text:

```text
(United Nations, n.d.)
```

---

### 3. Role Model Spotlight

Build a card or split layout.

Image URL to download:

```text
https://commons.wikimedia.org/wiki/Special:FilePath/Yuan_Longping_at_news_conference.png
```

Suggested local path:

```text
assets/yuan-longping.png
```

Alt text:

```text
Portrait of Yuan Longping, the Chinese agronomist known for hybrid rice research.
```

Content points:

- Yuan Longping is known as the “Father of Hybrid Rice.”
- The World Food Prize Foundation says he developed technologies needed to breed the first hybrid rice varieties.
- His high-yielding rice helped nourish approximately 70 million more people per year in China.
- Connect his work to SDG 2 through food security, agricultural innovation, and sustainable production.

Source citation:

```text
(World Food Prize Foundation, n.d.)
```

---

### 4. Data Snapshot

Create a grid of statistic cards.

Recommended cards:

1. `673 million` — people experienced hunger globally in 2024. Source: FAO Hunger Map 2025.
2. `1.052 billion tonnes` — global consumer-level food waste in 2022. Source: UNEP Food Waste Index Report 2024.
3. `631 million tonnes` — household food waste in 2022. Source: UNEP Food Waste Index Report 2024.
4. `35+ million tonnes` — food lost or wasted in China annually. Source: IFAD.
5. `17–18 million tonnes` — China retail/consumption-stage food waste annually. Source: IFAD and Feng et al.

Use short captions and keep each card visually clean.

---

### 5. Chart Section

Create a simple bar chart using local CSS or inline SVG. Avoid external chart libraries if the website must work offline.

Chart title:

```text
Global consumer-level food waste by sector, 2022
```

Data:

```json
[
  { "sector": "Households", "value": 631 },
  { "sector": "Food service", "value": 290 },
  { "sector": "Retail", "value": 131 }
]
```

Unit:

```text
million tonnes
```

Caption:

```text
Households generated the largest share of consumer-level food waste in 2022, followed by food service and retail.
```

Source note:

```text
Source: UNEP Food Waste Index Report 2024.
```

---

### 6. Adverse Impact in China

Create a strong section with title:

```text
Adverse Impact in China: Food Waste and Sustainable Food Security Pressure
```

Include three cards:

#### Why

- rapid urbanisation and changing consumption habits
- eating out, takeaway, banquets, and over-ordering
- cultural habits around hospitality and “face” in group meals
- logistics, storage, and supply-chain losses

#### How

- discarded meals and leftovers
- spoiled ingredients
- avoidable restaurant and canteen waste
- wasted land, water, energy, labour, packaging, and emissions

#### Who

- consumers
- farmers and food producers
- restaurants, canteens, and retailers
- vulnerable communities
- future generations

Citations:

```text
(IFAD, 2020; Feng et al., 2022; UNEP, 2024)
```

---

### 7. Personal Response

Use three action cards:

1. Measure food waste for one week.
2. Reduce waste through meal planning, portion control, and packing leftovers.
3. Share awareness through a student-facing campaign.

Connect this section to the Act Now action:

```text
Throw away less food
```

---

### 8. Visual Evidence Image

Image URL to download:

```text
https://commons.wikimedia.org/wiki/Special:FilePath/Treasure_trove_of_wasted_food.JPG
```

Suggested local path:

```text
assets/food-waste-bin.jpg
```

Alt text:

```text
A bin containing discarded vegetables and food items, representing food waste.
```

Use it in the adverse impact or data snapshot section.

---

## Suggested HTML Component Names

Use these class names:

```text
sdg-page sdg2-page
hero-section
sdg-hero-card
purpose-grid
target-card
role-model-card
data-snapshot-grid
stat-card
chart-card
impact-grid
impact-card
personal-response-grid
reference-note
```

---

## Suggested CSS Direction

- Use SDG 2 gold as the main accent.
- Use warm cream backgrounds for cards.
- Use dark text on light sections for readability.
- Use visible focus states for accessibility.
- Keep chart labels readable on mobile.
- Avoid tiny captions.
- Keep paragraphs short.
- Use consistent card spacing with the other SDG pages.

---

## Required References for Shared Reference List Page

Add these APA 7 entries to `references.html`.

```text
Feng, Y., Marek, C., & Tosun, J. (2022). Fighting food waste by law: Making sense of the Chinese approach. Journal of Consumer Policy, 45, 457–479. https://doi.org/10.1007/s10603-022-09519-2

Food and Agriculture Organization of the United Nations. (2025). Hunger map 2025. https://www.fao.org/interactive/hunger-map/en/

International Fund for Agricultural Development. (2020, September 29). Fighting food waste in China: Local efforts, global effects. https://www.ifad.org/en/w/opinions/fighting-food-waste-in-china-local-efforts-global-effects

Standing Committee of the National People’s Congress. (2021). Law of the People’s Republic of China on food waste. https://en.npc.gov.cn.cdurl.cn/2021-04/29/c_689496.htm

United Nations. (n.d.). Goal 2: End hunger, achieve food security and improved nutrition and promote sustainable agriculture. United Nations Department of Economic and Social Affairs, Sustainable Development. https://sdgs.un.org/goals/goal2

United Nations Environment Programme. (2024). Food Waste Index Report 2024. https://www.unep.org/resources/publication/food-waste-index-report-2024

World Food Prize Foundation. (n.d.). 2004: Monty P. Jones and Yuan Longping. https://www.worldfoodprize.org/en/laureates/20002009_laureates/2004_jones_and_yuan/
```

---

## Offline-first Implementation Notes

- Download remote images into the local `assets/` folder.
- Replace all Markdown image URLs with local paths in final HTML.
- Avoid Google Drive image links.
- Avoid external CDN dependencies.
- Build the chart using CSS or SVG so `index.html` works locally.
- Keep all references visible on the Reference List page.
- Include source notes under charts and images.
- Keep image licence/credit captions in the page.

---

## Final Quality Checklist

- [ ] SDG 2 official wording appears near the top.
- [ ] Purpose section mentions Target 2.1, 2.2, and 2.4.
- [ ] Yuan Longping role model card is included.
- [ ] China adverse impact section answers why, how, and who.
- [ ] Data snapshot includes at least three statistic cards.
- [ ] Chart has title, labels, unit, caption, and source note.
- [ ] Personal response includes concrete steps.
- [ ] References are APA 7 style.
- [ ] All images have alt text and credit.
- [ ] Page works offline after images are downloaded.
