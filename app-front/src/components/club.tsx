import { useParams } from "react-router-dom";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from "recharts";

const SAMPLE_DATA_WEEK = [
  {
    name: 'Понеділок',
    'Відвідування': 1500
  },
  {
    name: 'Вівторок',
    'Відвідування': 3000
  },
  {
    name: 'Середа',
    'Відвідування': 2500
  },
  {
    name: 'Четвер',
    'Відвідування': 3000
  },
  {
    name: "П'ятниця",
    'Відвідування': 2000
  },
  {
    name: 'Субота',
    'Відвідування': 6000
  },
  {
    name: 'Неділя',
    'Відвідування': 5000
  },
]

const SAMPLE_DATA_PIE = [
    {name : "12-17",  value:  134},
    {name : "18-24",  value:  635},
    {name : "25-31",  value:  567},
    {name : "32-37",  value:  411},
    {name : "38-45",  value:  356},
    {name : "46-55",  value:  178},
    {name : "56-70",  value:  43},
    {name : "70+",  value:  19},
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#806F42', '#40BBFF', '#70AB80', '#FF5080'];

function UserStatSplash({name, value} : {name: string, value: string}) {
  return <div className="rounded-lg ml-8 mt-5 w-1/3">
    <p className="text-3xl font-bold text-zinc-800">{name}</p>
    <p className="text-5xl font-extrabold text-blue-700">{value}</p>
  </div>
}

function ClubPage() {
    const qParams = useParams()

    return <div className="flex place-content-center">
      <div className="w-2/3">
        <h1 className="text-4xl font-bold text-zinc-900 text-center mt-8">Спортивна зала {"$CLUB_NAME$"}</h1>
        <div className="flex-col flex place-items-center border-b-2 border-blue-500">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mt-6">Статистика відвідувань за тиждень</h2>
          <BarChart className="mt-6 mb-2" data={SAMPLE_DATA_WEEK} width={750} height={400}>
            <Tooltip></Tooltip>
            <YAxis type="number" domain={[0, 'dataMax']}></YAxis>
            <XAxis dataKey={"name"}></XAxis>
            <Bar dataKey={"Відвідування"} fill="#0000f0"></Bar>
          </BarChart>
        </div>
        <div className="flex-col flex place-items-center border-b-2 border-blue-500">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mt-6">Статистика за віком</h2>
          <PieChart className="mt-6 mb-2" data={SAMPLE_DATA_WEEK} width={750} height={400}>
            <Legend></Legend>
            <Tooltip></Tooltip>
          <Pie
            data={SAMPLE_DATA_PIE}
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {SAMPLE_DATA_PIE.map((_ : any, index : number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        </div>
        <div className="flex-col flex place-items-center border-b-2 border-blue-500">
          <h2 className="text-3xl font-semibold text-blue-600 text-center mt-6">Статистика для користувача у середньому</h2>
          <div className="flex flex-wrap place-content-around mb-5">
           <UserStatSplash name='Середній час тренування' value="49.8хв"></UserStatSplash>
           <UserStatSplash name='Середня кількість тренувань на тиждень' value="2.3"></UserStatSplash>
           <UserStatSplash name='Переважни години для тренування' value="12AM"></UserStatSplash>
           <UserStatSplash name='Відсоток занять з тренером' value="31%"></UserStatSplash>
          </div>
        </div>
      </div>
    </div>


}

export default ClubPage