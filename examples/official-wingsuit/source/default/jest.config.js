/**
 * Merge shared jest config with local design system config
 */
const path = require('path');

const { merge } = require('lodash');

const sharedConfig = require('../../jest.config');
const namespaces = require('./namespaces');

const rootDir = '../../';

// i.e. source/default
const dsPath = path.relative(path.join(__dirname, rootDir), __dirname);
/**
 * Jest config per folder needs:
 *   rootDir: '../../',
 *   moduleNameMapper: {
 *     '^protons[/]?(.*)': '<rootDir>/source/default/patterns/00-protons/$1',
 *     '^atoms[/]?(.*)': '<rootDir>/source/default/patterns/01-atoms/$1',
 *     '^molecules[/]?(.*)': '<rootDir>/source/default/patterns/02-molecules/$1',
 *     '^organisms[/]?(.*)': '<rootDir>/source/default/patterns/03-organisms/$1',
 *     '^templates[/]?(.*)': '<rootDir>/source/default/patterns/04-templates/$1',
 *     '^pages[/]?(.*)': '<rootDir>/source/default/patterns/05-pages/$1',
 *   },
 *
 *   @TODO: Use Object.entries() when dropping support for Node 6
 */
const moduleNameMapper = Object.keys(namespaces).reduce((acc, entry) => {
  // i.e '^protons[/]?(.*)'
  const nameRegex = `^${entry}[/]?(.*)`;
  // i.e source/default/_patterns/04-templates
  const namePath = path.relative(path.join(__dirname, rootDir), namespaces[entry]);
  // i.e. moduleNameMapper['^protons[/]?(.*)'] = '<rootDir>/source/default/_patterns/00-protons/$1';
  acc[nameRegex] = `<rootDir>/${namePath}/$1`;
  return acc;
}, {});

module.exports = merge({}, sharedConfig, {
  rootDir,
  moduleNameMapper,
  testMatch: [`<rootDir>/${dsPath}/**/*.test.js`],
});
