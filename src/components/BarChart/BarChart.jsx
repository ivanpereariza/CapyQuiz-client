import { ResponsiveBar, } from '@nivo/bar'
import { ThemeProvider } from '@nivo/core'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'

const BarChart = ({ points, average }) => {

    const { themeValue } = useContext(ThemeContext)
    const color = themeValue === 'dark' ? '#d9ffda' : '#818181'
    const averageRounded = Math.round(average)

    const data = [
        {
            id: 'Average',
            value: averageRounded,
        },
        {
            id: 'Your punctuation',
            value: points.points,
        },
    ];

    const customTheme = {
        ...ThemeProvider,
        tooltip: {
            basic: {
                color: 'black',
            },
        },
    };

    const settings = {
        margin: { top: 50, right: 50, bottom: 50 },
        xScale: { type: 'band', padding: 0.5 },
        yScale: { type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false },
        axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        },
        axisLeft: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
        },
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
        animate: true,
    };

    return (
        <div style={{ width: 'auto', height: '35rem' }}>
            <ResponsiveBar
                colors={color}
                data={data}
                keys={['value']}
                indexBy="id"
                {...settings}
                enableGridY={false}
                theme={customTheme}
            />
        </div>
    );
};

export default BarChart;