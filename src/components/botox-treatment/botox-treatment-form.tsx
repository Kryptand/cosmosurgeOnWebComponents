import {Component, Element, Event, Prop, State} from "@stencil/core";
import {BotoxRegion, BotoxTreatment, BotoxTreatmentDetail} from "../../services/treatment-persistor";
import {generateId} from "../../helpers/id-generator";

@Component({
  tag: 'cosmo-botox-treatment-face-map',
  styles: `
  figure{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    }
    svg {
    width: 100vw;
    margin: auto;
    display: block;
    }
    .faceimage {
    max-width: 480px;margin: 1em auto;
    }
    `
})
export class BotoxTreatmentForm {
  @Prop() botoxTreatment: BotoxTreatment;

  @Element() el: HTMLElement;
  modalElement: HTMLIonModalElement = this.el.closest("ion-modal");

  @Event() treatmentsUpdated: BotoxTreatment;
  @Event() treatmentCreated: BotoxTreatment;

  @State() forehead: BotoxTreatmentDetail = {region: 'forehead', amount: 0};
  @State() frownLines: BotoxTreatmentDetail = {region: 'frownLines', amount: 0};
  @State() droppyBrows: BotoxTreatmentDetail = {region: 'droppyBrows', amount: 0};
  @State() crowsFeet: BotoxTreatmentDetail = {region: 'crowsFeet', amount: 0};
  @State() eyelid: BotoxTreatmentDetail = {region: 'eyelid', amount: 0};
  @State() bunnyLines: BotoxTreatmentDetail = {region: 'bunnyLines', amount: 0};
  @State() lipLines: BotoxTreatmentDetail = {region: 'lipLines', amount: 0};
  @State() gummySmile: BotoxTreatmentDetail = {region: 'gummySmile', amount: 0}
  @State() marionetteLines: BotoxTreatmentDetail = {region: 'marionetteLines', amount: 0};
  @State() chin: BotoxTreatmentDetail = {region: 'chin', amount: 0};
  @State() neck: BotoxTreatmentDetail = {region: 'neck', amount: 0};

  updateAmount(botoxRegion: BotoxRegion, updateAmount = 1) {
    const {amount, region} = this[botoxRegion];
    this[botoxRegion] = {
      amount: amount + updateAmount, region: region
    }
  }

  componentDidLoad() {
    this.initParams(this.modalElement?.componentProps?.treatment);
  }

  public async handleSubmit() {
    let formValue = {
      ...new BotoxTreatment(),
      id: this.botoxTreatment?.id ?? generateId(),
      treatmentDetail: [this.forehead, this.frownLines, this.droppyBrows, this.crowsFeet, this.eyelid, this.bunnyLines, this.lipLines, this.gummySmile, this.marionetteLines, this.chin, this.neck]
    };
    let event = {value: formValue, type: ''};
    if (this.botoxTreatment) {
      event.type = 'update';
    } else {
      event.type = 'create';
    }
    console.debug(event);
    await this.modalElement.dismiss(event);
    return event;
  }

  public render = () => {

  }

  private initParams(treatment: BotoxTreatment) {
    treatment.treatmentDetail.forEach(detail => {
      this[detail.region] = detail;
    })
  }

  private reset() {
    this.forehead = {region: 'forehead', amount: 0};
    this.frownLines = {region: 'frownLines', amount: 0};
    this.droppyBrows = {region: 'droppyBrows', amount: 0};
    this.crowsFeet = {region: 'crowsFeet', amount: 0};
    this.eyelid = {region: 'eyelid', amount: 0};
    this.bunnyLines = {region: 'bunnyLines', amount: 0};
    this.lipLines = {region: 'lipLines', amount: 0};
    this.gummySmile = {region: 'gummySmile', amount: 0};
    this.marionetteLines = {region: 'marionetteLines', amount: 0};
    this.chin = {region: 'chin', amount: 0};
    this.neck = {region: 'neck', amount: 0};
  }
}
