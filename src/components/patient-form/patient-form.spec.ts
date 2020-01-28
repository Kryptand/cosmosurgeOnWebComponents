import {newSpecPage} from "@stencil/core/testing";
import {PatientForm} from "./patient-form";
import {generateId} from "../../helpers/id-generator";

describe("<cosmo-patient-form/> spec", () => {
  beforeEach(async () => {
    await newSpecPage({
      components: [PatientForm],
      html: `<cosmo-patient-form></cosmo-patient-form>`
    });
  });
  it("should change the firstname property on keydown", async () => {
    const instance = new PatientForm();
    instance.handleFirstNameChange({target: {value: "testman"}});
    expect(instance.firstname).toBe("testman");
  });
  it("should change the lastname property on keydown", async () => {
    const instance = new PatientForm();
    instance.handleFirstNameChange({target: {value: "lastname"}});
    expect(instance.firstname).toBe("lastname");
  });
  it("should change the lastname property on keydown", async () => {
    const instance = new PatientForm();
    instance.handleLastNameChange({target: {value: "lastname"}});
    expect(instance.lastname).toBe("lastname");
  });
  it("should dispatch an update event if there is a patient as input", async () => {
    const instance = new PatientForm();
    instance["modalElement"] = {
      dismiss: () => {
      }
    } as any;
    instance.patient = {
      firstname: "first",
      lastname: "last",
      id: generateId(),
      createdAt: Date.now()
    };
    const event = await instance.handleSubmit();
    expect(event.type).toBe("update");
  });
  it("should dispatch an update event with the corresponding formvalue", async () => {
    const instance = new PatientForm();
    const id = generateId();
    const now = Date.now();
    instance["modalElement"] = {
      dismiss: () => {
      }
    } as any;
    instance.patient = {
      firstname: "first",
      lastname: "last",
      id: id,
      createdAt: now
    };
    const event = await instance.handleSubmit();
    expect(event.value).toBe({
      firstname: "first",
      lastname: "last",
      id: id,
      createdAt: now
    });
  });
  it("should dispatch an create event if there is no patient as input", async () => {
    const instance = new PatientForm();
    instance["modalElement"] = {
      dismiss: () => {
      }
    } as any;
    const event = await instance.handleSubmit();
    expect(event.type).toBe("create");
  });
});
