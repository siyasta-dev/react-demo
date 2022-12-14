import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import data from './data'

function getMonths(data){
  return [...new Set(data.map(cust => cust.data.map(dta => dta.month).concat(getMonths(cust.childs))).flat())];  
};

const MaterialTable = () => {
  //let monthHeaders = ;
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Company',
      },
      ...getMonths(data).map(month => {
        return {
          header: month,
          columns: [
            {
              header: 'NPS',
              id: month + 'nps',
              accessorFn: (row) => {
                let monthData = row.data.find(dt => dt.month === month)
                return monthData ? monthData.nps : '-';
              },
            },
            {
              header: 'PPF',
              id: month + 'ppf',
              accessorFn: (row) => {
                let monthData = row.data.find(dt => dt.month === month)
                return monthData ? monthData.ppf : '-';
              }
            },
            {
              header: 'DIY',
              id: month + 'diy',
              accessorFn: (row) => {
                let monthData = row.data.find(dt => dt.month === month)
                return monthData ? monthData.diy : '-';
              }
            }
          ]
        }
      })
    ],
    [],
  );

  return <MaterialReactTable columns={columns} data={data} enableExpanding getSubRows={(originalRow) => originalRow.childs}/>;
};

export default MaterialTable;
