export default function StatCard({ title, value = 0, color = "text-white" }) {

  return (

    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-800 shadow-md">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </h2>

    </div>

  );

}