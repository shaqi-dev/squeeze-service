/* eslint-disable react/jsx-key */
import { FC, useMemo } from 'react'
import { Column, useTable } from 'react-table'
import { convertVolume } from '../../utils/convertVolume'

interface SymbolsTableProps {
  symbols: { symbol: string; volume: string }[]
}

const SymbolsTable: FC<SymbolsTableProps> = ({ symbols }) => {
  const columns = useMemo<Column<typeof symbols[0]>[]>(
    () => [
      {
        Header: 'Symbol',
        accessor: 'symbol',
      },
      {
        Header: 'Volume',
        accessor: 'volume',
      },
    ],
    [],
  )
  const data = useMemo(() => {
    if (symbols.length) {
      return symbols.map((symbol) => ({
        symbol: symbol.symbol,
        volume: convertVolume(parseInt(symbol.volume, 10)),
      }))
    }

    return [{ symbol: 'No data :(', volume: 'No data :(' }]
  }, [symbols])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="max-h-96 w-fit overflow-auto">
        <table {...getTableProps()} className="h-96 border-neutral-900 shadow-sm">
          <thead className="sticky top-0 z-10 border-2 border-solid border-neutral-900 bg-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="border-2 border-solid border-neutral-900 py-1 px-3"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="border-2 border-solid border-neutral-900 py-1 px-3"
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
      </div>
    </div>
  )
}

export default SymbolsTable
