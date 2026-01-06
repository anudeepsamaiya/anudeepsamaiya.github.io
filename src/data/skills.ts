/**
 * Skills and Technology Badges
 *
 * Copyright (c) 2018-present Anudeep Samaiya
 * Licensed under the MIT License
 * See LICENSE file in the project root for full license information
 */

export interface Badge {
  name: string;
  badge: string;
  url: string;
}

export const languages: Badge[] = [
  {
    name: "Python",
    badge: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
    url: "https://www.python.org/",
  },
  {
    name: "Golang",
    badge: "https://img.shields.io/badge/golang%20-%2314354C.svg?&style=for-the-badge&logo=go&logoColor=white",
    url: "https://golang.org/",
  },
  {
    name: "JavaScript",
    badge: "https://img.shields.io/badge/javascript%20-%2314354C.svg?&style=for-the-badge&logo=javascript&logoColor=white",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "Rust",
    badge: "https://img.shields.io/badge/Rust-black?style=for-the-badge&logo=rust&logoColor=#E57324",
    url: "https://www.rust-lang.org/",
  },
  {
    name: "SQL",
    badge: "https://img.shields.io/badge/SQL-3376C8?style=for-the-badge&logo=sql&logoColor=white",
    url: "https://www.mysql.com/",
  },
  {
    name: "C++",
    badge: "https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2b%2b&logoColor=white",
    url: "https://isocpp.org/",
  },
  {
    name: "C",
    badge: "https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=white",
    url: "https://devdocs.io/c/",
  },
  {
    name: "LaTeX",
    badge: "https://img.shields.io/badge/LaTeX-47A141?style=for-the-badge&logo=LaTeX&logoColor=white",
    url: "https://www.latex-project.org/",
  },
];

export const frameworks: Badge[] = [
  {
    name: "Django",
    badge: "https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white",
    url: "https://docs.djangoproject.com/en/3.2/",
  },
  {
    name: "Flask",
    badge: "https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white",
    url: "https://flask.palletsprojects.com/en/2.0.x/",
  },
  {
    name: "FastAPI",
    badge: "https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white",
    url: "https://fastapi.tiangolo.com/",
  },
  {
    name: "Celery",
    badge: "https://img.shields.io/badge/celery-348613?style=for-the-badge&logo=celery&logoColor=white",
    url: "https://docs.celeryq.dev/en/latest/index.html",
  },
  {
    name: "Airflow",
    badge: "https://img.shields.io/badge/airflow-4285F4?style=for-the-badge&logo=apacheairflow&logoColor=white",
    url: "https://airflow.apache.org/",
  },
  {
    name: "Pandas",
    badge: "https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white",
    url: "https://pandas.pydata.org/docs/",
  },
  {
    name: "Numpy",
    badge: "https://img.shields.io/badge/Numpy-013243?style=for-the-badge&logo=numpy&logoColor=white",
    url: "https://numpy.org/",
  },
  {
    name: "BeautifulSoup",
    badge: "https://img.shields.io/badge/BeautifulSoup-43B02A?style=for-the-badge&logo=beautifulsoup4&logoColor=white",
    url: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/",
  },
  {
    name: "Git",
    badge: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white",
    url: "https://git-scm.com/doc",
  },
  {
    name: "Docker",
    badge: "https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white",
    url: "https://docs.docker.com/",
  },
];

export const databases: Badge[] = [
  {
    name: "MySQL",
    badge: "https://img.shields.io/badge/MYSQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white",
    url: "https://dev.mysql.com/doc/",
  },
  {
    name: "PostgreSQL",
    badge: "https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white",
    url: "https://www.postgresql.org/docs/",
  },
  {
    name: "Elasticsearch",
    badge: "https://img.shields.io/badge/elasticsearch-47A248?style=for-the-badge&logo=elasticsearch&logoColor=white",
    url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/docs.html",
  },
  {
    name: "Redis",
    badge: "https://img.shields.io/badge/redis-A41E11?style=for-the-badge&logo=redis&logoColor=white",
    url: "https://docs.redis.com/latest/index.html",
  },
];

export const cloud: Badge[] = [
  {
    name: "AWS",
    badge: "https://img.shields.io/badge/amazonaws-e15500?style=for-the-badge&logo=amazonaws&logoColor=white",
    url: "https://aws.amazon.com/",
  },
  {
    name: "Google Cloud",
    badge: "https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white",
    url: "https://cloud.google.com/",
  },
  {
    name: "GitHub Actions",
    badge: "https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white",
    url: "https://docs.github.com/en/actions",
  },
  {
    name: "Heroku",
    badge: "https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white",
    url: "https://devcenter.heroku.com/categories/reference",
  },
];

export const ides: Badge[] = [
  {
    name: "Linux",
    badge: "https://img.shields.io/badge/-linux-772953?style=for-the-badge&logo=linux",
    url: "https://www.linux.org/",
  },
  {
    name: "Vim",
    badge: "https://img.shields.io/badge/vim-0078D4?style=for-the-badge&logo=vim&logoColor=white",
    url: "https://www.vim.org/",
  },
  {
    name: "VS Code",
    badge: "https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white",
    url: "https://code.visualstudio.com/docs",
  },
  {
    name: "Google Colab",
    badge: "https://img.shields.io/badge/Colab-F9AB00?style=for-the-badge&logo=googlecolab&color=525252",
    url: "https://colab.research.google.com/notebooks/intro.ipynb",
  },
  {
    name: "Spyder",
    badge: "https://img.shields.io/badge/Spyder-838485?style=for-the-badge&logo=spyder%20ide&logoColor=maroon",
    url: "https://docs.spyder-ide.org/current/index.html",
  },
];
