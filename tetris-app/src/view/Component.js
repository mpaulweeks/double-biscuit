import styled from 'styled-components';

const AllGames = styled.div`
  width: 100%;
  height: calc(100% - 50px);

  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
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
const GridCanvas = styled.canvas`
  width: 300px;
  height: 660px;
  border-color: white;
  border-width: 9px;
  border-style: double;

  @media (max-width: 1000px) {
    width: 200px;
    height: 440px;
    border-style: solid;
    border-width: 5px;
  }
`;

const EnemyContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EnemyGames = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const EnemyCanvasWrapper = styled.div`
  box-sizing: border-box;
`;
const EnemyName = styled.div`
`;
const EnemyCanvas = styled.canvas`
  width: 250px;
  height: 550px;
  margin: 10px;
  border-color: white;
  border-width: 6px;
  border-style: solid;

  @media (max-width: 400px) {
    width: 100px;
    height: 220px;
    margin: 1px;
    border-width: 2px;
  }
`;

const SectionTitle = styled.div`
  padding: 10px;
  padding-top: 20px;
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
  EnemyName,
  EnemyCanvas,
  SectionTitle,
  IncomingAttack,
  TetroCanvas,
  BigTetroCanvas,
};
