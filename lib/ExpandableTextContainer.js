/**
 * simple expandable Text container
 */
import React, { Component, cloneElement } from 'react';
import { View } from 'react-native';
const styles = {
    shadowFullText: {
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
    },
};
export default class ExpandableTextContainer extends Component {
    constructor() {
        super(...arguments);
        // real collapse height, calculated when `onLayout` called
        this.collapsedHeight = -1;
        // real full height for uncollapsed, calculated when `onLayout` called
        this.fullHeight = -1;
        // is currently expandable
        this.expandable = false;
        this.collapseLayout = (e) => {
            if (!this.props.collapsed) {
                return;
            }
            this.collapsedHeight = e.nativeEvent.layout.height;
            this.layoutChange();
        };
        this.fullLayout = (e) => {
            this.fullHeight = e.nativeEvent.layout.height;
            this.layoutChange();
        };
    }
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
        const fullChildStyle = Array.isArray(visibleChild.props.style) ? [].concat(visibleChild.props.style) : [visibleChild.props.style];
        fullChildStyle.push(styles.shadowFullText);
        const fullChildren = cloneElement(children, {
            numberOfLines: 0,
            style: fullChildStyle,
            onLayout: this.fullLayout,
        });
        return (<View style={style}>
        {visibleChild}
        {fullChildren}
      </View>);
    }
}
