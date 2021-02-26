const fs = require("fs");
const https = require("https");

let fileContent = fs.readFileSync("deploy/ITLab-Root-Front/index.html", "utf8");
const regexp = /(https:\/\/unpkg.com[^\"]+)|(https:\/\/cdn.jsdelivr.net[^\"]+)/g;

const cdnLinks = [...fileContent.matchAll(regexp)];

async function downloadLinks() {
  for (const link of cdnLinks) {
    console.log(link[0]);
  }
}

downloadLinks();
