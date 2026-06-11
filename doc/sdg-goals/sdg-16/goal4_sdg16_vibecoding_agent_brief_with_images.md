# Vibe Coding Agent Brief — SDG 16 Section

## Purpose

Build the SDG 16 section/page for the Assessment 3 SDG Website. Use the complete content file:

`goal4_sdg16_peace_justice_complete_with_images.md`

This page should satisfy the Instruction 3 website requirement: each member selects one different SDG goal, explains the goal purpose, analyses a national adverse impact through why/how/who, and gives a personal response with APA 7th citations.

---

## Page Identity

```json
{
  "goalNumber": "SDG 16",
  "goalTitle": "Peace, Justice and Strong Institutions",
  "officialWording": "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all, and build effective, accountable and inclusive institutions at all levels.",
  "pageTheme": "Justice in the Digital Age",
  "nation": "China",
  "adverseImpactTopic": "Telecom and online fraud affecting young people and ordinary citizens",
  "roleModel": "Nadia Murad",
  "personalResponse": "Student anti-fraud awareness toolkit"
}
```

---

## Required Page Sections

Create the page in this order:

1. **Hero Section**
   - Title: `SDG 16 — Peace, Justice and Strong Institutions`
   - Theme line: `Justice in the Digital Age`
   - Short sentence: `Strong institutions protect people online and offline.`
   - Use SDG 16 official image.

2. **Purpose of SDG 16**
   - Use official wording.
   - Include targets 16.3, 16.4, 16.6, and 16.10.
   - Use short paragraphs and target cards.

3. **Role Model Spotlight**
   - Name: Nadia Murad
   - Use portrait image.
   - Include a card explaining her connection to survivor justice and institutional accountability.

4. **Adverse Impact in China**
   - Topic: telecom and online fraud.
   - Add a data-card layout:
     - `78,000 people prosecuted in 2024`
     - `40,000 telecom fraud cases concluded by courts in 2024`
     - `82,000 people involved in those court cases`
     - `about 50% of surveyed university students feared cyber fraud during the past three months`
   - Keep APA in-text citations near the relevant facts.

5. **Why / How / Who Analysis**
   - Three-column card grid:
     - Why is it happening?
     - How does it manifest?
     - Who is affected?

6. **Personal Response**
   - Title: `From Adversity to Prosperity`
   - Include four action cards:
     - fraud scenario cards
     - peer-led digital safety session
     - pause-before-transfer checklist
     - institutional support page

7. **Credibility Paragraph**
   - Explain why the solution is realistic for students and useful for SDG 16.

8. **References**
   - Add APA 7th reference list.
   - Keep clickable source links.

---

## Image Assets

Use these Markdown image URLs or convert them to HTML `<img>` tags. Preserve alt text and source credits.

```json
[
  {
    "name": "sdg16-official-card",
    "url": "https://sdgs.un.org/sites/default/files/2025-07/2025_SDG_Goal-Level_Social_Media_Cards_Goal_16_small.png",
    "alt": "Official SDG 16 icon: Peace, Justice and Strong Institutions",
    "usage": "hero image or goal card",
    "credit": "United Nations SDG materials"
  },
  {
    "name": "nadia-murad-portrait",
    "url": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nadia_Murad_in_Washington_-_2018_%28427333243785%29_%28cropped%29.jpg",
    "alt": "Nadia Murad portrait",
    "usage": "role model spotlight",
    "credit": "Wikimedia Commons; verify licence before final submission"
  },
  {
    "name": "phishing-fraud-illustration",
    "url": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Scam-phishing-fraud-email-attack-mail-online-system-cybercrime-information-access-credit-money-hack-hacker-laptop-malware-password-protection-software-steal-text-graphic-design-illustration-Material-property-techno.jpg",
    "alt": "Phishing and online fraud illustration",
    "usage": "adverse impact visual",
    "credit": "Wikimedia Commons / public domain illustration"
  },
  {
    "name": "gavel-justice-image",
    "url": "https://commons.wikimedia.org/wiki/Special:Redirect/file/3D_Judges_Gavel.jpg",
    "alt": "Gavel as a symbol of law and justice",
    "usage": "justice and institutions visual",
    "credit": "Chris Potter / StockMonkeys.com, Wikimedia Commons, CC BY 2.0"
  }
]
```

---

## Visual Design Guidelines

- Use SDG 16 blue as the dominant color.
- Use white text on dark blue blocks for emphasis.
- Use card components for role model, data, targets, and personal response.
- Use short paragraphs to avoid walls of text.
- Keep citations visible in small text below each evidence-heavy paragraph.
- Add captions under images with credit lines.
- Ensure images have `alt` text.
- Ensure mobile layout stacks cards vertically.

---

## CSS Class Suggestions

```css
.sdg16-page {}
.sdg16-hero {}
.sdg16-tagline {}
.sdg16-target-grid {}
.sdg16-role-model-card {}
.sdg16-data-grid {}
.sdg16-why-how-who {}
.sdg16-action-card {}
.sdg16-reference-list {}
.image-credit {}
```

---

## Content Constraints

- Preserve APA 7th citations.
- Preserve the reference list.
- Use the text from the complete Markdown file as the content source.
- Avoid overfilling cards with long paragraphs.
- Do not remove source credits from images.
- Do not invent additional statistics.
- Use placeholders only if an image fails to load.

---

## Short Prompt for Coding Agent

```text
Create a responsive SDG 16 section for an SDG Assessment website using the content from goal4_sdg16_peace_justice_complete_with_images.md. The theme is “Justice in the Digital Age.” Build sections for purpose, role model Nadia Murad, adverse impact in China, why/how/who analysis, personal response, credibility paragraph, and APA references. Use the provided image URLs, include alt text and captions, and keep all citations visible. Use SDG 16 blue, card-based layout, accessible contrast, and responsive design.
```
