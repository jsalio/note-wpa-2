/* @ts-ignore */
declare module 'react-detect-offline' {
    export interface PollingConfig {
        url: string;
        enabled: boolean;
        interval: number;
        timeout: number;
    }
    export interface BaseProps {
        onChange?: (online: boolean) => void | undefined;
        wrapperType?: string;
        polling?: boolean | PollingConfig;
    }
    export interface BaseState {
        online: boolean;
    }
    export const defaultProps: BaseProps;
    export const defaultPollingConfig: PollingConfig;
    export const Base: React.ComponentClass<BaseProps, BaseState>;
    export interface DetectorProps extends BaseProps {
        render: ({ online: boolean }) => JSX.Element | null;
    }
    export type DetectorState = BaseState;
    export const Detector: React.ComponentClass<DetectorProps, DetectorState>;

    export type OnlineProps = BaseProps;
    export type OnlineState = BaseState;
    export const Online: React.ComponentClass<OnlineProps, OnlineState>;
    export type OfflineProps = BaseProps;
    export type OfflineState = BaseState;
    export const Offline: React.ComponentClass<OfflineProps, OfflineState>;
}