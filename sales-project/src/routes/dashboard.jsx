import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {useState ,useEffect} from 'react'

export default  function Dashboard() {
const [dataset , setDataset] = useState({ data1: [], data5: [], data6: [] })
const [selectedCategory, setSelectedCategory] = useState("All sales");
const [Electronics, setElectronics] = useState();
const [Furniture, setFurniture] = useState();
const [Clothing, setClothing] = useState();
useEffect(()=>{
 async function salesDashboard(){
   try {
        const res = await fetch("http://localhost:4001/dashboard")
        const data = await res.json()   
        console.log("Fetched Data:", data)
        setDataset(data)               
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
      }
}
salesDashboard()
async function electronicsSale(){
  try{
    const res = await fetch('http://localhost:4001/dashboard/electronics')
    const data = await res.json()
    console.log("Fetched Data:", data)
    setElectronics(data)
  }catch (err) {
        console.error("Error fetching dashboard data:", err)
  }
}
electronicsSale()
async function furnitureSale(){
  try{
    const res = await fetch('http://localhost:4001/dashboard/furniture')
    const data = await res.json()
    console.log("Fetched Data:", data)
    setFurniture(data)
  }catch (err) {
        console.error("Error fetching dashboard data:", err)
  }
}
furnitureSale()
async function clothingSale(){
  try{
    const res = await fetch('http://localhost:4001/dashboard/clothing')
    const data = await res.json()
    console.log("Fetched Data:", data)
    setClothing(data)
  }catch (err) {
        console.error("Error fetching dashboard data:", err)
  }
}
clothingSale()
},[])

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const totalSales = dataset?.data1?.reduce((sum, item) => sum + (item.value || 0), 0) || 0;
const totalRevenue = dataset?.data5?.reduce((sum, item) => sum + (item.revenue || 0), 0) || 0;
let revenueGrowth = 0;

if (dataset?.data5?.length > 1) {
  const firstMonth = dataset.data5[0].revenue || 0;
  const lastMonth = dataset.data5[dataset.data5.length - 1].revenue || 0;
  if (firstMonth !== 0) {
    revenueGrowth = ((lastMonth - firstMonth) / firstMonth) * 100;
  }
}

return (
    <>
    <div className='dashboard-wrapper'>
       <div className="kpi-title">
          <h2>"Here’s a quick snapshot of your business performance — track total sales, revenue, and growth in real time."</h2>
       </div>
        <div className="dashboard">
          <div className="card">
            <h4>Total Sales</h4>
            <h2>{totalSales.toLocaleString()} Units</h2>
          </div>

          <div className="card">
            <h4>Total Revenue</h4>
            <h2>₹{totalRevenue.toFixed(1)} Cr</h2>
          </div>

          <div className="card">
            <h4>Revenue Growth</h4>
            <h2 className={revenueGrowth >= 0 ? "positive" : "negative"}>
              {revenueGrowth >= 0 ? "+" : ""}
              {revenueGrowth.toFixed(1)}%
            </h2>
          </div>
      </div>
      <div className="kpi-section">
        <h3>✨ Total Sales</h3>
        <p>
          Your total sales show the big picture — the complete revenue earned in
          the selected period. It’s the quickest way to check business health,
          spot growth, and see if you’re on track to hit targets.
        </p>
      </div>
      <div className="kpi-section">
        <h3>📊 Sales by Category</h3>
        <p>
          Break down revenue by category to see what’s winning and what’s lagging.
          This view makes it easy to spot top performers, understand customer
          preferences, and uncover areas that need a boost.
        </p>
      </div>
     <div className="products-chart-wrapper">
      <div className="chart-wrapper">
          <h3 className='chart-title'>Sales by Category</h3>
          <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataset.data1}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {dataset.data1.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip/>
            <Legend />
          </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-wrapper">
          <h3 className="chart-title">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dataset.data5} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient  x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis unit=" Cr" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  unit="Cr"
                />
              </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
      <div className="dashboard-dropdown">
          <div className="dashboard-dropdown-title">
              <h3>Select Sales Category</h3>
              <p>Quickly filter your sales growth data by items and their units with this dashboard</p>
          </div>
          <select 
              className="dashboard-dropdown-options"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
          >
              <option >All sales</option>
              <option>Electronics sales</option>
              <option>Furniture sales</option>
              <option>Clothing sales</option>
          </select>
      </div>
     <div className="products-chart-wrapper">
          {selectedCategory === "All sales" && (
            <>
              {/* Electronics */}
              <div className='chart-wrapper'>
                <h3 className='chart-title'>Monthly Electronics Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={Electronics || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="units" stroke="#0088FE" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Furniture */}
              <div className='chart-wrapper'>
                <h3 className='chart-title'>Monthly Furniture Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Furniture || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="units" fill="#00C49F" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Clothing */}
              <div className='chart-wrapper'>
                <h3 className='chart-title'>Monthly Clothing Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Clothing || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="units" fill="#FFBB28" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
          {selectedCategory === "Electronics sales" && (
            <div className="chart-wrapper">
              <h3 className="chart-title">Electronics Sales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={Electronics || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="units" stroke="#0088FE" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
          {selectedCategory === "Furniture sales" && (
            <div className="chart-wrapper">
              <h3 className="chart-title">Furniture Sales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Furniture || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="units" fill="#00C49F" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          {selectedCategory === "Clothing sales" && (
            <div className="chart-wrapper">
              <h3 className="chart-title">Clothing Sales</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Clothing || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="units" fill="#FFBB28" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
      </div>
      <div className="region-chart-wrapper">
        <h3 className="region-chart-title">Revenue Generated By States</h3>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="category" dataKey="region" name="Region" />
            <YAxis type="number" dataKey="y" hide />
            <ZAxis type="number" dataKey="revenue" range={[60, 400]} name="revenue" unit=" Cr" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Legend />
            <Scatter name="Sales by Region" data={dataset.data6} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
   </>
  )
}     

