import {newE2EPage} from "@stencil/core/testing";

const cancelButton = page =>
  page.find("cosmo-patient-form >>> #test-id-patient-form-cancel");
const submitButton = page =>
  page.body.querySelector("#test-id-patient-form-submit");
const firstnameText = page =>
  page.body.querySelector("#test-id-patient-form-firstname");
const lastnameText = page =>
  page.body.querySelector("#test-id-patient-form-lastname");

describe("<cosmo-patient-form/> spec", () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
    <cosmo-patient-form></cosmo-patient-form>
  `);
  });
  test("changing the firstname input should change the firstname property", async () => {
    const button = await cancelButton(page);
    console.debug(button);
  });
});
