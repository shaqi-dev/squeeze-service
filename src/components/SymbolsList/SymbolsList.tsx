/* eslint-disable react/jsx-key */
import { FC, useMemo } from 'react'
import { Column, useTable } from 'react-table'
import { useLazyGetExchangeInfoQuery } from '../../api/exchangeInfoApi'
// import SymbolItem from './SymbolItem/SymbolItem'

const SymbolsList: FC = () => {
  const [getExchangeInfo, { data: exchangeInfo }] = useLazyGetExchangeInfoQuery()
  const symbolsData = exchangeInfo?.symbols
  const symbols = symbolsData?.map((symbol) => symbol.symbol)

  const columns = useMemo<Column<{ col1: string; col2: string | undefined }>[]>(
    () => [
      {
        Header: 'Symbol',
        accessor: 'col1',
      },
      {
        Header: 'Volume',
        accessor: 'col2',
      },
    ],
    [],
  )
  const data = useMemo(() => {
    if (symbols) {
      return symbols?.map((symbol) => ({
        col1: symbol,
        col2: '',
      }))
    }

    return [{ col1: 'No data :(', col2: '' }]
  }, [symbols])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  const handleUpdateExchangeInfo = (): ReturnType<typeof getExchangeInfo> => getExchangeInfo()

  const handleUpdateVolumes = (): void => console.log(test)

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
      <div className="flex gap-3">
        <button
          type="button"
          className="rounded-md bg-neutral-900 py-2 px-4 text-base font-semibold text-white transition-all duration-100 hover:bg-neutral-800"
          onClick={handleUpdateExchangeInfo}
        >
          Load Symbols
        </button>
        <button
          type="button"
          className="rounded-md bg-neutral-900 py-2 px-4 text-base font-semibold text-white transition-all duration-100 hover:bg-neutral-800"
          onClick={handleUpdateVolumes}
        >
          Load Volume
        </button>
      </div>
    </div>
  )
}

export default SymbolsList
