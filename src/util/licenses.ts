interface ILicense {
  licenses: string;
  repository?: string;
  licenseUrl?: string;
  parents: string;
}

interface IParsedLicense {
  key: string;
  name: string;
  licenses: string;
  version: string;
  image?: string;
  userUrl?: string;
  username?: string;
  repository?: string;
  licenseUrl?: string;
}

export const parseLicenses = (data: Record<string, ILicense>): IParsedLicense[] => Object.keys(data).map(key => {
  const typedKey = key as keyof typeof data;
  const license = data[typedKey];
  const [name, version] = key.split('@');

  let username = extractNameFromGithubUrl(license.repository) || extractNameFromGithubUrl(license.licenseUrl);

  let userUrl;
  let image;
  if (username) {
    username = capitalizeFirstLetter(username);
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    licenses: license.licenses.slice(0, 405),
    version,
    repository: license.repository,
    licenseUrl: license.licenseUrl
  };
})

const GITHUB_REGEX = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;

const extractNameFromGithubUrl = (url?: string) => {
  if (!url) {
    return undefined;
  }

  const components = GITHUB_REGEX.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return undefined;
};

const capitalizeFirstLetter = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

