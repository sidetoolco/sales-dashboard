'use client'

import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts'
import {
  TrendingUp, TrendingDown, DollarSign, Users,
  Target, Calendar, ArrowRight
} from 'lucide-react'

// Sample data structure - replace with real API calls
const companyData = {
  sidetool: {
    kpis: {
      revenue: { current: 160000, target: 210000, change: -15, label: 'MRR' },
      sqls: { current: 42, target: 60, change: -20, label: 'SQLs' },
      pipeline: { current: 450000, target: 600000, change: 12, label: 'Pipeline Value' },
      deals: { current: 8, target: 15, change: -25, label: 'New Deals' },
      dealSize: { current: 20000, target: 25000, change: -8, label: 'Avg Deal Size' },
      cac: { current: 4500, target: 3000, change: 35, label: 'CAC' },
      ltv: { current: 48000, target: 50000, change: -4, label: 'LTV' },
      ltvcac: { current: 10.6, target: 15, change: -25, label: 'LTV:CAC' },
      payback: { current: 6.2, target: 4, change: 45, label: 'Payback' },
      salesCycle: { current: 42, target: 30, change: 28, label: 'Sales Cycle' },
    },
    funnel: [
      { stage: 'Leads Generated', value: 523, conversion: null },
      { stage: 'Demos Booked', value: 126, conversion: 24.1 },
      { stage: 'Opportunities Created', value: 48, conversion: 38.1 },
      { stage: 'Deals Closed', value: 8, conversion: 16.7 },
    ],
    channels: [
      { name: 'SEO/Organic', leads: 180, sqls: 28, closed: 3, cac: 2800, conversion: 1.7, spend: 8400, traffic: 12500 },
      { name: 'Google Ads', leads: 120, sqls: 8, closed: 0, cac: 0, conversion: 0, spend: 12000, traffic: 3200 },
      { name: 'Meta Ads', leads: 85, sqls: 12, closed: 2, cac: 6000, conversion: 2.4, spend: 12000, traffic: 8900 },
      { name: 'LinkedIn', leads: 68, sqls: 8, closed: 1, cac: 8000, conversion: 1.5, spend: 8000, traffic: 1200 },
      { name: 'Referrals', leads: 70, sqls: 14, closed: 2, cac: 1500, conversion: 2.9, spend: 3000, traffic: 0 },
      { name: 'Direct', leads: 45, sqls: 6, closed: 1, cac: 2000, conversion: 2.2, spend: 2000, traffic: 3500 },
    ],
    meetings: {
      scheduled: 42,
      showRate: 78,
      noShows: 9
    }
  },
  kleva: {
    kpis: {
      revenue: { current: 37000, target: 150000, change: 45, label: 'MRR' },
      sqls: { current: 18, target: 40, change: 25, label: 'SQLs' },
      pipeline: { current: 158000, target: 300000, change: 65, label: 'Pipeline Value' },
      deals: { current: 5, target: 9, change: 35, label: 'New Deals' },
      dealSize: { current: 31600, target: 35000, change: 8, label: 'Avg Deal Size' },
      cac: { current: 3200, target: 2500, change: -8, label: 'CAC' },
      ltv: { current: 35000, target: 40000, change: 12, label: 'LTV' },
      ltvcac: { current: 10.9, target: 15, change: 18, label: 'LTV:CAC' },
      payback: { current: 4.8, target: 3, change: -20, label: 'Payback' },
      salesCycle: { current: 35, target: 25, change: 15, label: 'Sales Cycle' },
    },
    funnel: [
      { stage: 'Leads Generated', value: 215, conversion: null },
      { stage: 'Demos Booked', value: 65, conversion: 30.2 },
      { stage: 'Opportunities Created', value: 28, conversion: 43.1 },
      { stage: 'Deals Closed', value: 5, conversion: 17.9 },
    ],
    channels: [
      { name: 'LinkedIn Ads', leads: 95, sqls: 14, closed: 3, cac: 2100, conversion: 3.2, spend: 6300, traffic: 2100 },
      { name: 'Google Ads', leads: 60, sqls: 0, closed: 0, cac: 0, conversion: 0, spend: 5200, traffic: 1800 },
      { name: 'Referrals', leads: 35, sqls: 8, closed: 2, cac: 1800, conversion: 5.7, spend: 3600, traffic: 0 },
      { name: 'Direct Outreach', leads: 25, sqls: 6, closed: 0, cac: 0, conversion: 0, spend: 2000, traffic: 0 },
      { name: 'SEO/Organic', leads: 45, sqls: 5, closed: 1, cac: 1200, conversion: 2.2, spend: 1200, traffic: 4800 },
    ],
    meetings: {
      scheduled: 28,
      showRate: 82,
      noShows: 5
    }
  }
}

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState<'sidetool' | 'kleva'>('sidetool')

  const data = companyData[selectedCompany]

  const KPICard = ({ metric, data }: { metric: string, data: any }) => {
    const isPositive = data.change >= 0
    const progressPercent = (data.current / data.target) * 100

    return (
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{data.label}</h3>
        </div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {metric === 'revenue' || metric === 'pipeline' || metric === 'cac' || metric === 'ltv' || metric === 'dealSize'
            ? `$${(data.current / 1000).toFixed(0)}K`
            : metric === 'ltvcac'
            ? `${data.current.toFixed(1)}:1`
            : metric === 'payback'
            ? `${data.current.toFixed(1)}mo`
            : metric === 'salesCycle'
            ? `${data.current}d`
            : data.current.toLocaleString()}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Target: {metric === 'revenue' || metric === 'pipeline' || metric === 'cac' || metric === 'ltv' || metric === 'dealSize'
              ? `$${(data.target / 1000).toFixed(0)}K`
              : metric === 'ltvcac'
              ? `${data.target}:1`
              : metric === 'payback'
              ? `${data.target}mo`
              : metric === 'salesCycle'
              ? `${data.target}d`
              : data.target}
          </span>
          <span className={`flex items-center text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
            {Math.abs(data.change)}%
          </span>
        </div>
        <div className="mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                progressPercent >= 100 ? 'bg-green-500' :
                progressPercent >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  const FunnelStage = ({ stage, index }: { stage: any, index: number }) => {
    const widthPercent = 100 - (index * 20)

    return (
      <div className="relative mb-4">
        <div
          className="mx-auto h-20 flex items-center justify-center text-white font-semibold rounded shadow-sm transition-all duration-300 hover:shadow-md"
          style={{
            width: `${widthPercent}%`,
            backgroundColor: `hsl(${220 - index * 30}, 70%, ${50 + index * 5}%)`
          }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold">{stage.value}</div>
            <div className="text-xs opacity-90">{stage.stage}</div>
          </div>
        </div>
        {stage.conversion && (
          <div className="text-center mt-2">
            <span className="text-sm text-gray-600 font-medium">
              {stage.conversion.toFixed(1)}% conversion
            </span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
            <div className="flex items-center gap-4">
              {/* Company Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedCompany('sidetool')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCompany === 'sidetool'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Sidetool
                </button>
                <button
                  onClick={() => setSelectedCompany('kleva')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCompany === 'kleva'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Kleva
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* KPI Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Key Performance Indicators</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <KPICard metric="revenue" data={data.kpis.revenue} />
            <KPICard metric="deals" data={data.kpis.deals} />
            <KPICard metric="dealSize" data={data.kpis.dealSize} />
            <KPICard metric="sqls" data={data.kpis.sqls} />
            <KPICard metric="pipeline" data={data.kpis.pipeline} />
            <KPICard metric="cac" data={data.kpis.cac} />
            <KPICard metric="ltv" data={data.kpis.ltv} />
            <KPICard metric="ltvcac" data={data.kpis.ltvcac} />
            <KPICard metric="payback" data={data.kpis.payback} />
            <KPICard metric="salesCycle" data={data.kpis.salesCycle} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Funnel */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-6 text-gray-900">Sales Funnel</h2>
            <div className="space-y-1">
              {data.funnel.map((stage, index) => (
                <FunnelStage key={stage.stage} stage={stage} index={index} />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded">
              <div className="text-center">
                <div className="text-xs text-gray-500">Lead→Demo</div>
                <div className="font-bold text-lg">{data.funnel[1].conversion?.toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Demo→Opp</div>
                <div className="font-bold text-lg">{data.funnel[2].conversion?.toFixed(1)}%</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Opp→Close</div>
                <div className="font-bold text-lg">{data.funnel[3].conversion?.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          {/* Meeting Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-6 text-gray-900">Meeting Performance</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">Meetings Scheduled</div>
                  <div className="text-2xl font-bold">{data.meetings.scheduled}</div>
                </div>
                <Calendar className="w-10 h-10 text-blue-500" />
              </div>

              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">Show Rate</div>
                  <div className="text-2xl font-bold">{data.meetings.showRate}%</div>
                </div>
                <Users className="w-10 h-10 text-green-500" />
              </div>

              <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <div>
                  <div className="text-sm text-gray-600">No-Shows</div>
                  <div className="text-2xl font-bold">{data.meetings.noShows}</div>
                </div>
                <TrendingDown className="w-10 h-10 text-red-500" />
              </div>
            </div>

            {/* Meeting funnel visualization */}
            <div className="mt-6 p-4 bg-gray-50 rounded">
              <div className="text-xs text-gray-500 mb-2">Meeting Efficiency</div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="text-sm w-20">Scheduled</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" style={{ width: '100%' }}>
                      <span className="absolute right-2 top-1 text-xs text-white font-medium">{data.meetings.scheduled}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm w-20">Showed</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full" style={{ width: `${data.meetings.showRate}%` }}>
                      <span className="absolute right-2 top-1 text-xs text-white font-medium">
                        {Math.round(data.meetings.scheduled * data.meetings.showRate / 100)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Channel Performance Table */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-6 text-gray-900">Channel Performance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Traffic/Clicks
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leads
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SQLs
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Closed
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spend
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CAC
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead→Close %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.channels.map((channel) => (
                  <tr key={channel.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {channel.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                      {channel.traffic > 0 ? channel.traffic.toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                      {channel.leads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                      {channel.sqls}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`font-semibold ${channel.closed > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        {channel.closed}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-600">
                      ${(channel.spend / 1000).toFixed(1)}K
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`font-medium ${channel.cac > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                        {channel.cac > 0 ? `$${(channel.cac / 1000).toFixed(1)}K` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        channel.conversion > 3 ? 'bg-green-100 text-green-800' :
                        channel.conversion > 1 ? 'bg-yellow-100 text-yellow-800' :
                        channel.conversion > 0 ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {channel.conversion > 0 ? `${channel.conversion.toFixed(1)}%` : '0%'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-3 text-sm font-bold text-gray-900">Total</td>
                  <td className="px-6 py-3 text-sm font-bold text-center text-gray-900">
                    {data.channels.reduce((sum, ch) => sum + ch.traffic, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm font-bold text-center text-gray-900">
                    {data.channels.reduce((sum, ch) => sum + ch.leads, 0)}
                  </td>
                  <td className="px-6 py-3 text-sm font-bold text-center text-gray-900">
                    {data.channels.reduce((sum, ch) => sum + ch.sqls, 0)}
                  </td>
                  <td className="px-6 py-3 text-sm font-bold text-center text-gray-900">
                    {data.channels.reduce((sum, ch) => sum + ch.closed, 0)}
                  </td>
                  <td className="px-6 py-3 text-sm font-bold text-center text-gray-900">
                    ${(data.channels.reduce((sum, ch) => sum + ch.spend, 0) / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-3 text-sm font-bold text-center text-gray-900">
                    ${(data.channels.reduce((sum, ch) => sum + ch.spend, 0) /
                       data.channels.reduce((sum, ch) => sum + ch.closed, 0) / 1000).toFixed(1)}K
                  </td>
                  <td className="px-6 py-3 text-sm font-bold text-center text-gray-900">
                    {(data.channels.reduce((sum, ch) => sum + ch.closed, 0) /
                     data.channels.reduce((sum, ch) => sum + ch.leads, 0) * 100).toFixed(1)}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Channel Performance Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-md font-semibold mb-4 text-gray-900">Leads by Channel</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.channels}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="leads" fill="#3b82f6" />
                <Bar dataKey="sqls" fill="#10b981" />
                <Bar dataKey="closed" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-md font-semibold mb-4 text-gray-900">CAC by Channel</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.channels.filter(ch => ch.cac > 0)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value: any) => `$${(value / 1000).toFixed(1)}K`} />
                <Bar dataKey="cac" fill="#ef4444">
                  {data.channels.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cac > 4000 ? '#ef4444' : entry.cac > 2500 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}