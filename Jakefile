let exec = require('child_process').exec;

console.info(`Using mode=${process.env.mode}`);
if (process.env.mode === "production") {
  var BUILD_COMMAND = "npm run build";
} else if (process.env.mode === "development") {
  var BUILD_COMMAND = "npm run developbuild";
} else {
  console.warn("No mode was provided\nUsing 'development' mode");
  console.warn("To provide mode set the environmental variable:\n");
  console.warn("jake mode='your_mode'\n");
  var BUILD_COMMAND = "npm run developbuild";
}

if (process.env.concurrency) {
  var CONCURRENCY = 4;
  console.info(`Using concurrency`);
} else {
  var CONCURRENCY = 1;
}

desc('Build all apps.');
task('default', ['buildFront', 'buildProjects', 'buildReports', 'buildRoot'], { concurrency: CONCURRENCY }, function () { });

desc('Builds ITLab-Root-Config');
task('buildRoot', function () {
  return new Promise((resolve, reject) => {
    exec(`npm ci && ${BUILD_COMMAND}`, (err, stdout, stderr) => {
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
    exec(`cd ./ITLab-Front && npm ci && ${BUILD_COMMAND}`, (err, stdout, stderr) => {
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
    exec(`cd ./ITLab-Reports-Front && npm ci && ${BUILD_COMMAND}`, (err, stdout, stderr) => {
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
    exec(`cd ./ITLab-Projects-Front && npm ci && ${BUILD_COMMAND}`, (err, stdout, stderr) => {
      if (err) {
        console.log(stderr);
        reject(stderr);
      }

      console.log(stdout);
      resolve(true);
    });
  });
});
