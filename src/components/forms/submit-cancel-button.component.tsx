import {Component, Event, EventEmitter, h, Prop} from "@stencil/core";

@Component({
  tag: 'cosmo-submit-cancel',
  styles: `
    .center{
      text-align: center;
    }
    .flex{
      display:flex;
      justify-content: flex-end;
    }
    `
})
export class SubmitCancelButton {
  @Prop() submitDisabled: boolean;
  @Event() submitEvent: EventEmitter;
  @Event() cancelEvent: EventEmitter;
  render = () => [
    <div class="flex">
      <span class="spacer"/>
      <ion-button id="test-patient-form-cancel" color="danger" onClick={() => this.cancelEvent.emit()}>Abbrechen
      </ion-button>
      <ion-button id="test-patient-form-submit" type="submit" color="success"
                  disabled={this.submitDisabled}
                  onClick={() => this.submitEvent.emit()}>Speichern
      </ion-button>
    </div>
  ]
}
