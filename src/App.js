import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const App = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Extracting data till column I
      const extractedData = data.map(row => row.slice(0, 9)); // Slice till column I (0-indexed)

      setExcelData(extractedData);
    };

    reader.readAsBinaryString(file);
  };
  console.log('excelData',excelData)
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add headers for all columns you want to display */}
            <th>Column I</th>
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default App;
