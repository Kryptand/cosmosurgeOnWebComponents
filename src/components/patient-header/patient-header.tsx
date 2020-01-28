import {h} from "@stencil/core";

type HeaderProps = { patient? };
export const PatientHeader: (props: HeaderProps) => any = (
  props: HeaderProps
) => {
  return props.patient ? (
    <h1 class="center" data-testId="patient-header-filled">
      {props.patient.firstname && props.patient.lastname
        ? `${props.patient.firstname} ${props.patient.lastname}`
        : props.patient.firstname
          ? props.patient.firstname
          : props.patient.lastname}{" "}
      bearbeiten
    </h1>
  ) : (
    <h1 class="center" data-testId="patient-header-empty">
      Patient erstellen
    </h1>
  );
};
