import React, { Component } from 'react';
import styled from 'styled-components';

import { Cookies } from './Constants';
import CookieJar from './Cookie';
import Jukebox from './view/Jukebox';

const SoundContainer = styled.div`
  display: flex;

  @media (max-width: 400px) {
    display: none;
  }
`;

class SoundBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      bgmMuted: CookieJar.ensure(Cookies.MuteBGM, false) === 'true',
      sfxMuted: CookieJar.ensure(Cookies.MuteSFX, false) === 'true',
    }
  }
  toggleBGM(){
    const isMuted = !this.state.bgmMuted;
    this.setState({
      bgmMuted: isMuted,
    })
  }
  toggleSFX(){
    const isMuted = !this.state.sfxMuted;
    this.setState({
      sfxMuted: isMuted,
    })
  }
  render(){
    const { bgmMuted, sfxMuted } = this.state;
    Jukebox.setMuteBGM(bgmMuted);
    Jukebox.setMuteSFX(sfxMuted);
    CookieJar.set(Cookies.MuteBGM, bgmMuted);
    CookieJar.set(Cookies.MuteSFX, sfxMuted);
    return (
      <SoundContainer>
        <div>
          {bgmMuted &&
            <button onClick={() => this.toggleBGM()}>
              Play BGM
            </button>
          }
          {!bgmMuted &&
            <button onClick={() => this.toggleBGM()}>
              Mute BGM
            </button>
          }
        </div>
        <div>
          {sfxMuted &&
            <button onClick={() => this.toggleSFX()}>
              Play SFX
            </button>
          }
          {!sfxMuted &&
            <button onClick={() => this.toggleSFX()}>
              Mute SFX
            </button>
          }
        </div>
      </SoundContainer>
    );
  }
}

export default SoundBar;
