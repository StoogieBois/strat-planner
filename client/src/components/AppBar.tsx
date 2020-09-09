import React from 'react'
import { Box, Flex, Text, theme } from '@chakra-ui/core'
import { AiFillGithub } from 'react-icons/all'
import styled from '@emotion/styled'

const GitHub = styled(Box)`
  cursor: pointer;
`

function AppBar() {
  return (
    <Flex
      backgroundColor={theme.colors.gray['200']}
      height="56px"
      p={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontSize="2xl">Strat Planner</Text>
      <GitHub
        as={AiFillGithub}
        onClick={() =>
          window.open(
            'https://github.com/StoogieBois/strat-planner',
            '_blank',
            'noopener,noreferrer'
          )
        }
        size="32px"
      />
    </Flex>
  )
}

export default AppBar
