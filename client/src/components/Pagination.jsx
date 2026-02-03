export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) {
  if (totalPages === 0) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
      {/* Rows per page */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="bg-[#1b1b1b] text-white rounded-lg px-2 py-1 border border-[#3a3a3a] focus:outline-none focus:border-teal-400 transition"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Page buttons */}
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-lg transition text-white ${
                currentPage === page
                  ? "bg-teal-500"
                  : "bg-[#2a2a2a] hover:bg-[#333333]"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] disabled:opacity-40 disabled:cursor-not-allowed text-white transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
