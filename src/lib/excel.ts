import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = <T>(data: T[], fileName: string = "data.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
};

export const importFormExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
  return new Promise((res, rej) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (typeof data !== "string" && !(data instanceof ArrayBuffer)) return;

        const workbook = XLSX.read(data, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(worksheet);
        res(json);
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      rej(error);
    }
  });
};
