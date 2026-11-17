import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

export const DataTable = ({
  columns = [],
  data = [],
  keyField = 'id',
  pageSize = 10,
  showPagination = true,
  isLoading = false,
  emptyMessage = 'No matching records found',
  toolbar
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Handle column sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  // Paginated data
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, showPagination]);

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, sortedData.length);

  return (
    <div className="table-container">
      {toolbar && <div className="table-toolbar">{toolbar}</div>}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => {
                const isSorted = sortConfig.key === col.key;
                return (
                  <th
                    key={col.key}
                    className={col.sortable ? 'sortable' : ''}
                    onClick={() => col.sortable && handleSort(col.key)}
                    style={col.style}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      {col.title}
                      {col.sortable && (
                        <span>
                          {isSorted ? (
                            sortConfig.direction === 'asc' ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )
                          ) : (
                            <ChevronsUpDown size={14} style={{ opacity: 0.4 }} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '3rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <div className="system-status-dot" style={{ width: '12px', height: '12px' }} />
                    Loading server records...
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="table-empty-state">
                    <Inbox size={42} style={{ opacity: 0.4 }} />
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{emptyMessage}</div>
                    <div style={{ fontSize: '0.8rem' }}>Try clearing filters or adjusting your search query.</div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={row[keyField] || index}>
                  {columns.map((col) => (
                    <td key={col.key} style={col.cellStyle}>
                      {col.render ? col.render(row[col.key], row, index) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && sortedData.length > 0 && (
        <div className="table-pagination">
          <div className="pagination-info">
            Showing <strong>{startRecord}</strong> to <strong>{endRecord}</strong> of <strong>{sortedData.length}</strong> records
          </div>

          <div className="pagination-controls">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              title="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((page, idx, arr) => (
                <React.Fragment key={page}>
                  {idx > 0 && page - arr[idx - 1] > 1 && (
                    <span style={{ padding: '0 0.25rem', color: 'var(--text-muted)' }}>...</span>
                  )}
                  <button
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              title="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
