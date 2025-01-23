import React, { useState } from "react";
import GameButtons from "../components/seriesDeportivas/GameButtons";
import GameSelector from "../components/seriesDeportivas/GameSelector";
import ProbabilityInput from "../components/seriesDeportivas/ProbabilityInput";
import StartButton from "../components/seriesDeportivas/StartButton";
import TeamNames from "../components/seriesDeportivas/TeamNames";
import LoadGameButton from "../components/seriesDeportivas/LoadGameButton";
import Table from "../components/seriesDeportivas/Table";
import styles from "../components/seriesDeportivas/styles/SeriesDeportivas.module.css";


// Definición del tipo para los datos del juego
interface GameData {
  teamA: string;
  teamB: string;
  homeProb: number;
  awayProb: number;
  games: number;
  gameStatus: boolean[];
}



function Series() {
  // Datos principales de la aplicación
  const [teamA, setTeamA] = useState("Equipo A");
  const [teamB, setTeamB] = useState("Equipo B");
  const [homeProb, setHomeProb] = useState(0.5);
  const [awayProb, setAwayProb] = useState(0.5);
  const [games, setGames] = useState(3);
  const [gameStatus, setGameStatus] = useState(Array(games).fill(true)); // Estado de cada juego (local o visitante)
  const [showTable, setShowTable] = useState(false);

  const handleStart = () => setShowTable(true);

  // Carga los datos de un juego guardado
  const handleLoadGame = (gameData: GameData) => {
    setTeamA(gameData.teamA);
    setTeamB(gameData.teamB);
    setHomeProb(gameData.homeProb);
    setAwayProb(gameData.awayProb);
    setGames(gameData.games);
    setGameStatus(gameData.gameStatus);
    setShowTable(false); // Oculta la tabla
    //console.log("Juego cargado:", gameData);
  };

  // Actualiza el estado de los juegos (local o visitante)
  const handleGameStatusChange = (newStatus: boolean[]) => {
    setGameStatus(newStatus);
    setShowTable(false); // Oculta la tablao
    //console.log("Estados actualizados:", newStatus);
  };

  const gameData = { teamA, teamB, homeProb, awayProb, games, gameStatus };

  return (
    <>
      <div className={styles.pageContainerS}>
        <div className={styles.containerS}>
          <h1 className={styles.title}>Series Deportivas</h1>
          <div className={styles.decorativeLine}></div>
          <LoadGameButton onLoadGame={handleLoadGame} gameData={gameData} />
          <TeamNames
            teamA={teamA}
            teamB={teamB}
            onChangeTeamA={setTeamA}
            onChangeTeamB={setTeamB}
          />
          <div className={styles.probabilityContainer}>
            <ProbabilityInput
              label={`Probabilidad de ${teamA} para ganar de local`}
              value={homeProb}
              onChange={setHomeProb}
            />
            <ProbabilityInput
              label={`Probabilidad de ${teamA} para ganar de visita`}
              value={awayProb}
              onChange={setAwayProb}
            />
          </div>
          <GameSelector games={games} onChange={setGames} />
          <div className={styles.noteContainer}>
            <span className={styles.localNote}>
              "{teamA}" juega de local
            </span>
            <span className={styles.visitNote}>
              "{teamA}" juega de visita
            </span>
          </div>
          <GameButtons
            games={games}
            onGameStatusChange={handleGameStatusChange}
            initialStatus={gameStatus}
          />
          <StartButton onClick={handleStart} />
        </div>
        {showTable && (
          <div className={styles.tableWrapper}>
            <Table
              games={games}
              teamA={teamA}
              teamB={teamB}
              ph={homeProb}
              pr={awayProb}
              gameStatus={gameStatus}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Series;
