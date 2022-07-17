// TODO: Read from stdin
// https://nodejs.org/api/readline.html
const readline = require("readline");

const params = {
  resolved: {},
  byLongName: {},
  alias: {},
};

let processEnv = () => process.argv;
let ask = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return rl.question(question, (answer) => answer);

  // new Promise((res) => {
  //   const answer =
  //   rl.close();
  //   res(answer)
  // })
};

/**
 * For testing purposes only, makes it easier to mock user prompt
 *
 * @param {*} getter
 */
function setPromotHandler(getter) {
  ask = getter;
}

/**
 * For testing purposes only, makes it easier to mock input params
 *
 * @param `() => string`
 */
function setProcessEnvGetter(getter) {
  processEnv = getter;
}

function addCliParam(longName, shortName, description) {
  params.byLongName[longName] = {
    description,
  };
  params.alias[shortName] = longName;
}

function resolveParamAt(ind) {
  const allNames = [
    ...Object.keys(params.byLongName),
    ...Object.keys(params.alias),
  ];
  const nextPos = processEnv()[ind + 1];

  /**
   * In case next position is a false value or
   * another key return `true`
   * @example
   *  `myapp --onlyOneParam` - resolveParamAt(1) should resolve to true
   *
   *  `myapp --onlyOneParam --anotherParam` - both resolveParamAt(1), resolveParamAt(2) should resolve to true
   */
  if (!nextPos || allNames.includes(nextPos)) {
    return true;
  }

  return nextPos;
}

async function getVal(longName, required) {
  if (!Object.keys(params.byLongName).includes(longName)) {
    throw `${longName} in not declared. Please use long parameter names only to enforce consistency.`;
  }

  if (!params.resolved[longName]) {
    const paramValues = processEnv().reduce((acc, val, ind) => {
      if (val === longName || val === params.alias[longName]) {
        return [...acc, resolveParamAt(ind)];
      }
      return acc;
    }, []);

    if (!paramValues.length && required) {
      paramValues.push(await ask(required));
    }

    params.resolved[longName] = paramValues;
  }

  return params.resolved[longName];
}

module.exports = {
  getVal,
  addCliParam,
  setPromotHandler,
  setProcessEnvGetter,
};
