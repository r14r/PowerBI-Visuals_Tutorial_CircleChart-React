"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

import IVisual = powerbi.extensibility.visual.IVisual;
import IViewport = powerbi.IViewport;

import VisualObjectInstance = powerbi.VisualObjectInstance;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

//
import { VisualSettings } from "./settings";

// Import React dependencies and the added component
import * as React from "react";
import * as ReactDOM from "react-dom";

// 
import { CircleCard, initialState } from './components/circleCard'

import "./../style/visual.less";

export class Visual implements IVisual {
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;

    private viewport: IViewport;

    private settings: VisualSettings;

    constructor(options: VisualConstructorOptions) {
        this.reactRoot = React.createElement(CircleCard, {});
        this.target = options.element;

        ReactDOM.render(this.reactRoot, this.target);
    }

    public update(options: VisualUpdateOptions) {
        this.viewport = options.viewport;
        const { width, height } = this.viewport;
        const size = Math.min(width, height);

        if (options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];

            this.settings = VisualSettings.parse(dataView) as VisualSettings;
            const object = this.settings.circle;

            CircleCard.update({
                size,
                textLabel: dataView.metadata.columns[0].displayName,
                textValue: dataView.single.value.toString(),
                borderWidth: object && object.circleThickness ? object.circleThickness : undefined,
                background: object && object.circleColor ? object.circleColor : undefined,
            });
        } else {
            this.clear();
        }
    }

    public enumerateObjectInstances(
        options: EnumerateVisualObjectInstancesOptions
    ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {

        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }

    private clear() {
        CircleCard.update(initialState);
    }
}