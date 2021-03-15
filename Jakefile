let exec = require('child_process').exec;

desc('Build all apps.');
task('default', ['buildFront', 'buildProjects', 'buildReports', 'buildRoot'], function () { });

desc('Builds ITLab-Root-Config');
task('buildRoot', function () {
  return new Promise((resolve, reject) => {
    exec('npm i && npm run build', (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        reject(stderr);
      }

      console.log(stdout);
      resolve(true);
    });
  });
});

desc('Builds ITLab-Front');
task('buildFront', function () {
  return new Promise((resolve, reject) => {
    exec('cd ./ITLab-Front && npm i && npm run build', (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        reject(stderr);
      }

      console.log(stdout);
      resolve(true);
    });
  });
});

desc('Builds ITLab-Reports');
task('buildReports', function () {
  return new Promise((resolve, reject) => {
    exec('cd ./ITLab-Reports-Front && npm i && npm run build', (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        reject(stderr);
      }

      console.log(stdout);
      resolve(true);
    });
  });
});

desc('Builds ITLab-Projects');
task('buildProjects', function () {
  return new Promise((resolve, reject) => {
    exec('cd ./ITLab-Projects-Front && npm i && npm run build', (err, stdout, stderr) => {
      if (err) {
        console.log(stderr);
        reject(stderr);
      }

      console.log(stdout);
      resolve(true);
    });
  });
});