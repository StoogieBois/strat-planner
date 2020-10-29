import React from 'react'
import { Flex, Text, theme } from '@chakra-ui/core'
import SettingsDrawer from './SettingsDrawer'

function AppBar() {
  return (
    <Flex
      backgroundColor={theme.colors.gray['100']}
      height="56px"
      p={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="2xl">Strat Planner</Text>
      <SettingsDrawer />
    </Flex>
  )
}

export default AppBar
