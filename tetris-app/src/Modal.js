import styled from 'styled-components';

const ScreenCover = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 50px;
  border-radius: 25px;

  text-align: center;
  color: black;
  background-color: white;
  border: 2px solid black;
`;

const ModalExit = styled.div`
  position: fixed;
  top: 10px;
  right: 15px;
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
  &:after {
    content: '❌';
  }
`;

const ModalLine = styled.div`
  padding: 10px;
  & * {
    margin: 0px auto;
  }
`;

const ModalMessage = styled.div`
  font-size: 12pt;
  color: ${props => props.color};
`;

const ModalInput = styled.input`
  font-size: 16pt;
`;

const ModalSelect = styled.select`
  font-size: 16pt;
`;

const ModalSubmit = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;

  text-align: center;

  border-radius: 15px;
  border: 2px solid black;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: black;
  }
`;

export {
  ScreenCover,
  ModalWindow,
  ModalExit,
  ModalLine,
  ModalMessage,
  ModalInput,
  ModalSelect,
  ModalSubmit,
};
