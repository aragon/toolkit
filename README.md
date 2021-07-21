<p align=center>
  <img src="https://user-images.githubusercontent.com/36158/53582039-04dd2d00-3b7f-11e9-8460-803ed3b84cc6.png" alt="aragonUI">
</p>

## Overview

aragonUI is a React library used to build user interfaces for Aragon and its related projects. It provides the components needed to build experiences that feel integrated with Aragon ecosystem, and can be used both client or server side.

The complete documentation can be found on the [aragonUI website](https://ui.aragon.org/).

## Getting Started

If you are unfamiliar with aragonUI, we recommend you to start with the [getting started page](https://ui.aragon.org/getting-started/). If you only want to know how to add aragonUI to your project, have a look at the quick setup:

### Quick setup

Install aragonUI alongside styled-components from npm:

```sh
npm install --save @aragon/ui styled-components
```

Copy its assets into your public directory:

```sh
npx copy-aragon-ui-assets ./public
```

Wrap your app with the `Main` component:

```jsx
import React from 'react'
import { Main } from '@aragon/ui'

function App() {
  return (
    <Main>
      <h1>Hello aragonUI!</h1>
    </Main>
  )
}
```

_Your project is now ready to use aragonUI. 💫_

Open https://ui.aragon.org/ to see the list of the available components and learn how to use them.

### Assets

aragonUI require some assets (e.g. fonts) in order to work properly. These need to be copied where they can be accessed by the library, like the `public/` directory of a project using [Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-assets-outside-of-the-module-system).

Copy these assets using the provided `copy-aragon-ui-assets` command:

```sh
npx copy-aragon-ui-assets ./public
```

By default, it will create a directory named `aragon-ui` in the specified directory.

This emplacement is communicated to the library through the `<Main>` component. The default path is `./aragon-ui/`, but you can change it using the `assetsUrl` prop:

```jsx
import { Main } from '@aragon/ui'

const App = () => (
  <Main assetsUrl="http://example.com/aragon-ui-assets/">
    <h1>Hello aragonUI!</h1>
  </Main>
)
```

You may also want to add it as a build step in your project, so that aragonUI can be upgraded without having to worry about this.

```json
"scripts": {
  "sync-assets": "copy-aragon-ui-assets ./public",
  "build": "npm run sync-assets && react-scripts build",
  "start": "npm run sync-assets && react-scripts start"
}
```

See `copy-aragon-ui-assets -h` for more information.

## Build and Develop

Please have a look at [CONTRIBUTING.md](CONTRIBUTING.md).

## Release and Publish to npm

Git checkout from master branch and make sure no local changes and run the following commands to make a release and publish to npm

```sh
# release a patch
npm run release:patch
# make a minor release
npm run release:minor
# make a major release (with breaking changes)
npm run release:major
```
## Projects using aragonUI

- [Aragon client](https://github.com/aragon/aragon) and [core apps](https://github.com/aragon/aragon-apps)
- [Autark’s Open Enterprise](https://www.autark.xyz/apps)
- [1Hive’s Dandelion apps](https://github.com/1Hive/dandelion-template)
- [Aragon Black’s Fundraising](https://fundraising.aragon.black/)
- [pando](https://github.com/pandonetwork/pando)
- [P2P Models Wiki](https://github.com/P2PModels/wiki)
- [Auction App for Cyber Foundation](https://github.com/cybercongress/aragon-auction-app)
- [1Hive’s Apiary](https://github.com/1Hive/apiary)
- [Uniswap Aragon App](https://github.com/empowerthedao/uniswap-aragon-app)
- [Compound Aragon App](https://github.com/empowerthedao/compound-aragon-app)
- [Aragon Parliament](https://github.com/PeterMPhillips/aragon-parliament)
- [Aragon Market](https://github.com/proofoftom/aragon-market)

## License

MIT, see [LICENSE](LICENSE).
