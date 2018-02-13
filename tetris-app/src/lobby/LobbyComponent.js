import styled from 'styled-components';

const LobbyWindow = styled.div`;
  height: auto;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const LobbyBlock = styled.div`
  padding-bottom: 30px;
`;

const LobbyLine = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & * {
    margin: 0px auto;
  }
`;

const LobbyMessage = styled.div`
  font-size: 14pt;
  color: ${props => props.color};
`;

const LobbyInput = styled.input`
  font-size: 16pt;
  width: 200px;
  border-color: ${props => props.isError ? 'red' : 'none'};
`;

const LobbySelect = styled.select`
  font-size: 16pt;
`;

const LobbyJoin = styled.div`
  width: 50px;
  height: 30px;
  line-height: 30px;

  text-align: center;

  border-radius: 15px;
  border: 2px solid white;
  &:hover {
    cursor: pointer;
    color: black;
    background-color: white;
  }
`;

export {
  LobbyWindow,
  LobbyBlock,
  LobbyLine,
  LobbyMessage,
  LobbyInput,
  LobbySelect,
  LobbyJoin,
};
