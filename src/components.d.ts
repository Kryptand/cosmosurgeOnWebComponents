/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  Appointment,
} from './services/appointment-persistor';
import {
  Patient,
} from './models/patient';
import {
  Treatment,
} from './services/treatment-persistor';

export namespace Components {
  interface AppRoot {}
  interface CosmoAppointmentContainer {
    'patientId': string;
  }
  interface CosmoAppointmentList {
    'appointments': Appointment[];
  }
  interface CosmoBaseLayout {}
  interface CosmoBotoxTreatmentFaceMap {}
  interface CosmoPatientContainer {}
  interface CosmoPatientDetail {
    'patientId': string;
  }
  interface CosmoPatientForm {
    'patient': Patient;
  }
  interface CosmoPatientList {
    'patients': Patient[];
  }
  interface CosmoTreatmentForm {
    'treatment': Treatment;
  }
}

declare global {


  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLCosmoAppointmentContainerElement extends Components.CosmoAppointmentContainer, HTMLStencilElement {}
  var HTMLCosmoAppointmentContainerElement: {
    prototype: HTMLCosmoAppointmentContainerElement;
    new (): HTMLCosmoAppointmentContainerElement;
  };

  interface HTMLCosmoAppointmentListElement extends Components.CosmoAppointmentList, HTMLStencilElement {}
  var HTMLCosmoAppointmentListElement: {
    prototype: HTMLCosmoAppointmentListElement;
    new (): HTMLCosmoAppointmentListElement;
  };

  interface HTMLCosmoBaseLayoutElement extends Components.CosmoBaseLayout, HTMLStencilElement {}
  var HTMLCosmoBaseLayoutElement: {
    prototype: HTMLCosmoBaseLayoutElement;
    new (): HTMLCosmoBaseLayoutElement;
  };

  interface HTMLCosmoBotoxTreatmentFaceMapElement extends Components.CosmoBotoxTreatmentFaceMap, HTMLStencilElement {}
  var HTMLCosmoBotoxTreatmentFaceMapElement: {
    prototype: HTMLCosmoBotoxTreatmentFaceMapElement;
    new (): HTMLCosmoBotoxTreatmentFaceMapElement;
  };

  interface HTMLCosmoPatientContainerElement extends Components.CosmoPatientContainer, HTMLStencilElement {}
  var HTMLCosmoPatientContainerElement: {
    prototype: HTMLCosmoPatientContainerElement;
    new (): HTMLCosmoPatientContainerElement;
  };

  interface HTMLCosmoPatientDetailElement extends Components.CosmoPatientDetail, HTMLStencilElement {}
  var HTMLCosmoPatientDetailElement: {
    prototype: HTMLCosmoPatientDetailElement;
    new (): HTMLCosmoPatientDetailElement;
  };

  interface HTMLCosmoPatientFormElement extends Components.CosmoPatientForm, HTMLStencilElement {}
  var HTMLCosmoPatientFormElement: {
    prototype: HTMLCosmoPatientFormElement;
    new (): HTMLCosmoPatientFormElement;
  };

  interface HTMLCosmoPatientListElement extends Components.CosmoPatientList, HTMLStencilElement {}
  var HTMLCosmoPatientListElement: {
    prototype: HTMLCosmoPatientListElement;
    new (): HTMLCosmoPatientListElement;
  };

  interface HTMLCosmoTreatmentFormElement extends Components.CosmoTreatmentForm, HTMLStencilElement {}
  var HTMLCosmoTreatmentFormElement: {
    prototype: HTMLCosmoTreatmentFormElement;
    new (): HTMLCosmoTreatmentFormElement;
  };
  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'cosmo-appointment-container': HTMLCosmoAppointmentContainerElement;
    'cosmo-appointment-list': HTMLCosmoAppointmentListElement;
    'cosmo-base-layout': HTMLCosmoBaseLayoutElement;
    'cosmo-botox-treatment-face-map': HTMLCosmoBotoxTreatmentFaceMapElement;
    'cosmo-patient-container': HTMLCosmoPatientContainerElement;
    'cosmo-patient-detail': HTMLCosmoPatientDetailElement;
    'cosmo-patient-form': HTMLCosmoPatientFormElement;
    'cosmo-patient-list': HTMLCosmoPatientListElement;
    'cosmo-treatment-form': HTMLCosmoTreatmentFormElement;
  }
}

declare namespace LocalJSX {
  interface AppRoot {}
  interface CosmoAppointmentContainer {
    'patientId'?: string;
  }
  interface CosmoAppointmentList {
    'appointments'?: Appointment[];
    'onAppointmentSelected'?: (event: CustomEvent<any>) => void;
  }
  interface CosmoBaseLayout {}
  interface CosmoBotoxTreatmentFaceMap {}
  interface CosmoPatientContainer {}
  interface CosmoPatientDetail {
    'patientId'?: string;
  }
  interface CosmoPatientForm {
    'onPatientCreated'?: (event: CustomEvent<any>) => void;
    'onPatientUpdated'?: (event: CustomEvent<any>) => void;
    'patient'?: Patient;
  }
  interface CosmoPatientList {
    'onPatientSelected'?: (event: CustomEvent<any>) => void;
    'onPatientSelectedForDeletion'?: (event: CustomEvent<any>) => void;
    'onPatientSelectedForEdit'?: (event: CustomEvent<any>) => void;
    'patients'?: Patient[];
  }
  interface CosmoTreatmentForm {
    'onTreatmentCreated'?: (event: CustomEvent<any>) => void;
    'onTreatmentUpdated'?: (event: CustomEvent<any>) => void;
    'treatment'?: Treatment;
  }

  interface IntrinsicElements {
    'app-root': AppRoot;
    'cosmo-appointment-container': CosmoAppointmentContainer;
    'cosmo-appointment-list': CosmoAppointmentList;
    'cosmo-base-layout': CosmoBaseLayout;
    'cosmo-botox-treatment-face-map': CosmoBotoxTreatmentFaceMap;
    'cosmo-patient-container': CosmoPatientContainer;
    'cosmo-patient-detail': CosmoPatientDetail;
    'cosmo-patient-form': CosmoPatientForm;
    'cosmo-patient-list': CosmoPatientList;
    'cosmo-treatment-form': CosmoTreatmentForm;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
      'cosmo-appointment-container': LocalJSX.CosmoAppointmentContainer & JSXBase.HTMLAttributes<HTMLCosmoAppointmentContainerElement>;
      'cosmo-appointment-list': LocalJSX.CosmoAppointmentList & JSXBase.HTMLAttributes<HTMLCosmoAppointmentListElement>;
      'cosmo-base-layout': LocalJSX.CosmoBaseLayout & JSXBase.HTMLAttributes<HTMLCosmoBaseLayoutElement>;
      'cosmo-botox-treatment-face-map': LocalJSX.CosmoBotoxTreatmentFaceMap & JSXBase.HTMLAttributes<HTMLCosmoBotoxTreatmentFaceMapElement>;
      'cosmo-patient-container': LocalJSX.CosmoPatientContainer & JSXBase.HTMLAttributes<HTMLCosmoPatientContainerElement>;
      'cosmo-patient-detail': LocalJSX.CosmoPatientDetail & JSXBase.HTMLAttributes<HTMLCosmoPatientDetailElement>;
      'cosmo-patient-form': LocalJSX.CosmoPatientForm & JSXBase.HTMLAttributes<HTMLCosmoPatientFormElement>;
      'cosmo-patient-list': LocalJSX.CosmoPatientList & JSXBase.HTMLAttributes<HTMLCosmoPatientListElement>;
      'cosmo-treatment-form': LocalJSX.CosmoTreatmentForm & JSXBase.HTMLAttributes<HTMLCosmoTreatmentFormElement>;
    }
  }
}


