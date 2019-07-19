# react-native-expandable-text

simple React Native expandable Text container. 
When expandable, the collapse state is controlled by parent component. 

**Expo demo**: [https://snack.expo.io/@sophister/expandable-text-demo](https://snack.expo.io/@sophister/expandable-text-demo)

## Install

```shell
npm i react-native-expandable-text
```

## Usage

```typescript
interface Props {
  // container <View> style
  style?: ViewStyle;
  // is currently collapsed
  collapsed: boolean;
  // number of lines to show when collapsed
  collapseNumberOfLines: number;
  // Only accepts a single <Text> element
  children: ReactElement<Text>;
  // notice parent when expandable changes
  onExpandableChange: (expandable: boolean) => void;
}
```

