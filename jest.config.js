module.exports = {
  clearMocks: true,
  transform: {
    '.(js|ts)$': ['esbuild-jest', { sourcemap: true, target: 'es2021' }],
  },
};
