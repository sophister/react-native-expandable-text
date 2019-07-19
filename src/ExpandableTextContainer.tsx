/**
 * simple expandable Text container 
 */

import React, { Component, cloneElement, ReactElement } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';

export interface Props {
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

interface LayoutEvent {
    nativeEvent: { layout: { x: number; y: number; width: number; height: number } } 
}

const styles = {
  shadowFullText: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
  } as TextStyle,
};

export default class ExpandableTextContainer extends Component<Props> {

  // real collapse height, calculated when `onLayout` called
  private collapsedHeight = -1;
  // real full height for uncollapsed, calculated when `onLayout` called
  private fullHeight = -1;
  // is currently expandable
  private expandable = false;

  collapseLayout = (e: LayoutEvent) => {
    if (!this.props.collapsed) {
      return;
    }
    this.collapsedHeight = e.nativeEvent.layout.height;
    this.layoutChange();
  };

  fullLayout = (e: LayoutEvent) => {
    this.fullHeight = e.nativeEvent.layout.height;
    this.layoutChange();
  };

  layoutChange() {
    if (this.collapsedHeight === -1 || this.fullHeight === -1) {
      return;
    }
    const expandable = this.collapsedHeight < this.fullHeight;
    // Alert.alert('layoutChange', `height: ${this.collapsedHeight}, fullHeight: ${this.fullHeight}`);
    if (expandable !== this.expandable) {
        this.expandable = expandable;
        this.props.onExpandableChange(this.expandable);
    }
  }

  render() {
    const { style, collapsed, collapseNumberOfLines, children } = this.props;
    const visibleChild = cloneElement(children, {
      numberOfLines: collapsed ? collapseNumberOfLines : 0,
      onLayout: this.collapseLayout,
    });
    // copy style from origin Text child, and add extra styles to hide the full text node
    const fullChildStyle: TextStyle[] = Array.isArray(visibleChild.props.style) ? [].concat(visibleChild.props.style) : [visibleChild.props.style];
    fullChildStyle.push(styles.shadowFullText);
    const fullChildren = cloneElement(children, {
      numberOfLines: 0,
      style: fullChildStyle,
      onLayout: this.fullLayout,
    });
    return (
      <View style={style}>
        {visibleChild}
        {fullChildren}
      </View>
    );
  }
}
