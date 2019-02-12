// Styles
import PageHome from './pages/PageHome'
import PageColors from './pages/PageColors'
import PageTheme from './pages/PageTheme'
import PageText from './pages/PageText'
import PageIcons from './pages/PageIcons'

// Controls
import PageButton from './pages/PageButton'
import PageDropDown from './pages/PageDropDown'
import PageCheckBox from './pages/PageCheckBox'
import PageContextMenu from './pages/PageContextMenu'
import PageRadio from './pages/PageRadio'
import PageRadioGroup from './pages/PageRadioGroup'
import PageRadioList from './pages/PageRadioList'
import PageTextInput from './pages/PageTextInput'
import PageField from './pages/PageField'
import PageSafeLink from './pages/PageSafeLink'
import PageSlider from './pages/PageSlider'

// Other components
import PageBadge from './pages/PageBadge'
import PageCircleGraph from './pages/PageCircleGraph'
import PageCountdown from './pages/PageCountdown'
import PageInfo from './pages/PageInfo'
import PageProgressBar from './pages/PageProgressBar'
import PageTransactionProgress from './pages/PageTransactionProgress'
import PagePopover from './pages/PagePopover'

// Containers
import PageMain from './pages/PageMain'
import PageAragonApp from './pages/PageAragonApp'
import PageAppBar from './pages/PageAppBar'
import PageNavigationBar from './pages/PageNavigationBar'
import PageAppView from './pages/PageAppView'
import PageSidePanel from './pages/PageSidePanel'
import PageCard from './pages/PageCard'
import PageEmptyStateCard from './pages/PageEmptyStateCard'
import PageTable from './pages/PageTable'

// Providers
import PageRedraw from './pages/PageRedraw'
import PageRedrawFromDate from './pages/PageRedrawFromDate'
import PageObserve from './pages/PageObserve'
import PageToastHub from './pages/PageToastHub'

const preparePage = ([comp, name, path]) => ({
  comp,
  name,
  path: '/' + path.replace(/^\//, '') + (path === '/' ? '' : '/'),
})

export const PAGE_GROUPS = [
  {
    name: 'Styles',
    pages: [
      [PageColors, 'Colors', '/colors'],
      [PageTheme, 'Theme', '/theme'],
      [PageText, 'Text', '/text'],
      [PageIcons, 'Icons', '/icons'],
    ],
  },
  {
    name: 'Controls',
    pages: [
      [PageButton, 'Button', '/button'],
      [PageDropDown, 'DropDown', '/drop-down'],
      [PageContextMenu, 'ContextMenu', '/context-menu'],
      [PageCheckBox, 'CheckBox', '/checkbox'],
      [PageRadioGroup, 'RadioGroup', '/radio-group'],
      [PageRadioList, 'RadioList', '/radio-list'],
      [PageRadio, 'Radio', '/radio'],
      [PageTextInput, 'TextInput', '/text-input'],
      [PageField, 'Field', '/field'],
      [PageSafeLink, 'SafeLink', '/safe-link'],
      [PageSlider, 'Slider', '/slider'],
    ],
  },
  {
    name: 'Containers',
    pages: [
      [PageMain, 'Main', '/main'],
      [PageAragonApp, 'AragonApp', '/aragon-app'],
      [PageAppBar, 'AppBar', '/app-bar'],
      [PageNavigationBar, 'NavigationBar', '/navigation-bar'],
      [PageAppView, 'AppView', '/app-view'],
      [PageSidePanel, 'SidePanel', '/side-panel'],
      [PageCard, 'Card', '/card'],
      [PageEmptyStateCard, 'EmptyStateCard', '/empty-state-card'],
      [PageTable, 'Table', '/table'],
    ],
  },
  {
    name: 'Components',
    pages: [
      [PageBadge, 'Badge', '/badge'],
      [PageCircleGraph, 'CircleGraph', '/circle-graph'],
      [PageCountdown, 'Countdown', '/countdown'],
      [PageInfo, 'Info', '/info'],
      [PageProgressBar, 'ProgressBar', '/progress-bar'],
      [PageTransactionProgress, 'TransactionProgress', '/transaction-progress'],
      [PagePopover, 'Popover', '/Popover'],
    ],
  },
  {
    name: 'Providers',
    pages: [
      [PageRedraw, 'Redraw', '/redraw'],
      [PageRedrawFromDate, 'RedrawFromDate', '/redraw-from-date'],
      [PageObserve, 'Observe', '/observe'],
      [PageToastHub, 'ToastHub', '/toast-hub'],
    ],
  },
].map(group => ({ ...group, pages: group.pages.map(preparePage) }))

export const PAGES = [
  preparePage([PageHome, 'Aragon UI', '/']),
  ...PAGE_GROUPS.reduce((pages, group) => pages.concat(group.pages), []),
]
