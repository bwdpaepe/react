import React
  from "react";
import { useTable } from 'react-table'
export default function Production(props) {
  const productionInputData = props.productionData;
  //console.log(productionInputData);

  const data = React.useMemo(() => {
    const allMonthsArray = ["January", "February", "March"];
    let outputArray = [];
    for (let currentMonth of allMonthsArray) {
      let singleMonthArray = productionInputData.filter(production => production.month === currentMonth);
      //https://stackoverflow.com/questions/54789406/convert-array-to-object-keys
      outputArray.push(singleMonthArray.reduce((acc, curr) => { return (acc[`${curr.year}`] = curr.production, acc) }, {}));
    }
    return outputArray;
  },
    [productionInputData]
  );
  console.log(data);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: '2018', // accessor is the "key" in the data
      },
      {
        Header: 'Column 2',
        accessor: '2019',
      },
      {
        Header: 'Column 3',
        accessor: '2020',
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );

}

