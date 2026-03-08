import Card from "../ui/Card";
import GaugeChart from "./GaugeChart";

export default function BRIGauge({ value }) {

  return (
    <Card>

      <h3 className="text-gray-400 text-sm mb-4">
        Burnout Risk Index
      </h3>

      <div className="flex justify-center relative">

        {value === null || value === undefined ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : (
          <GaugeChart value={value} color="#ef4444" />
        )}

      </div>

    </Card>
  );

}