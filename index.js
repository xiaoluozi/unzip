const unzipper = require("unzipper");
const fs = require("fs");

async function main() {
  // await unzipper.Open.file(
  //   "/Users/luoweiling/Downloads/1.0.0-build.211945.zip"
  // ).then((directory) => {
  //   directory.extract({
  //     path: "/Users/luoweiling/Downloads/1.0.0-build.211945",
  //   });
  // });
  // return "done";

  fs.createReadStreamSync(
    "/Users/luoweiling/Downloads/1.0.0-build.211945.zip"
  ).pipe(
    unzipper.Extract({ path: "/Users/luoweiling/Downloads/1.0.0-build.211945" })
  );
}

fs.createReadStream("/Users/luoweiling/Downloads/1.0.0-build.209863.zip")
  .pipe(unzipper.Parse())
  .on("entry", function (entry) {
    const fileName = entry.path;
    const type = entry.type; // 'Directory' or 'File'
    const size = entry.vars.uncompressedSize; // There is also compressedSize;
    console.log(fileName, type, size);
    if (fileName === "this IS the file I'm looking for") {
      entry.pipe(fs.createWriteStream("/Users/luoweiling/Downloads"));
    } else {
      console.log("autodrain");
      entry.autodrain();
    }
  });

// main();
// main().then(console.log, console.log);
