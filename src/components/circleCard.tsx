import * as React from "react";

export interface State {
    textLabel: string,
    textValue: string
    size: number
    background?: string,
    borderWidth?: number
}

export const initialState: State = {
    textLabel: "",
    textValue: "",
    size: 200
}

export class CircleCard extends React.Component<{}, State>{
    size: number

    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if (typeof CircleCard.updateCallback === 'function') {
            CircleCard.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillMount() {
        CircleCard.updateCallback = (newState: State): void => { this.setState(newState); };
    }

    public componentWillUnmount() {
        CircleCard.updateCallback = null;
    }

    render() {
        const { textLabel, textValue, size, background, borderWidth } = this.state;

        const style: React.CSSProperties = { width: size, height: size, background, borderWidth };

        return (
            <div className="circleCard" style={style}>
                <p>
                    {textLabel}
                    <br />
                    <em>{textValue}</em>
                </p>
            </div>
        )
    }
}