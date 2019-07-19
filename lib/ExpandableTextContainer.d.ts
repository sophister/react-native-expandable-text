/**
 * simple expandable Text container
 */
import { Component, ReactElement } from 'react';
import { Text, ViewStyle } from 'react-native';
export interface Props {
    style?: ViewStyle;
    collapsed: boolean;
    collapseNumberOfLines: number;
    children: ReactElement<Text>;
    onExpandableChange: (expandable: boolean) => void;
}
interface LayoutEvent {
    nativeEvent: {
        layout: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
}
export default class ExpandableTextContainer extends Component<Props> {
    private collapsedHeight;
    private fullHeight;
    private expandable;
    collapseLayout: (e: LayoutEvent) => void;
    fullLayout: (e: LayoutEvent) => void;
    layoutChange(): void;
    render(): JSX.Element;
}
export {};
