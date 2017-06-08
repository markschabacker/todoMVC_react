import * as React from 'react';

interface ILoadingOverlayProps {
    visible: boolean;
}

/* tslint:disable:object-literal-sort-keys */
const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: '0',
    left: '0',
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
};
/* tslint:enable */

export class LoadingOverlay extends React.Component<ILoadingOverlayProps, {}> {

    public render(): JSX.Element | null {
        return (
            <div style={this.getStyle()}>
                {this.props.children}
            </div>
        );
    }

    private getStyle(): React.CSSProperties {
        return this.props.visible
            ? overlayStyle
            : {};
    }
}
