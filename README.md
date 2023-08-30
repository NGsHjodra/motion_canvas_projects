# Motion Canvas Animation

The repository for the source code of the [Motion Canvas](https://motioncanvas.io/) Animation featured on [NGs](https://www.youtube.com/@NGs-Hjodra) YouTube channel. 

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [npm](https://www.npmjs.com/) - Package manager for JavaScript.

### Installing

1. Clone the repository.

```bash
git clone https://github.com/NGsHjodra/motion_canvas_projects.git
```

2. Navigate to the project folder:
```bash
cd motion_canvas_projects
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run serve
```

5. Open the project in your browser at http://localhost:9000/

### Changing projects displayed

0. Find the project you want to display in the `src/projects` folder.

1. Open the `vite.config.js` file.

2. Add the name of the project you want to display to the `projects` array.

```javascript
'./src/projects/that_project.ts',
```

3. Save the file.

### Updating motion-canvas

```bash
npm update --save @motion-canvas/2d @motion-canvas/core @motion-canvas/ui @motion-canvas/vite-plugin
```