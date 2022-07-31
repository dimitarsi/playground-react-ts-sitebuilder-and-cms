const packagesMap: Record<string, any> = {};

const browserRequire = (packageName: string) => {
  return packagesMap[packageName];
};

// @ts-ignore
window.require = browserRequire;

export const defineModule = (packageName: string, pac: any) => {
  packagesMap[packageName] = pac;
};
