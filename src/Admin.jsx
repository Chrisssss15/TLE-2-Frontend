import { useState } from "react";

function Admin() {
    // Dummy data voor test
    const [students, setStudents] = useState([
        {id: 1, name: "Johan de Vries", studentNumber: "123456", status: "Actief"},
        {id: 2, name: "Sanne Jansen", studentNumber: "654321", status: "Inactief"},
        {id: 3, name: "Ali Ahmed", studentNumber: "789012", status: "Actief"},
        {id: 4, name: "Lisa van den Berg", studentNumber: "234567", status: "Actief"},
        {id: 5, name: "Mark de Groot", studentNumber: "876543", status: "Inactief"},
        {id: 6, name: "Fatima El Idrissi", studentNumber: "345678", status: "Actief"},
        {id: 7, name: "Tom Bakker", studentNumber: "987654", status: "Afwezig"},
        {id: 8, name: "Emma Visser", studentNumber: "456789", status: "Actief"},
        {id: 9, name: "Noah Smit", studentNumber: "567890", status: "Afwezig"},
        {id: 10, name: "Sophie Mulder", studentNumber: "678901", status: "Actief"},
    ]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]); // Track selected students
    const [editingStudent, setEditingStudent] = useState(null); // Track student being edited
    const [newName, setNewName] = useState(""); // State for new name input
    const [newStudentNumber, setNewStudentNumber] = useState(""); // State for new student number input

    // Filteren op zoekopdracht en status
    const filteredStudents = students.filter(student =>
        (student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.studentNumber.includes(search)) &&
        (statusFilter === "" || student.status === statusFilter)
    );

    const handleEdit = (student) => {
        setEditingStudent(student); // Set student to be edited
        setNewName(student.name); // Pre-fill the name input
        setNewStudentNumber(student.studentNumber); // Pre-fill the student number input
    };

    const handleUpdate = () => {
        const updatedStudents = students.map(student =>
            student.id === editingStudent.id
                ? { ...student, name: newName, studentNumber: newStudentNumber }
                : student
        );
        setStudents(updatedStudents); // Update the student list with the new data
        setEditingStudent(null); // Close the edit form
    };

    const handleDelete = (id) => {
        if (window.confirm("Weet je zeker dat je deze student wilt verwijderen?")) {
            setStudents(students.filter(student => student.id !== id));
        }
    };

    const handleSelectChange = (id) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(selectedStudents.filter(studentId => studentId !== id));
        } else {
            setSelectedStudents([...selectedStudents, id]);
        }
    };

    const handleBulkDelete = () => {
        if (window.confirm("Weet je zeker dat je de geselecteerde studenten wilt verwijderen?")) {
            setStudents(students.filter(student => !selectedStudents.includes(student.id)));
            setSelectedStudents([]); // Deselect all after deletion
        }
    };

    return (
        <div className="p-6 bg-[#f7efe3] min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-[#b41e4b]">Keuzevak Studenten</h1>

            {/* Zoekbalk en statusfilter */}
            <div className="flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Zoek student..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-400 rounded w-1/2 bg-white"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border border-gray-400 rounded w-1/3 bg-white"
                >
                    <option value="">Alle statussen</option>
                    <option value="Actief">Actief</option>
                    <option value="Inactief">Inactief</option>
                    <option value="Afwezig">Afwezig</option>
                </select>
            </div>

            {/* Bulk delete button */}
            <button
                onClick={handleBulkDelete}
                className="bg-[#d3104c] text-white px-4 py-2 rounded mb-4 hover:bg-red-500"
            >
                Verwijder geselecteerde
            </button>

            {/* Studenten tabel */}
            <table className="w-full border-collapse border border-gray-300 bg-white">
                <thead>
                <tr className="bg-[#b41e4b] text-white">
                    <th className="border p-2">Naam</th>
                    <th className="border p-2">Studentnummer</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Acties</th>
                    <th className="border p-2">Selecteer</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                        <tr key={student.id} className="text-center bg-gray-50 hover:bg-gray-200 transition">
                            <td className="border p-2 text-[#003340]">{student.name}</td>
                            <td className="border p-2 text-[#003340]">{student.studentNumber}</td>
                            <td className="border p-2 text-[#003340]">
                               <span className={`px-4 py-1 rounded text-white text-sm font-bold
                                    ${student.status === "Actief" ? "bg-[#3ab7b0]" : ""}
                                    ${student.status === "Inactief" ? "bg-[#fcc200]" : ""}
                                    ${student.status === "Afwezig" ? "bg-[#d3104c]" : ""}`}>
                                    {student.status}
                                </span>
                            </td>
                            <td className="border p-2">
                                <button
                                    onClick={() => handleEdit(student)}
                                    className="bg-[#00b0eb] text-white px-3 py-1 rounded hover:bg-[#71a3c1]"
                                >
                                    Bewerken
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="bg-[#d3104c] text-white px-3 py-1 rounded hover:bg-red-500 ml-2"
                                >
                                    Verwijderen
                                </button>
                            </td>
                            <td className="border p-2">
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.includes(student.id)}
                                    onChange={() => handleSelectChange(student.id)}
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="text-center p-4 text-gray-500">
                            Geen studenten gevonden...
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Bewerken Modal (form) */}
            {editingStudent && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-xl font-bold mb-4 text-[#d3104c]">Bewerk Student</h2>
                        <div className="mb-4">
                            <label className="block text-sm">Naam</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="p-2 border border-gray-400 rounded w-full"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm">Studentnummer</label>
                            <input
                                type="text"
                                value={newStudentNumber}
                                onChange={(e) => setNewStudentNumber(e.target.value)}
                                className="p-2 border border-gray-400 rounded w-full"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleUpdate}
                                className="bg-[#3ab7b0] text-white px-4 py-2 rounded hover:bg-[#00b0eb]"
                            >
                                Opslaan
                            </button>
                            <button
                                onClick={() => setEditingStudent(null)}
                                className="bg-[#d3104c] text-white px-4 py-2 rounded hover:bg-red-500"
                            >
                                Annuleren
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
