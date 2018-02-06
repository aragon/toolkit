import React from 'react'
import createHistory from 'history/createBrowserHistory'
import styled from 'styled-components'
import { AragonApp } from '@aragon/ui'
import Sidebar from 'comps/Sidebar/Sidebar'
import initGlobalStyles from './global-styles'
import { PAGE_GROUPS, PAGES } from './routes'

const Main = styled.div`
  display: flex;
  height: 100%;
  overflow: auto;
  > :first-child {
    margin-right: 20px;
  }
`

class App extends React.Component {
  state = {
    pages: PAGES,
    activePage: null,
  }
  componentDidMount() {
    this.history = createHistory()
    this.unlistenHistory = this.history.listen(this.handleLocationUpdate)
    this.handleLocationUpdate(this.history.location, true)
    initGlobalStyles()
  }
  componentWillUnmount() {
    this.unlistenHistory()
  }
  handleOpenPage = page => {
    this.history.push(page, {})
  }
  handleLocationUpdate = location => {
    const { pages } = this.state
    const page = pages.find(page => page.path === location.pathname)
    if (page) {
      this.setState({ activePage: page })
    }
  }
  render() {
    const { pages, activePage } = this.state
    const Page = activePage && activePage.comp
    return (
      <AragonApp publicUrl="/aragon-ui/">
        <Main>
          <Sidebar
            title={pages[0].name}
            root={pages[0].path}
            groups={PAGE_GROUPS}
            activePage={activePage}
            onOpen={this.handleOpenPage}
          />
          {Page && <Page title={activePage.name} />}
        </Main>
      </AragonApp>
    )
  }
}

export default App
