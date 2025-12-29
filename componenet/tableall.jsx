'use client';

import { useState, useMemo } from 'react';

export default function DataTable({
  title,
  columns,
  data,
  pageSize = 5,
  searchable = true,
  dateFilter = true,
}) {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const searchMatch = search
        ? Object.values(row)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;

      const dateMatch = date
        ? row.createdAt?.startsWith(date)
        : true;

      return searchMatch && dateMatch;
    });
  }, [search, date, data]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="w-full bg-[#062f44] text-white rounded-xl border border-white/10 p-4">
      {/* Header */}
      <h3 className="text-sm font-semibold mb-4">{title}</h3>

      {/* Filters */}
      {(searchable || dateFilter) && (
        <div className="flex flex-wrap gap-3 mb-4">
          {searchable && (
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className={inputClass}
            />
          )}

          {dateFilter && (
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setPage(1);
              }}
              className={inputClass}
            />
          )}

          <button
            onClick={() => {
              setSearch('');
              setDate('');
            }}
            className="px-4 py-2 text-xs rounded bg-pink-600 hover:bg-pink-500"
          >
            RESET
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#083b52] text-slate-300">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 font-medium"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-slate-400"
                >
                  No records found
                </td>
              </tr>
            )}

            {paginatedData.map((row, i) => (
              <tr
                key={i}
                className="border-t border-white/10 hover:bg-[#041f2e]"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render
                      ? col.render(row[col.key], row)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-xs">
          <span className="text-slate-400">
            Page {page} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 rounded bg-[#041f2e] disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 rounded bg-[#041f2e] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const inputClass =
  'bg-[#041f2e] border border-white/20 rounded px-3 py-2 text-xs text-white outline-none focus:border-indigo-500';
