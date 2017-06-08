import * as React from 'react';

import '../../css/loading-overlay/loading-overlay.css';

interface ILoadingOverlayProps {
    visible: boolean;
}

export class LoadingOverlay extends React.Component<ILoadingOverlayProps, {}> {

    public render(): JSX.Element | null {
        return (
            <div className={this.getClassName()}>
            </div>
        );
    }

    private getClassName(): string {
        return `loading-overlay-${this.props.visible ? 'visible' : 'hidden'}`;
    }
}
