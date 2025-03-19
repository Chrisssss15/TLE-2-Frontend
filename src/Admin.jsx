import { useState } from "react";

function Admin() {
    const [students, setStudents] = useState([
        {id: 1, name: "Johan de Vries", studentNumber: "123456", status: "Actief"},
        {id: 2, name: "Sanne Jansen", studentNumber: "654321", status: "Inactief"},
        {id: 3, name: "Ali Ahmed", studentNumber: "789012", status: "Actief"},
        // ... de rest van je data
    ]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newName, setNewName] = useState("");
    const [newStudentNumber, setNewStudentNumber] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [addName, setAddName] = useState("");
    const [addStudentNumber, setAddStudentNumber] = useState("");
    const [addStatus, setAddStatus] = useState("Actief");

    const filteredStudents = students.filter(student =>
        (student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.studentNumber.includes(search)) &&
        (statusFilter === "" || student.status === statusFilter)
    );

    const handleEdit = (student) => {
        setEditingStudent(student);
        setNewName(student.name);
        setNewStudentNumber(student.studentNumber);
    };

    const handleUpdate = () => {
        const updatedStudents = students.map(student =>
            student.id === editingStudent.id
                ? { ...student, name: newName, studentNumber: newStudentNumber }
                : student
        );
        setStudents(updatedStudents);
        setEditingStudent(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Weet je zeker dat je deze student wilt verwijderen?")) {
            setStudents(students.filter(student => student.id !== id));
        }
    };

    const handleAddStudent = () => {
        if (addName.trim() && addStudentNumber.trim()) {
            const newStudent = {
                id: students.length + 1,
                name: addName,
                studentNumber: addStudentNumber,
                status: addStatus,
            };
            setStudents([...students, newStudent]);
            setAddName("");
            setAddStudentNumber("");
            setAddStatus("Actief");
            setShowAddForm(false);
        } else {
            alert("Vul alle velden in!");
        }
    };

    const handleSelectChange = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        if (window.confirm("Weet je zeker dat je de geselecteerde studenten wilt verwijderen?")) {
            setStudents(students.filter((student) => !selectedStudents.includes(student.id)));
            setSelectedStudents([]);
        }
    };

    return (
        <div className="p-6 bg-[#f7efe3] min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-[#b41e4b]">Keuzevak Studenten</h1>

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

            <div className="flex gap-4 mb-4">
                <button
                    onClick={handleBulkDelete}
                    disabled={selectedStudents.length === 0}
                    className={`px-4 py-2 rounded text-white ${selectedStudents.length > 0 ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}
                >
                    Verwijder geselecteerde
                </button>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 rounded bg-green-500 hover:bg-green-700 text-white"
                >
                    Voeg student toe
                </button>
            </div>

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
                {filteredStudents.map((student) => (
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
                ))}
                </tbody>
            </table>

            {/* Bewerken Modal */}
            {editingStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-xl font-bold mb-4 text-[#d3104c]">Bewerk Student</h2>
                        <input
                            type="text"
                            placeholder="Naam"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="p-2 border border-gray-400 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Studentnummer"
                            value={newStudentNumber}
                            onChange={(e) => setNewStudentNumber(e.target.value)}
                            className="p-2 border border-gray-400 rounded w-full mb-4"
                        />
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

            {/* Toevoegen Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-xl font-bold mb-4 text-[#3ab7b0]">Voeg nieuwe student toe</h2>
                        <input
                            type="text"
                            placeholder="Naam"
                            value={addName}
                            onChange={(e) => setAddName(e.target.value)}
                            className="p-2 border border-gray-400 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Studentnummer"
                            value={addStudentNumber}
                            onChange={(e) => setAddStudentNumber(e.target.value)}
                            className="p-2 border border-gray-400 rounded w-full mb-4"
                        />
                        <select
                            value={addStatus}
                            onChange={(e) => setAddStatus(e.target.value)}
                            className="p-2 border border-gray-400 rounded w-full mb-4"
                        >
                            <option value="Actief">Actief</option>
                            <option value="Inactief">Inactief</option>
                            <option value="Afwezig">Afwezig</option>
                        </select>
                        <div className="flex justify-between">
                            <button
                                onClick={handleAddStudent}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Opslaan
                            </button>
                            <button
                                onClick={() => setShowAddForm(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
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
