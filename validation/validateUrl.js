const Joi = require('joi');

// create a schema for url validation
exports.urlValidation = (data) => {

  const schema = Joi.object({
    originalUrl: Joi.string()
      .uri()
      .required()
      .dataUri()
  });

  return schema.validateAsync(data);
};

// Approach II with regex
exports.isValidUrl = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
};

console.log(isValidUrl('https://www.freecodecamp.org/')); // true
console.log(isValidUrl('https://www.google.com/search?q=nanoid+does+not+work+cjs&sca_esv=562184719&rlz=1C1OKWM_enIN1049IN1049&sxsrf=AB5stBjmui8jSoa8Ti86DWezcXCeF2otZg%3A1693660109308&ei=zTPzZOqZEq-TseMP9smq-AI&ved=0ahUKEwiqtL3J_4uBAxWvSWwGHfakCi8Q4dUDCA8&uact=5&oq=nanoid+does+not+work+cjs&gs_lp=Egxnd3Mtd2l6LXNlcnAiGG5hbm9pZCBkb2VzIG5vdCB3b3JrIGNqczIFEAAYogQyBRAAGKIEMgUQABiiBDIFEAAYogRI56sCUJgNWLmQAnANeAGQAQCYAa8EoAGzU6oBCjItMTYuOC43LjG4AQPIAQD4AQHCAgoQABhHGNYEGLADwgIIEAAYigUYkQLCAgcQABiKBRhDwgILEAAYgAQYsQMYgwHCAhEQLhiABBixAxiDARjHARjRA8ICBRAAGIAEwgIHECMYigUYJ8ICDhAuGIoFGMcBGNEDGJECwgIJEAAYigUYChhDwgIHEC4YigUYQ8ICChAuGIoFGLEDGEPCAggQLhixAxiABMICCBAAGIAEGLEDwgIFEC4YgATCAgoQABiKBRixAxhDwgIHEAAYgAQYCsICDRAuGIAEGMcBGK8BGArCAgoQABiABBixAxgKwgINEAAYgAQYsQMYgwEYCsICCBAAGIoFGIYDwgIcEC4YgAQYxwEYrwEYChiXBRjcBBjeBBjgBNgBAcICChAAGA0YgAQYsQPCAgcQABgNGIAE4gMEGAAgQYgGAZAGCLoGBggBEAEYFA&sclient=gws-wiz-serp')); // true