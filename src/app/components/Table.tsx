import clsx from "clsx";
import React from "react";

interface TableRow {
  id: number | string;
  title: string;
  value: string | number;
}

interface TableData {
  data: TableRow[];
  className?: string;
}

const Table = ({ data, className }: TableData) => {
  return (
    <div className="table-container">
      <table className={clsx("min-w-full table-auto", className)}>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <th className="px-4 py-2 border">{item.title}</th>
              </tr>
              <tr>
                <td className="px-4 py-2 border">{item.value}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;