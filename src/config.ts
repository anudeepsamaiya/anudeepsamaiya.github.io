/**
 * Site Configuration
 *
 * Copyright (c) 2018-present Anudeep Samaiya
 * Licensed under the MIT License (code) and CC BY 4.0 (content)
 * See LICENSE and LICENSE-CONTENT files for full license information
 */

const START_YEAR = 2018;
const CURRENT_YEAR = new Date().getFullYear();

export const COPYRIGHT = {
  startYear: START_YEAR,
  currentYear: CURRENT_YEAR,
  displayYear: START_YEAR === CURRENT_YEAR ? `${START_YEAR}` : `${START_YEAR}-${CURRENT_YEAR}`,
  notice: `© ${START_YEAR === CURRENT_YEAR ? START_YEAR : `${START_YEAR}-${CURRENT_YEAR}`} Anudeep Samaiya. All rights reserved.`,
};

export const SITE = {
  title: "Anudeep Samaiya",
  description: "Technical and not-so-technical writings.",
  author: "Anudeep Samaiya",
  locale: "en-US",
  baseUrl: "https://anudeepsamaiya.github.io",
};

export const SOCIALS = {
  github: "https://github.com/anudeepsamaiya",
  twitter: "https://twitter.com/anudeepsamaiya",
  linkedin: "https://www.linkedin.com/in/anudeepsamaiya/",
  stackoverflow: "https://stackoverflow.com/users/2079692/anudeep-samaiya",
  leetcode: "https://leetcode.com/anudeepsamaiya/",
};

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Reading", href: "/reading" },
];
