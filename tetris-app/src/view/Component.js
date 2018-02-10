import styled from 'styled-components';

const AllGames = styled.div`
  width: 100%;
  height: calc(100% - 50px);

  display: flex;
  justify-content: space-around;
`;

const FlexTop = styled.div`
  flex: 1;
`;

const FlexBottom = styled.div`
  flex: initial;
`;

const SectionTitle = styled.div`
  font-size: 20pt;
  @media (max-width: 1000px) {
    font-size: 16pt;
  }
`;

const IncomingAttack = styled(SectionTitle)`
  color: red;
`;

const TetroCanvas = styled.canvas`
  /* 5x3 */
  width: 75px;
  height: 45px;
  border-color: white;
  border-width: 3px;
  border-style: solid;

  @media (max-width: 1000px) {
    width: 50px;
    height: 30px;
  }
`;

const BigTetroCanvas = styled(TetroCanvas)`
  width: 150px;
  height: 90px;
  @media (max-width: 1000px) {
    width: 75px;
    height: 45px;
  }
`;

export {
  AllGames,
  FlexTop,
  FlexBottom,
  SectionTitle,
  IncomingAttack,
  TetroCanvas,
  BigTetroCanvas,
};
