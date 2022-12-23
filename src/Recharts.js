import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  Label
} from "recharts";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import data from "./data";

export default function RenderLineChart() {
    const [companyData, setCompanyData] = React.useState(data[0].data);

    const handleChange = (event) => {

        setCompanyData(event.target.value);

    };
    return (
        <div>
            <Select
                value={companyData}
                label="Company"
                onChange={handleChange}
            >
                <MenuItem value={data[0].data}>{data[0].name}</MenuItem>
                <MenuItem value={data[1].data}>{data[1].name}</MenuItem>
            </Select>
        <ResponsiveContainer height={400} width="100%">
            <ComposedChart
                data={companyData}
                margin={{   
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
                }}
                barSize={20}
                barGap={0}
            >
                <XAxis dataKey="month" strokeDasharray="3 3" tickLine={false} angle={-90} tickMargin={30} tickFormatter={(tick) => (tick.split(" ")[0])} />
                <YAxis yAxisId="left" orientation="left" strokeDasharray="3 3" unit="%" tickLine={false} tickMargin={10} >
                    <Label value="Customers" style={{ fontWeight: 'bold' }} angle={-90} position="insideLeft" offset={-5} />
                </YAxis>
                <YAxis yAxisId="right" orientation="right" strokeDasharray="3 3" unit="%" tickLine={false} tickMargin={10} />
                <Legend formatter={(value) => value.toUpperCase()} verticalAlign="top" />
                <Tooltip formatter={(val, name) => [val, name.toUpperCase()]} />
                <Line yAxisId="left" type="monotone" dataKey="diy" unit="%" stroke="#82ca9d" strokeWidth={5} />
                <Line yAxisId="left" type="monotone" dataKey="nps" unit="%" stroke="#ff7300" strokeWidth={5} />
                <Bar yAxisId="right" dataKey="ppf" fill="#8884d8" unit="%" tooltipType="none" label={{position: "top", formatter: (lbl) => (lbl + "%")}} />
                <Bar yAxisId="right" dataKey="fd" fill="#ff7300" unit="%" tooltipType="none" label={{position: "top", formatter: (lbl) => (lbl + "%")}} />
            </ComposedChart>
        </ResponsiveContainer>
        </div>
    );
}
