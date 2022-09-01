/* eslint-disable react/jsx-key */
import { FC, useMemo } from 'react'
import { Column, useTable } from 'react-table'
import { convertVolume } from '../../utils/convertVolume'
import { SymbolStatsShort } from '../../types/SymbolStats'

interface SymbolsTableProps {
  symbols: SymbolStatsShort[]
  isLoading: boolean
}

interface ColumnItem extends SymbolStatsShort {
  index: number
}

const SymbolsTable: FC<SymbolsTableProps> = ({ symbols, isLoading }) => {
  const columns = useMemo<Column<ColumnItem>[]>(
    () => [
      {
        Header: '#',
        accessor: 'index',
      },
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
      return symbols.map((symbol, index) => ({
        index: index + 1,
        symbol: symbol.symbol,
        volume: convertVolume(parseInt(symbol.volume, 10)),
      }))
    }

    return [
      {
        index: 1,
        symbol: isLoading ? 'Loading...' : 'No data :(',
        volume: isLoading ? 'Loading...' : 'No data :(',
      },
    ]
  }, [symbols, isLoading])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="text-lg font-bold">Symbols Settings</p>
      <div className="max-h-96 w-fit overflow-auto">
        <table {...getTableProps()} className="h-96 border-neutral-900 shadow-sm">
          <thead className="sticky top-0 z-10 border border-neutral-900 bg-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="border border-neutral-900 py-1 px-3">
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
                      <td {...cell.getCellProps()} className="border border-neutral-900 py-1 px-3">
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
