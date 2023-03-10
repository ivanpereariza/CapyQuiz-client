import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ points, average }) => {
    const data = [
        {
            id: 'Average',
            value: average,
        },
        {
            id: 'Your punctuation',
            value: points.points,
        },
    ];

    const settings = {
        colors: ['#FFC300'],
        margin: { top: 50, right: 50, bottom: 50 },
        xScale: { type: 'band', padding: 0.5 },
        yScale: { type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false },
        axisBottom: { tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: 32 },
        labelTextColor: { from: 'color', modifiers: [['darker', 1.6]] },
        legends: [
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 0,
                itemHeight: 0,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ],
    };

    return (
        <div style={{ width: 'auto', height: '35rem' }}>
            <ResponsiveBar data={data} keys={['value']} indexBy="id" {...settings} enableGridY={false} />
        </div>
    );
};

export default BarChart;