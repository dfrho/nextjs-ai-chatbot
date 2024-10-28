module.exports = {
  ignoreDirs: ['dist', 'build', 'node_modules'],
  ignorePatterns: ['.*', '*.config.js'],
  parsers: {
    '**/*.js': depcheck.parser.es6,
    '**/*.jsx': depcheck.parser.jsx,
    '**/*.ts': depcheck.parser.typescript,
    '**/*.tsx': depcheck.parser.typescript,
  },
  detectors: [
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration,
  ],
  specials: [depcheck.special.eslint, depcheck.special.webpack],
};
