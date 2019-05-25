# bustimer [![version](https://img.shields.io/github/release/trysnetron/bustimer.svg?style=flat-square)](https://github.com/trysnetron/bustimer/releases)
Minimal bus time app for the web.

![preview](/media/preview.jpg)

## Getting started
How to get this project up and running.

### Prerequesites
To build this project you'll need [Node.js + npm](https://nodejs.org/en/).

It is also strongly recommended to use [Git](https://git-scm.com/) for downloading the repository, but it isn't technically necessary.

### Installing
Navigate to your desired location in your terminal and clone the repository with `git`.
```bash
git clone git@github.com:trysnetron/bustimer.git
```

Enter the repository folder and install all dependencies with `npm`.
```bash
npm install
```

Start the local development server with the given npm script.
```bash
npm run dev
```

This will open a browser tab with the web app, and changes done to the source should be applied when you save.

## Tests

To run the jest test suite, run
```bash
npm test
```

## Deployment

Want to add your own bus times to the app and host it yourself (for example with [Github Pages](https://pages.github.com/))?

This is super easy, start by editing the src/js/stops.js file, here you can add your own stops with their respective bus times.

When you are certain it works, it's time to build the app. Run the build script with npm.
```bash
npm run build
```
This will generate the necessary files inside the dist folder, ready to be hosted. 


## License
This project is licensed under the MIT license - see [LICENSE file](LICENSE) for details.
