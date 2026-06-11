# Vibe Coding Agent Brief — Goal 1 SDG 4 Page

## Task Context

Build the **SDG 4 — Quality Education** content section for the Assessment 3 SDG Website. This content belongs to the **SDG 17 Goals** page and answers Instruction 3 requirements:

1. Give a brief explanation of the SDG goal’s purpose.
2. Explain the adverse impact currently facing the selected nation, answering why, how, and who.
3. Provide a personal response explaining steps to move from adversity to prosperity.
4. Use APA 7th in-text citations and include the references in the Reference List page.

## Required Page Identity

- **Goal:** SDG 4 — Quality Education
- **Theme:** Education as Empowerment
- **Selected nation:** China
- **Adverse impact topic:** Unequal access to quality education between urban and rural communities
- **Role model:** Malala Yousafzai
- **Visual tone:** hopeful, academic, accessible, empowerment-focused
- **SDG colour:** SDG 4 red, approximately `#C5192D`

## Recommended Section Structure

Create one full SDG 4 section with the following blocks:

1. **Hero Block**
   - Title: `SDG 4 — Quality Education`
   - Tagline: `Education as Empowerment`
   - One-sentence hook: `Learning gives people the power to change their future.`
   - Include official SDG 4 icon or infographic.

2. **Purpose of the Goal**
   - Use the official UN wording.
   - Mention Target 4.1 and Target 4.5.
   - Keep this block descriptive and concise.

3. **Role Model Spotlight**
   - Name: Malala Yousafzai
   - Subtitle: `Education as Courage`
   - Include portrait image.
   - Explain why she matters for SDG 4.

4. **Adverse Impact in China**
   - Topic: unequal access to quality education between urban and rural communities.
   - Use three subcards:
     - `Why is this happening?`
     - `How does it manifest?`
     - `Who is affected?`
   - Include citations after factual claims.

5. **Personal Response**
   - Main response: open learning resources, peer tutoring, digital literacy workshops.
   - Use step cards:
     - Open learning resource page
     - Peer tutoring and mentoring
     - Digital literacy workshops
     - Community awareness
   - Finish with expected impact.

6. **References Preview**
   - Show a short “Sources used” block or link users to the Reference List page.

## Suggested Images

### 1. UN SDG 4 Graphic

```text
https://sdgs.un.org/sites/default/files/2025-07/2025_SDG_Goal-Level_Social_Media_Cards_Goal_4_small.png
```

- Alt text: `United Nations SDG 4 graphic showing education gains and remaining out-of-school challenges.`
- Credit: `United Nations Department of Economic and Social Affairs, The Sustainable Development Goals Report 2025.`

### 2. Malala Yousafzai Portrait

```text
https://upload.wikimedia.org/wikipedia/commons/f/fe/Malala_Yousafzai_2015.jpg
```

- Alt text: `Portrait of Malala Yousafzai, education activist and Nobel Peace Prize laureate.`
- Credit: `Simon Davis/DFID, CC BY 2.0, via Wikimedia Commons.`

### 3. UNICEF China Education Image

```text
https://www.unicef.cn/sites/unicef.org.china/files/styles/hero_extended/public/EDU-bluewash.jpg.webp?itok=NqwXxKdR
```

- Alt text: `A student reading during a Chinese class in Guangxi, China.`
- Credit: `UNICEF/China/2017/Xia Yong.`

## Data Object for Implementation

```js
const sdg4Goal = {
  id: "sdg4",
  goalNumber: "SDG 4",
  title: "Quality Education",
  theme: "Education as Empowerment",
  tagline: "Learning gives people the power to change their future.",
  officialWording: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
  selectedNation: "China",
  adverseImpactTopic: "Unequal access to quality education between urban and rural communities",
  roleModel: {
    name: "Malala Yousafzai",
    subtitle: "Education as Courage",
    description: "Malala Yousafzai is a global advocate for children's right to education and a Nobel Peace Prize laureate. Her story connects SDG 4 with equality, dignity, safety, and public voice.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Malala_Yousafzai_2015.jpg",
    imageCredit: "Simon Davis/DFID, CC BY 2.0, via Wikimedia Commons"
  },
  images: {
    sdgGraphic: "https://sdgs.un.org/sites/default/files/2025-07/2025_SDG_Goal-Level_Social_Media_Cards_Goal_4_small.png",
    chinaEducation: "https://www.unicef.cn/sites/unicef.org.china/files/styles/hero_extended/public/EDU-bluewash.jpg.webp?itok=NqwXxKdR"
  },
  responseActions: [
    "Create a free online learning resource page",
    "Organise peer tutoring and mentoring",
    "Run digital literacy workshops",
    "Promote community-level awareness of education equity"
  ],
  color: "#C5192D"
};
```

## Design Recommendations

- Use a red accent inspired by SDG 4.
- Use short cards and expandable sections for readability.
- Put citations in smaller text below paragraphs or inline after factual statements.
- Add visible image credits under all images.
- Use accessible contrast. Avoid red text on dark backgrounds unless contrast is tested.
- Use a responsive two-column layout on desktop and single-column layout on mobile.

## Reference List Entries to Add to Website

Guo, C., & Wan, B. (2022). The digital divide in online learning in China during the COVID-19 pandemic. *Technology in Society, 71*, Article 102122. https://doi.org/10.1016/j.techsoc.2022.102122

Guo, Y., & Li, X. (2024). Regional inequality in China’s educational development: An urban-rural comparison. *Heliyon, 10*(4), Article e26249. https://doi.org/10.1016/j.heliyon.2024.e26249

Nobel Prize Outreach. (n.d.). *Malala Yousafzai – Facts*. NobelPrize.org. Retrieved June 10, 2026, from https://www.nobelprize.org/prizes/peace/2014/yousafzai/facts/

UNICEF China. (n.d.). *Education*. Retrieved June 10, 2026, from https://www.unicef.cn/en/what-we-do/education

United Nations. (n.d.). *Goal 4: Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all*. Department of Economic and Social Affairs, Sustainable Development. Retrieved June 10, 2026, from https://sdgs.un.org/goals/goal4

United Nations. (2025). *The Sustainable Development Goals Report 2025: Goal 4 social media card*. Department of Economic and Social Affairs. https://sdgs.un.org/sites/default/files/2025-07/2025_SDG_Goal-Level_Social_Media_Cards_Goal_4_small.png

Wikimedia Commons. (2019). *Malala Yousafzai 2015.jpg* [Photograph]. https://commons.wikimedia.org/wiki/File:Malala_Yousafzai_2015.jpg

## Implementation Checklist

- [ ] Add SDG 4 section to the SDG 17 Goals page.
- [ ] Add official UN wording.
- [ ] Add purpose paragraph with Target 4.1 and Target 4.5.
- [ ] Add Malala role model card with image and credit.
- [ ] Add China adverse impact section with Why / How / Who cards.
- [ ] Add personal response section with four action cards.
- [ ] Add all APA 7th references to the Reference List page.
- [ ] Add image alt text.
- [ ] Add image credit captions.
- [ ] Check mobile responsiveness.
