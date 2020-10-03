import React from 'react'
import { Flex, IconButton, Stack, Text } from '@chakra-ui/core'
import { useRecoilState } from 'recoil'
import { toolState } from '../atoms'
import styled from '@emotion/styled'
import {
  BiCircle,
  BiMinus,
  BiPencil,
  BiPointer,
  BiRectangle
} from 'react-icons/all'

const Root = styled.div`
  max-width: 120px;
  height: 300px;
  background-color: white;
  position: absolute;
  top: 100px;
  left: 24px;
  z-index: 100;
`

const TOOLS_WITH_ICONS = [
  { name: 'select', icon: BiPointer },
  { name: 'pencil', icon: BiPencil },
  { name: 'line', icon: BiMinus },
  { name: 'rectangle', icon: BiRectangle },
  { name: 'circle', icon: BiCircle }
]

const Toolbar: React.FC = () => {
  const [tool, setTool] = useRecoilState(toolState)

  const renderToolIcons = () => {
    return TOOLS_WITH_ICONS.map((el) => {
      const { name, icon } = el
      return (
        <IconButton
          key={name}
          variantColor={tool === name ? 'green' : 'blue'}
          aria-label={`${name} tool`}
          onClick={() => setTool(name)}
          icon={icon}
        >
          {' '}
        </IconButton>
      )
    })
  }

  return (
    <Root>
      <Text>Tools</Text>
      <Flex direction="column">
        <Stack spacing={1}>{renderToolIcons()}</Stack>
      </Flex>
    </Root>
  )
}

export default Toolbar
