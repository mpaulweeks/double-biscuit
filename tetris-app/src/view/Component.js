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

const PrimaryInfo = styled.div`
  height: 92%;
  padding-top: 2%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const PrimaryCanvasContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GridCanvas = styled.div`
  width: 300px;
  height: 660px;
  border-color: white;
  border-width: 9px;
  border-style: double;
`;

const EnemyContainer = styled.div`
  text-align: center;
`;
const EnemyGames = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: 357px;
`;
const EnemyCanvasWrapper = styled.div`
  width: 50%;
  box-sizing: border-box;
`;
const EnemyCanvas = styled.div`
  width: 135px;
  height: 297px;
  margin: 10px;
  border-color: white;
  border-width: 3px;
  border-style: solid;
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
  PrimaryInfo,
  PrimaryCanvasContainer,
  GridCanvas,
  EnemyContainer,
  EnemyGames,
  EnemyCanvasWrapper,
  EnemyCanvas,
  SectionTitle,
  IncomingAttack,
  TetroCanvas,
  BigTetroCanvas,
};
