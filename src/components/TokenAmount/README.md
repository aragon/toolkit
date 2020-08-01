# TokenAmount

The Token Amount component is used to display a token logo followed by an amount and the token symbol.

## Usage

```jsx
import { TokenAmount } from '@aragon/ui'

function App() {
  return (
    <Main>
      <TokenAmount
        address={'0x6B175474E89094C44Da98b954EedeAC495271d0F'}
        amount={'1049228954700000000000'}
        symbol={'DAI'}
      />
      <TokenAmount
        address={'0x6B175474E89094C44Da98b954EedeAC495271d0F'}
        amount={'100491340000000000000'}
        decimals={18}
        digits={3}
        size={'large'}
      />
      <TokenAmount
        address={'0x960b236A07cf122663c4303350609A66A7B288C0'}
        amount={'100490000000000000000'}
      />
    </Main>
  )
}
```

## Props

### `address`

| Type     | Default value |
| -------- | ------------- |
| `string` | None          |

The mainnet token address.

### `amount`

| Type                     | Default value |
| ------------------------ | ------------- |
| `bigInt, number, string` | None          |

The token amount.

### `chainId`

| Type     | Default value |
| -------- | ------------- |
| `number` | 1             |

Ethereum chain ID. We only support mainnet for now.

### `decimals`

| Type     | Default value |
| -------- | ------------- |
| `number` | 18            |

Decimal placement for amount.

### `digits`

| Type     | Default value |
| -------- | ------------- |
| `number` | 2             |

Rounds the number to a given decimal place.

### `iconUrl`

| Type     | Default value |
| -------- | ------------- |
| `string` | none          |

Overrides the iconUrl given by the token address.

### `size`

| Type     | Default value |
| -------- | ------------- |
| `string` | medium        |

Size of the amount text.

### `symbol`

| Type     | Default value |
| -------- | ------------- |
| `string` | none          |

Overrides the symbol given by the token address.