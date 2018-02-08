import React, { Component } from 'react';

import {
  ScreenCover,
  ModalWindow,
  ModalLine,
  ModalMessage,
  ModalInput,
  ModalSubmit,
} from '../Modal';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      lobbies: [],
    };
  }
  render() {
    const messageColor = "black";
    const messageText = "sample";
    return (
      <div>
        <ScreenCover></ScreenCover>
        <ModalWindow>
          <ModalLine>
            menu prompt
          </ModalLine>
          <ModalLine>
            <ModalInput
              onKeyPress={e => this.onKeyPress(e)}
              innerRef={e => this.payload = e}
              type="password"
            />
          </ModalLine>
          <ModalLine>
            <ModalMessage color={messageColor}>
              &nbsp;{messageText}&nbsp;
            </ModalMessage>
          </ModalLine>
          <ModalLine>
            <ModalSubmit onClick={() => this.submit()}>
              submit
            </ModalSubmit>
          </ModalLine>
        </ModalWindow>
      </div>
    );
  }
}

export default Menu;
