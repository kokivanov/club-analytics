import { useNavigate, useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { APIWrapper } from "../services/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

type wData = {
  name: string,
  Відвідування: number,
};

type aData = {
  name: string,
  value: number,
};


function secondsToHms(d : number) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
  var sDisplay = s > 0 ? s + "" : "";
  return hDisplay + mDisplay + sDisplay; 
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#806F42",
  "#40BBFF",
  "#70AB80",
  "#FF5080",
];

function UserStatSplash({ name, value }: { name: string; value: string }) {
  return (
    <div className="rounded-lg ml-8 mt-5 w-1/3">
      <p className="text-3xl font-bold text-zinc-800">{name}</p>
      <p className="text-5xl font-extrabold text-blue-700">{value}</p>
    </div>
  );
}

function ClubPage({ Wrapper }: { Wrapper: APIWrapper }) {
  const qParams = useParams();
  const club_id = qParams["id"];

  const [clubName, setClubName] = useState('$CLUB_NAME$')
  const [weekData, setWeekData] = useState<wData[]>([])
  const [ageData, setAgeData] = useState<aData[]>([])
  const [timeMean, setTimeMean] = useState('00:00')
  const [amountMean, setAmountMean] = useState(0.0)
  const [startMean, setStartMean] = useState('00:00')
  const [withTutor, setWithTutor] = useState('0%')

  const navigate = useNavigate();

  if (club_id)
    Wrapper.getClub(club_id).then((r) => console.log(r))

  useEffect(() => {
    const getData = async () => {if (club_id) {
      try {
        console.log(club_id)
        const clst = await Wrapper.getClub(club_id);

        const clubName = clst.name

        const weekData = new Array<wData>()
        weekData.push({name: 'Понеділок', Відвідування: clst.weekStats.Понеділок})
        weekData.push({name: 'Вівторок', Відвідування: clst.weekStats.Вівторок})
        weekData.push({name: 'Середа', Відвідування: clst.weekStats.Середа})
        weekData.push({name: 'Четвер', Відвідування: clst.weekStats.Четвер})
        weekData.push({name: "П'ятниця", Відвідування: clst.weekStats["П'ятниця"]})
        weekData.push({name: 'Субота', Відвідування: clst.weekStats.Субота})
        weekData.push({name: 'Неділя', Відвідування: clst.weekStats.Неділя})

        const ageData = new Array<aData>()
        ageData.push({name: '12-17', value: clst.byAge["12-17"]})
        ageData.push({name: '18-24', value: clst.byAge['18-24']})
        ageData.push({name: '25-31', value: clst.byAge['25-31']})
        ageData.push({name: '32-37', value: clst.byAge['32-37']})
        ageData.push({name: '38-45', value: clst.byAge['38-45']})
        ageData.push({name: '46-55', value: clst.byAge['46-55']})
        ageData.push({name: '56-70', value: clst.byAge['56-70']})
        ageData.push({name: '71+', value: clst.byAge['71+']})

        console.log({weekData, ageData})

        const timeMean = secondsToHms(clst.trainingTimeMean)

        return {clubName, weekData, ageData, timeMean, amountMean: Math.ceil(clst.trainingAmountMean*10)/10, startMean: clst.timeStartMean, withTutor: Math.ceil(clst.withTutor*100) + '%'}
      } catch (e) {
        console.log(e)
        if (e instanceof AxiosError)
          if (e.message.split(" ").at(-1) === "500") {
            navigate("/notFound");
          }
      }
    } else navigate("/notFound");}

    getData().then((r) => {
      if (r) {
        setAgeData(r.ageData)
        setWeekData(r.weekData)
        setClubName(r.clubName)
        setTimeMean(r.timeMean)
        setAmountMean(r.amountMean)
        setStartMean(r.startMean)
        setWithTutor(r.withTutor)
      }
    })
  }, []);

  return (
    <div className="flex place-content-center">
      <div className="w-2/3">
        <h1 className="text-4xl font-bold text-zinc-900 text-center mt-8">
          Спортивна зала {clubName}
        </h1>
        <div className="flex-col flex place-items-center border-b-2 border-blue-500">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mt-6">
            Статистика відвідувань за тиждень
          </h2>
          <BarChart
            className="mt-6 mb-2"
            data={weekData}
            width={750}
            height={400}
          >
            <Tooltip></Tooltip>
            <YAxis type="number" domain={[0, "dataMax"]}></YAxis>
            <XAxis dataKey={"name"}></XAxis>
            <Bar dataKey={"Відвідування"} fill="#0000f0"></Bar>
          </BarChart>
        </div>
        <div className="flex-col flex place-items-center border-b-2 border-blue-500">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mt-6">
            Статистика за віком
          </h2>
          <PieChart
            className="mt-6 mb-2"
            data={ageData}
            width={750}
            height={400}
          >
            <Legend></Legend>
            <Tooltip></Tooltip>
            <Pie
              data={ageData}
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {ageData.map((_: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div className="flex-col flex place-items-center border-b-2 border-blue-500">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mt-6">
            Статистика для користувача у середньому
          </h2>
          <div className="flex flex-wrap place-content-around mb-5">
            <UserStatSplash
              name="Середній час тренування"
              value={timeMean}
            ></UserStatSplash>
            <UserStatSplash
              name="Середня кількість тренувань на тиждень"
              value={amountMean.toString()}
            ></UserStatSplash>
            <UserStatSplash
              name="Переважни години для тренування"
              value={startMean}
            ></UserStatSplash>
            <UserStatSplash
              name="Відсоток занять з тренером"
              value={withTutor}
            ></UserStatSplash>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubPage;
