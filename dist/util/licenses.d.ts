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
export declare const parseLicenses: (data: Record<string, ILicense>) => IParsedLicense[];
export {};
