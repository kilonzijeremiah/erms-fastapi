import { Users, BookOpen, GraduationCap, FileText } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Students",
      value: "0",
      icon: <Users size={28} />,
    },
    {
      title: "Subjects",
      value: "0",
      icon: <BookOpen size={28} />,
    },
    {
      title: "Class Streams",
      value: "0",
      icon: <GraduationCap size={28} />,
    },
    {
      title: "Reports",
      value: "0",
      icon: <FileText size={28} />,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Ikonex Academy Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Student Management System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white p-6 rounded-xl shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500">
                  {item.title}
                </h3>

                <p className="text-3xl font-bold">
                  {item.value}
                </p>
              </div>

              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          System Overview
        </h2>

        <ul className="space-y-2">
          <li>✔ Student Registration</li>
          <li>✔ Class Stream Management</li>
          <li>✔ Subject Management</li>
          <li>✔ Score Entry</li>
          <li>✔ Results Processing</li>
          <li>✔ Report Cards</li>
        </ul>
      </div>
    </div>
  );
}
