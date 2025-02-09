# Type West 2024

## About the project

This repository hosts the development version of the graduation website for the Type West Class of 2024. The live version can be found here: [https://typewest.letterformarchive.org/2024/](https://typewest.letterformarchive.org/2024/)

## Adding a project

* create a new project in the folder in `/typeface` and give it the name of the typeface (this will be the slug). This is most easily done by just copying one of the existing folders. The title needs to be manually edited in the `index.html`.
* create a folder `assets/specimens` with the name of the typeface (slug). Put in the woff files and images without any subfolder.
* Update `assets/js/students.js` with the student data (the name set in `slug` needs to be the same as previously mentioned)
* add the @fontface import to `_classfonts.scss` and reference all available styles of the typeface
* add the main style of the typeface to `css/screen.min.css`

## Adding the graduation video
Once the individual graduation videos are uploaded to vimeo, they can be easily added in the `students.json` by adding the URL to `"graduationVideo": "",` for each student.

## Editing general information
* `about.html` (thank you notes)
* `assets/js/generalcontent.js` (social links of the Archive)

## Structure

```plaintext
type-west-2024/
├── assets/
│   ├── css/
│   │   └── style.css
│   │   ├── scss/
│   │   │   ├── _base/
│   │   │   ├── _components/
│   │   │   ├── _layout/
│   │   │   ├── _module/
│   │   │   ├── _pages/
│   │   │   └── _utilities/
│   │   │   │   └── _classfonts.scss
│   │   │   └── screen.css
│   │   └── fontsampler-skin.css
│   │   └── screen.min.css
│   │   └── screen.min.css.map
│   ├── fonts/
│   ├── images/
│   ├── js/
│   │   └── fontsampler-skin.js
│   │   └── fontsampler.js
│   │   └── footer.js
│   │   └── generalcontent.json
│   │   └── main.js
│   │   └── students.json
│   └── specimens/
│   │   └── [student project folders with image and font files]
├── typeface/
│   └── [student project]/index.html
├── about.html
├── index.html
└── README.md
