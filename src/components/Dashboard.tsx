import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ProvinceData } from '../utils/inequality';
import { pieColorsFor } from '../utils/palettes';
import { CHOROPLETH_COLORS } from '../utils/colors';
import { BLUE_SEVERITY, GREEN_SEVERITY } from '../utils/colors';

interface DashboardProps {
  /** Full dataset (all provinces) */
  allData: ProvinceData[];
  /** Currently selected provinces (empty = show all) */
  selectedProvinces: string[];
}

export default function Dashboard({ allData, selectedProvinces }: DashboardProps) {
  const hasSelection = selectedProvinces.length > 0;
  const chartHeight = hasSelection ? 96 : 112;
  const filteredData = hasSelection
    ? allData.filter((d) => selectedProvinces.includes(d.province))
    : allData;

  // Top 5 Poverty
  const top5Poverty = [...filteredData].sort((a, b) => b.poverty - a.poverty).slice(0, 5);
  const pieColorsPoverty = pieColorsFor(top5Poverty.map((d) => d.poverty));

  // Top 5 Income
  const top5Income = [...filteredData].sort((a, b) => b.income - a.income).slice(0, 5);
  const pieColorsIncome = [
    GREEN_SEVERITY.extreme,
    GREEN_SEVERITY.veryDark,
    GREEN_SEVERITY.dark,
    GREEN_SEVERITY.midDark,
    GREEN_SEVERITY.mid,
  ];

  // Top 5 Inequality
  const top5Inequality = [...filteredData].sort((a, b) => (b.inequality ?? 0) - (a.inequality ?? 0)).slice(0, 5);
  const pieColorsInequality = [
    BLUE_SEVERITY.extreme,
    BLUE_SEVERITY.veryDark,
    BLUE_SEVERITY.dark,
    BLUE_SEVERITY.midDark,
    BLUE_SEVERITY.mid,
  ];

  const renderPieChart = (
    title: string,
    data: ProvinceData[],
    dataKey: keyof ProvinceData,
    colors: string[],
    formatter: (val: number) => [string, string]
  ) => (
    <div className="min-w-[320px] xl:min-w-[360px] rounded-xl bg-white/86 backdrop-blur border border-white/65 shadow p-2">
      <h3 className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2 leading-snug">
        {hasSelection
          ? `${title} - ${selectedProvinces.length} Terpilih (Top 5)`
          : `${title} - 5 Provinsi Teratas`}
      </h3>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <PieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="province"
            cx="35%"
            cy="50%"
            innerRadius={chartHeight === 96 ? 18 : 24}
            outerRadius={chartHeight === 96 ? 28 : 36}
            labelLine={false}
          >
            {data.map((_, i) => (
              <Cell key={`cell-${i}`} fill={colors[i] ?? '#ccc'} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              fontSize: 10,
              right: 10,
              top: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              lineHeight: '1.2',
            }}
          />
          <Tooltip formatter={(value: number) => formatter(value)} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="flex gap-2 min-w-max">
      {renderPieChart(
        'Distribusi Kemiskinan',
        top5Poverty,
        'poverty',
        pieColorsPoverty.map((c, i) => c ?? CHOROPLETH_COLORS[i % CHOROPLETH_COLORS.length]),
        (val) => [`${val}%`, 'Kemiskinan']
      )}
      {renderPieChart(
        'Distribusi Pendapatan',
        top5Income,
        'income',
        pieColorsIncome,
        (val) => [`Rp ${val.toLocaleString('id-ID')} rb`, 'Pendapatan']
      )}
      {renderPieChart(
        'Distribusi Ketimpangan',
        top5Inequality,
        'inequality',
        pieColorsInequality,
        (val) => [val.toFixed(3), 'Indeks Ketimpangan']
      )}
    </div>
  );
}
