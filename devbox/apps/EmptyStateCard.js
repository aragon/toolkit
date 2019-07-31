import React from 'react'
import styled from 'styled-components'
import { Button, EmptyStateCard, Text, theme, IconFile } from '@aragon/ui'
import emptyStatePng from '../assets/voting-empty-state.png'

class App extends React.Component {
  render() {
    const text1 = 'You seem to not have any content on your wall.'
    const text2 = 'Nothing to see here.'
    const button = (
      <Button onClick={() => console.log('Click on button')}>Create</Button>
    )
    const illustration = <img src={emptyStatePng} alt="" height="160" />
    return (
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 48px;
          justify-items: center;
          align-items: center;
          padding-top: 48px;
        `}
      >
        <EmptyStateCard text={text1} action={button} />
        <EmptyStateCard text={text1} />
        <EmptyStateCard text={text2} action={button} />
        <EmptyStateCard illustration={illustration} text={text1} />
        <EmptyStateCard
          illustration={illustration}
          text={text2}
          action={button}
        />
        <EmptyStateCard illustration={illustration} text={text2} />
        <EmptyStateCard
          illustration={illustration}
          text={text1}
          action={button}
        />
      </div>
    )
  }
}

export default App
