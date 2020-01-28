import {PatientHeader} from "./patient-header";

const MOCK_PATIENT = {
  firstname: "Tester",
  lastname: "Testman"
};
const MOCK_PATIENT_ONLY_FIRST = {
  firstname: "Tester"
};
const MOCK_PATIENT_ONLY_LAST = {
  lastname: "Testman"
};
describe("<PatientHeader/> ", () => {
  it("should show the patients firstname and lastname if they are existing", async () => {
    const component = PatientHeader({patient: MOCK_PATIENT});
    const testText = component["$children$"][0]["$text$"];
    expect(testText).toBe("Tester Testman bearbeiten");
  });
  it("should show the patients firstname if it is existing", async () => {
    const component = PatientHeader({patient: MOCK_PATIENT_ONLY_FIRST});
    const testText = component["$children$"][0]["$text$"];
    console.debug(testText);
    expect(testText).toBe("Tester bearbeiten");
  });
  it("should show the patients lastname if it is existing", async () => {
    const component = PatientHeader({patient: MOCK_PATIENT_ONLY_LAST});
    const testText = component["$children$"][0]["$text$"];
    console.debug(testText);
    expect(testText).toBe("Testman bearbeiten");
  });
  it("should show the create text when there is no patient", async () => {
    const component = PatientHeader({patient: null});
    const testText = component["$children$"][0]["$text$"];
    console.debug(testText);
    expect(testText).toBe("Patient erstellen");
  });
});
