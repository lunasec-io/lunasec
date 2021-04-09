import React, {Component} from 'react';
import {SecureFormContext} from './SecureFormContext';
import {FrameMessageCreator} from '../lib/rpc/frame-message-creator';
import {
  FrameMessage,
  InboundFrameMessageMap
} from '../lib/rpc/types';
import {addReactEventListener} from '../lib/rpc/listener';

export interface SecureFormProps {
  onSubmit: (formData: Record<string, string>) => void;
}

export class SecureForm extends Component<SecureFormProps> {
  declare context: React.ContextType<typeof SecureFormContext>

  private readonly messageCreator: FrameMessageCreator;
  private readonly childRefLookup: Record<string, [string, React.RefObject<HTMLIFrameElement>]>;
  private readonly abortController: AbortController;

  constructor(props: SecureFormProps) {
    super(props);
    this.messageCreator = new FrameMessageCreator();
    this.childRefLookup = {};
    this.abortController = new AbortController();
  }

  componentDidMount() {
    // Pushes events received back up.
    addReactEventListener(window, this.abortController, message => this.messageCreator.messageReceived(message));
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  async onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const awaitedPromises: Promise<{nonce: string, response: FrameMessage<InboundFrameMessageMap, "ReceiveCommittedToken">} | null>[] = [];

    Object.keys(this.childRefLookup).forEach(key => {
      const [name, ref] = this.childRefLookup[key];

      if (!ref.current || !ref.current.contentWindow) {
        console.error('Invalid frame detected', key, name, ref);
        return;
      }

      awaitedPromises.push(this.triggerTokenCommit(ref.current.contentWindow, key));
    })

    const responses = await Promise.all(awaitedPromises);

    const formData = responses.reduce((out, data) => {
      if (data === null) {
        return out;
      }

      const {nonce, response} = data;

      const name = this.childRefLookup[nonce][0];

      out[name] = response.data.token;

      return out;
    }, {} as Record<string, string>)

    this.props.onSubmit(formData);
  }

  async triggerTokenCommit(frameContext: Window, nonce: string): Promise<{nonce: string, response: FrameMessage<InboundFrameMessageMap, "ReceiveCommittedToken">} | null> {
    const message = this.messageCreator.createMessageToFrame('CommitToken');

    if (message === null) {
      console.error('Unable to create CommitToken message');
      return null;
    }

    const response = await this.messageCreator.sendMessageToFrameWithReply(frameContext, message);

    if (response === null) {
      console.error('Unable to retrieve reply for frame');
      return null;
    }

    return {nonce, response};
  }

  render() {
    return (
      <SecureFormContext.Provider value={{
        addComponentRef: (ref, frameId, name) => {
          this.childRefLookup[frameId] = [name, ref];
        },
        removeComponentRef: frameId => {
          if (this.childRefLookup[frameId]) {
            delete this.childRefLookup[frameId];
          }
        }
      }}>
        <form onSubmit={(e) => this.onSubmit(e)}>
          {this.props.children}
        </form>
      </SecureFormContext.Provider>
    );
  }
}
