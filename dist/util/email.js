"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
exports.EmailUtil = {
    validate(text) {
        if (!text) {
            return false;
        }
        return EMAIL_REGEX.test(text);
    }
};
//# sourceMappingURL=email.js.map