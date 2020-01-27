export type Subject = string;

export interface Receiver {
  receive(topic: string, subject: Subject)
}

export interface EventBus {
  subscribe(topic: string, receiver: Receiver): void;

  unsubscribe(topic: string, receiver: Receiver): void;

  publish(topic: string, subject: Subject): Promise<void>;
}

export class EventBusConcrete implements EventBus {
  receivers: {
    [key: string]: Receiver[],
  } = {};

  constructor(
    public defaultTriesCount: number = 5,
  ) {
  }

  public async publish(topic: string, subject: Subject, tries: number = 0): Promise<void> {
    if (tries === 0) {
      tries = this.defaultTriesCount;
    }

    const receivers = this.getTopicReceivers(topic);
    receivers.map(
      receiver => new Promise(resolve => resolve(this.retryPublish(topic, subject, receiver, tries))),
    );
  }

  private getTopicReceivers(topic: string): Receiver[] {
    if (!this.receivers[topic]) {
      return [];
    }

    return this.receivers[topic];
  }

  private retryPublish(topic: string, subject: Subject, receiver: Receiver, triesLeft: number) {

    try {
      const isValid = triesLeft > 0;
      if (!isValid) {
        throw new Error('What happened?');
      }
      receiver.receive(topic, subject);
    } catch (e) {
      console.log('error happened');
      triesLeft -= 1;
      if (triesLeft > 0) {
        this.retryPublish(topic, subject, receiver, triesLeft);
      }
    }
  }

  public subscribe(topic: string, receiver: Receiver) {
    if (!this.receivers[topic]) {
      this.receivers[topic] = []
    }

    this.receivers[topic].push(receiver);
  }

  public unsubscribe(topic: string, receiver: Receiver) {
    if (!this.receivers[topic]) {
      return;
    }
    this.receivers[topic] = this.receivers[topic].filter(item => item !== receiver);
  }
}

export const EventBusInstance = new EventBusConcrete();
