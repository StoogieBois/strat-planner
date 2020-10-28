import React from 'react'
import { Box, FormLabel, Select } from '@chakra-ui/core'
import { useRecoilState } from 'recoil'
import { gameState } from '../atoms'

function GameSelector() {
  const [game, setGame] = useRecoilState(gameState)

  return (
    <Box>
      <FormLabel htmlFor="game-selector">Game</FormLabel>
      <Select id="game-selector" value={game} onChange={(e) => setGame(e.target.value)}>
        <option value="default">Default</option>
        <option value="seige">Rainbow Six Siege</option>
        <option value="csgo">CSGO</option>
        <option value="rocket-league">Valorant</option>
        <option value="valorant">Rocket League</option>
      </Select>
    </Box>
  )
}

export default GameSelector
