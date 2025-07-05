import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import subjectOptions from "./../../../helper/classSubject";
import styles from "./StudentResult.module.scss";
import Spinner from "../../../layouts/Loader/Spinner";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import logo from "../../../assets/Logo.svg"; // Adjust the path as necessary


const StudentResult = () => {
  const user = useSelector((state) => state?.user?.user);
  const [selectedSemester, setSelectedSemester] = useState("firstSem");
  const resultRef = useRef(null);

  if (!user)
    return (
      <div>
        <Spinner />
      </div>
    );

  const subjects = subjectOptions[user.grade] || [];
  const semesterMarks = user[selectedSemester] || {};

  const isAbsent = Object.values(semesterMarks).some(
    (mark) => Number(mark) === -1
  );

  const totalMarks = isAbsent
    ? "Absent"
    : Object.values(semesterMarks)
        .filter((mark) => !isNaN(mark))
        .reduce((sum, mark) => sum + Number(mark), 0);

  const maxMarks = subjects.length * 100;
  const percentage =
    totalMarks !== "Absent"
      ? ((totalMarks / maxMarks) * 100).toFixed(2)
      : "N/A";

  const getGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  const grade = totalMarks !== "Absent" ? getGrade(percentage) : "N/A";

  const downloadPDF = () => {
    if (!resultRef.current) return;

    const opt = {
      margin: 0.3,
      filename: `${user.name}_${selectedSemester}_Marksheet.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(resultRef.current).save();
  };

  const downloadExcel = () => {
    const data = subjects.map((subject, index) => {
      const mark = semesterMarks[subject];
      const isSubjectAbsent = Number(mark) === -1;
      return {
        "S.No": index + 1,
        Subject: subject,
        "Marks Obtained": isSubjectAbsent ? "Absent" : mark ?? "N/A",
        "Max Marks": 100,
        Status: isSubjectAbsent
          ? "Absent"
          : Number(mark) >= 40
          ? "Pass"
          : "Fail",
      };
    });

    data.push({
      "S.No": "",
      Subject: "Total",
      "Marks Obtained": totalMarks,
      "Max Marks": subjects.length * 100,
      Status: grade,
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Result");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(dataBlob, `${user.name}_${selectedSemester}_Result.xlsx`);
  };

  const printMarksheet = () => {
    window.print();
  };

  const getSemesterLabel = (semester) => {
    switch (semester) {
      case "firstSem":
        return "First Semester";
      case "secondSem":
        return "Second Semester";
      case "endSem":
        return "End Semester";
      default:
        return "Unknown Semester";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.studentCard}>
        <div className={styles.studentInfo}>
          <h2 className={styles.studentName}>Welcome, {user.name}</h2>
          <div className={styles.studentDetails}>
            <span className={styles.rank}>
              Class Rank: <strong>{user.result}</strong>
            </span>
            <span className={styles.grade}>
              Class: <strong>{user.grade}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.semesterSelect}>
          <label htmlFor="semester" className={styles.label}>
            Select Semester:
          </label>
          <select
            id="semester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className={styles.dropdown}
          >
            <option value="firstSem">First Semester</option>
            <option value="secondSem">Second Semester</option>
            <option value="endSem">End Semester</option>
          </select>
        </div>

        <div className={styles.downloadButtons}>
          <button className={styles.downloadBtn} onClick={downloadPDF}>
            <span className={styles.btnIcon}>📄</span> Download PDF
          </button>
          <button className={styles.downloadBtn} onClick={downloadExcel}>
            <span className={styles.btnIcon}>📊</span> Download Excel
          </button>
        </div>
      </div>

      <div ref={resultRef} className={styles.marksheetCard}>
        <div className={styles.header}>
          <img
            src={logo}
            alt="School Logo"
            className={styles.logo}
          />
          <div className={styles.schoolInfo}>
            <h1 className={styles.schoolName}>
              Sri Ramakrishna Siksha Niketan
            </h1>
            <p className={styles.schoolAddress}>Haridasnagar , Raghunathganj , Murshidabad</p>
          </div>
        </div>
        <div className={styles.marksheetHeader}>
          <h3>Marksheet - {getSemesterLabel(selectedSemester)}</h3>
          <div className={styles.studentName}>Name: {user.name}</div>
          <div className={styles.class}>Class: {user.grade}</div>
          <div className={styles.academicYear}>Academic Year: 2024-25</div>
        </div>

        <div className={styles.summaryCards}>
          <div className={styles.summaryCard}>
            <h4>Total Marks</h4>
            <p className={styles.summaryValue}>{totalMarks}</p>
          </div>
          <div className={styles.summaryCard}>
            <h4>Percentage</h4>
            <p className={styles.summaryValue}>{percentage}%</p>
          </div>
          <div className={styles.summaryCard}>
            <h4>Rank</h4>
            <p className={styles.summaryValue}>{user.result}</p>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Subject</th>
                <th>Marks Obtained</th>
                <th>Max Marks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                const mark = semesterMarks[subject];
                const isSubjectAbsent = Number(mark) === -1;
                const status = isSubjectAbsent
                  ? "Absent"
                  : Number(mark) >= 40
                  ? "Pass"
                  : "Fail";

                return (
                  <tr
                    key={subject}
                    className={isSubjectAbsent ? styles.absentRow : ""}
                  >
                    <td>{index + 1}</td>
                    <td className={styles.subjectName}>{subject}</td>
                    <td className={styles.marks}>
                      {isSubjectAbsent ? "Absent" : mark ?? "N/A"}
                    </td>
                    <td>100</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          styles[status.toLowerCase()]
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className={styles.totalRow}>
                <td colSpan="2">
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{totalMarks}</strong>
                </td>
                <td>
                  <strong>{subjects.length * 100}</strong>
                </td>
                <td>
                  <strong>{grade}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className={styles.footer}>
        <p>This is a computer-generated marksheet. No signature is required.</p>
        <p>For any queries, contact the school administration.</p>
      </div>
    </div>
  );
};

export default StudentResult;
