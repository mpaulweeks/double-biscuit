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

const SoundButton = styled.div`
  cursor: pointer;
  font-size: 12px;
  padding: 10px;

  border-color: black;
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;

  color: black;
  background-color: white;
  &:hover {
    color: white;
    background-color: black;
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
        <SoundButton onClick={() => this.toggleBGM()}>
          {bgmMuted ? 'Play BGM' : 'Mute BGM'}
        </SoundButton>
        <SoundButton onClick={() => this.toggleSFX()}>
          {sfxMuted ? 'Play SFX' : 'Mute SFX'}
        </SoundButton>
      </SoundContainer>
    );
  }
}

export default SoundBar;
