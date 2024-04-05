'use client';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

type Props = {
  state: [];
  title: string;
};

type CustomToolTipProps = {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
};

type GroupedByDate = Record<string, object[]>;

export const Graphics = ({ state, title }: Props): JSX.Element => {
  const groupedByDate = state?.reduce(
    (acc: GroupedByDate, obj: { startDate: string }) => {
      const startDate = new Date(obj.startDate);
      const month = startDate.getMonth();
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(obj);
      return acc;
    },
    {},
  );

  const data = [
    {
      date: 'Jan',
      amount: groupedByDate?.[1]?.length || 0,
    },
    {
      date: 'Feb',
      amount: groupedByDate?.[2]?.length || 0,
    },
    {
      date: 'Mar',
      amount: groupedByDate?.[3]?.length || 0,
    },
    {
      date: 'Apr',
      amount: groupedByDate?.[4]?.length || 0,
    },
    {
      date: 'May',
      amount: groupedByDate?.[5]?.length || 0,
    },
    {
      date: 'Jun',
      amount: groupedByDate?.[6]?.length || 0,
    },
    {
      date: 'Jul',
      amount: groupedByDate?.[7]?.length || 0,
    },
    {
      date: 'Aug',
      amount: groupedByDate?.[8]?.length || 0,
    },
    {
      date: 'Sep',
      amount: groupedByDate?.[9]?.length || 0,
    },
    {
      date: 'Oct',
      amount: groupedByDate?.[10]?.length || 0,
    },
    {
      date: 'Nov',
      amount: groupedByDate?.[11]?.length || 0,
    },
    {
      date: 'Dec',
      amount: groupedByDate?.[12]?.length || 0,
    },
  ];

  const CustomToolTip = ({
    active,
    payload,
    label,
  }: CustomToolTipProps): JSX.Element | null => {
    if (active && payload?.length) {
      return (
        <div className="p-4 bg-zinc-900 flex flex-col gap-4 rounded-md">
          <p className="text-medium text-lg">{label}</p>
          <p className="text-sm text-blue-400">
            Amount:
            <span className="ml-2">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1 className="text-xl absolute -z-1 -translate-y-7">{title}</h1>
      <ResponsiveContainer width="93%" height="100%">
        <BarChart
          className="bg-zinc-800 rounded-xl"
          width={1000}
          height={400}
          margin={{
            right: 35,
            left: 0,
            top: 20,
          }}
          data={data}
        >
          <YAxis tickSize={15} />
          <XAxis dataKey="date" />
          <CartesianGrid strokeDasharray="2 2" />
          <Tooltip content={<CustomToolTip />} />
          <Bar dataKey="amount" fill="#2563eb" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
