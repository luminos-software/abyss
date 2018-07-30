// https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const EmailUtil = {
  validate(text: string | null | undefined) {
    if (!text) {
      return false;
    }
    return EMAIL_REGEX.test(text);
  }
};
