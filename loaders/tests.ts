function getParameterByName(
  name: string,
  url?: string
) {
  url = url || window.location.href;
  name = name.replace(
    /[\[\]]/g,
    "\\$&"
  );
  var regex = new RegExp(
      "[?&]" +
        name +
        "(=([^&#]*)|&|#|$)"
    ),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(
    results[2].replace(/\+/g, " ")
  );
}

export async function run() {
  const isTest =
    !!getParameterByName("test");

  const isRun =
    !!getParameterByName("run");

  if (isTest && isRun)
    throw "provide a 'test' or 'run' parameter but not both";

  if (!isTest && !isRun)
    throw "provide a 'test' or 'run' parameter";

  const debug =
    getParameterByName("debug") === "1";

  const localhost = true;

  const dark =
    getParameterByName("theme") ===
    "dark";

  document.body.classList.toggle(
    "dark",
    dark
  );
  document.body.classList.toggle(
    "verbose",
    !localhost
  );
  document.body.classList.toggle(
    "light",
    !dark
  );
  document.body.classList.toggle(
    "terse",
    localhost && !debug
  );

  if (isTest) {
    document.body.classList.add("test");
  }

  if (isRun) {
    document.body.classList.add("run");
  }

  if (isRun) {
    let testNames =
      getParameterByName("run") || "*";
    if (testNames === "*")
      testNames = "examples/index";
    testNames
      .split(",")
      .forEach(async (mid) => {
        await import(mid);
      }),
      (...tests) =>
        tests.forEach((test) =>
          test.run()
        );
  }

  if (isTest) {
    mocha.setup("bdd");
    debugger;
    let testNames =
      getParameterByName("test") || "*";
    if (testNames === "*")
      testNames = "tests";
    await Promise.all(
      testNames
        .split(",")
        .map((mid) => import(mid))
    );
    mocha.run();
  }
}
