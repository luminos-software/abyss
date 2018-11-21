"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLicenses = (data) => Object.keys(data).map(key => {
    const typedKey = key;
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
});
const GITHUB_REGEX = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
const extractNameFromGithubUrl = (url) => {
    if (!url) {
        return undefined;
    }
    const components = GITHUB_REGEX.exec(url);
    if (components && components.length > 5) {
        return components[5];
    }
    return undefined;
};
const capitalizeFirstLetter = (name) => name.charAt(0).toUpperCase() + name.slice(1);
//# sourceMappingURL=licenses.js.map