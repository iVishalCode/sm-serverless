import { useEffect, useState } from "react";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students"); // Uses Vite proxy

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.students || !Array.isArray(data.students)) {
        throw new Error("Invalid data format received");
      }

      setStudents(data.students);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Students List</h2>
      {students.length > 0 ? (
        students.map((student) => (
          <div
            key={student.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>Name:</strong> {student.name || "N/A"}
            </p>
            <p>
              <strong>Grade:</strong> {student.grade || "N/A"}
            </p>
          </div>
        ))
      ) : (
        <p>No students found</p>
      )}
    </div>
  );
};

export default Students;
