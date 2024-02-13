import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gtijnpwkxajymjyyghfr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aWpucHdreGFqeW1qeXlnaGZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1MTcyMzYsImV4cCI6MjAxMTA5MzIzNn0.KlvqKhUnL1YPPbZ0Hy1Uk07Qrs0TGW6jnlTUm4fxc4s"
);
supabase.auth.signInWithPassword({
  "email": "admin@regenx.com",
  "password": "regenx@admin"
})
function allElementsEmpty(arr) {
  return arr.every((item) => item === "");
}
function splitArrayByEmptyElement(arr) {
  const result = [];
  let tempArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length !== 0) {
      tempArr.push(arr[i]);
    } else {
      if (tempArr.length > 0) {
        result.push(tempArr);
        tempArr = [];
      }
    }
  }

  if (tempArr.length > 0) {
    result.push(tempArr);
  }

  return result;
}
const App = () => {
  const [excelData, setExcelData] = useState([]);

  const [excelData2, setExcelData2] = useState([]);

  const [excelData3, setExcelData3] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log("data", data);

      // Extracting data till column I
      const extractedData = data.map((row) => row.slice(0, 5)); // Slice till column I (0-indexed)
      const extractedData2 = data.map((row) => row.slice(6, 9)); // Slice till column I (0-indexed)
      const extractedData3 = data.map((row) => row.slice(10, 13)); // Slice till column I (0-indexed)

      extractedData.map((i) => console.log("tuan2", allElementsEmpty(i)));
      setExcelData(extractedData.filter((i) => !allElementsEmpty(i)));
      setExcelData2(extractedData2.filter((i) => !allElementsEmpty(i)));
      setExcelData3(extractedData3);
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    // for (let index = 0; index < excelData.length; index++) {
    //   const element = excelData[index];
    //   const body = {
    //     phone: "84234567894",
    //     yearOfBirth: "2000",
    //     partner: 1,
    //     password: "312fdsf",
    //     name: "tam",
    //     gender: "male",
    //     adultNumber: 2,
    //     childNumber: 3,
    //     address: "test",
    //     totalArea: 200,
    //     farmSystem: "Monocropping",
    //     cropId: "16b497d6-9a57-41f2-ad2b-f7b2e65fbb90",
    //     numOfPlants: 30,
    //     averageYield: 2000,
    //   };
    //   supabase.functions.invoke("profile/sign-up", { method: "POST", body });
    // }
    // const element = excelData[index];
    setTimeout(() => {
      const body = {
        phone: "84234567894",
        yearOfBirth: "2000",
        partner: 1,
        password: "312fdsf",
        name: "tam",
        gender: "male",
        adultNumber: 2,
        childNumber: 3,
        address: "test",
        totalArea: 200,
        farmSystem: "Monocropping",
        cropId: "16b497d6-9a57-41f2-ad2b-f7b2e65fbb90",
        numOfPlants: 30,
        averageYield: 2000,
      };
      supabase.functions.invoke("/profile/sign-up", { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body)
       });
    }, 1500);
  }, []);

  console.log("excelData", excelData);
  console.log("excelData2", excelData2);
  console.log("excelData3", splitArrayByEmptyElement(excelData3));
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        <h2>Table 1</h2>
        <table border="1">
          <tbody>
            {excelData.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Table 2</h2>
        <table border="1">
          <tbody>
            {excelData2.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Table 3</h2>
        <table border="1">
          <tbody>
            {excelData3.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default App;
