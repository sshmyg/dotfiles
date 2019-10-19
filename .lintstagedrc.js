module.exports = {
  '**/*.{[jt]s?(x),md}': ['yarn test'],
  '**/*.{[jt]s?(x),json,md,yml}': ['prettier --write', 'git add'],
};
