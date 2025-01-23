import { Chart } from 'chart.js';

export const createHoverLinePlugin = (lineColor: string, lineWidth = 3) => ({
    id: 'hoverLine',
    afterDatasetsDraw(chart: Chart<'line'>) {
        const {
            ctx,
            tooltip,
            chartArea: { top, bottom },
        } = chart;

        if (tooltip && tooltip.getActiveElements().length > 0) {
            const xCoor = tooltip.dataPoints[0].element.x;

            ctx.save();
            ctx.beginPath();

            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = lineColor;
            ctx.moveTo(xCoor, bottom);
            ctx.lineTo(xCoor, top);
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    },
});
