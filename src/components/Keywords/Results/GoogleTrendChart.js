import { ResponsiveLine } from '@nivo/line';
import { useContext } from 'react';
import { SearchDataContext } from './ListItem';

export const GoogleTrendChart = ({ keyword, country, dateRange }) => {

    const { searchData } = useContext(SearchDataContext)

    const data = searchData && [
        {
            "id": `"${keyword}"`,
            "data": searchData && searchData.data
        }
    ]

    const chartTickValueOptions = {
        'last_year': 'every month',
        'last_month': 'every 7 days',
        'last_week': 'every day'
    }

    const chartTickValues = chartTickValueOptions[dateRange]


    return (
        data &&
        <ResponsiveLine
            data={data}
            colors={{ scheme: 'category10' }}
            borderColor="#000000"
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{
                type: "time",
                format: "%b %d, %Y",
            }}
            xFormat="time:%b %d %Y"
            yScale={{
                type: 'linear',
                min: '0',
                max: '100',
            }}
            yFormat=""
            axisBottom={{
                format: "%b %d, %y",
                tickValues: 'every day',
                tickRotation: -45,
                legendOffset: -12
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Interest over time',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            pointSize={10}
            pointColor='#1976D2'
            pointBorderWidth={2}
            pointBorderColor='#1976D2'
            pointLabelYOffset={-12}
            useMesh={true}
        />
    )
}
