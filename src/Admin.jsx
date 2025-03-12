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
    const [statusFilter, setStatusFilter] = useState(""); // Nieuw: status filter

    // Filteren op zoekopdracht en status
    const filteredStudents = students.filter(student =>
        (student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.studentNumber.includes(search)) &&
        (statusFilter === "" || student.status === statusFilter) // Alleen filteren als status is geselecteerd
    );

    const handleEdit = (id) => {
        alert(`Bewerken student ID: ${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Weet je zeker dat je deze student wilt verwijderen?")) {
            setStudents(students.filter(student => student.id !== id));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Keuzevak Studenten</h1>

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

            {/* Studenten tabel */}
            <table className="w-full border-collapse border border-gray-300 bg-white">
                <thead>
                <tr className="bg-red-600 text-white">
                    <th className="border p-2">Naam</th>
                    <th className="border p-2">Studentnummer</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Acties</th>
                </tr>
                </thead>
                <tbody>
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                        <tr key={student.id} className="text-center bg-gray-50 hover:bg-gray-200 transition">
                            <td className="border p-2">{student.name}</td>
                            <td className="border p-2">{student.studentNumber}</td>
                            <td className="border p-2">
                               <span className={`px-3 py-1 rounded text-white text-sm font-bold
                                    ${student.status === "Actief" ? "bg-green-500" : ""}
                                    ${student.status === "Inactief" ? "bg-yellow-500" : ""}
                                    ${student.status === "Afwezig" ? "bg-red-500" : ""}`}>
                                    {student.status}
                                </span>
                            </td>
                            <td className="border p-2">
                                <button

                                    onClick={() => handleEdit(student.id)}
                                    className="bg-[#3779a3] text-white px-3 py-1 rounded hover:bg-[#71a3c1]"
                                >
                                    Bewerken
                                </button>
                                <button
                                    onClick={() => handleDelete(student.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 ml-2"
                                >
                                    Verwijderen
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center p-4 text-gray-500">
                            Geen studenten gevonden...
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
    export default Admin;
