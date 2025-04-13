import React, { useEffect, useState } from "react";
import axios from "axios";


export default function AttendanceReport() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/attendance");
        setAttendanceData(res.data);
      } catch (err) {
        console.error("Failed to fetch attendance data", err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <div className="report-wrapper">
      <h2>Daily Attendance Report</h2>
      {attendanceData.length === 0 ? (
        <p className="empty">No attendance data found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Present</th>
                <th>Student Names</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.count}</td>
                  <td>{entry.students.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
