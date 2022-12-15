import React from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart
} from "recharts";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import data from "./data";

export default function RenderLineChart() {
    const [companyData, setCompanyData] = React.useState(data[0].data);

    const handleChange = (event) => {

        setCompanyData(event.target.value);

    };
    let formatter = (label) => {return label + "%"}
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
        <ComposedChart
            width={500}
            height={400}
            data={companyData}
            margin={{   
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
            }}
        >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="month" strokeDasharray="3 3" />
        <YAxis yAxisId="left" orientation="left" strokeDasharray="3 3" tickFormatter={formatter} tickLine={false} />
        <YAxis yAxisId="right" orientation="right" strokeDasharray="3 3" tickFormatter={formatter} tickLine={false} />
        <Legend formatter={(value) => value.toUpperCase()}/>
        <Bar yAxisId="right" dataKey="ppf" fill="#8884d8" label={{position: 'top', formatter: formatter}}/>
        <Line yAxisId="left" type="monotone" dataKey="diy" stroke="#82ca9d" />
        <Line yAxisId="left" type="monotone" dataKey="nps" stroke="#ff7300" />
        </ComposedChart>
        </div>
    );
}
