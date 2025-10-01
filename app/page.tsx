'use client'

import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, FunnelChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts'
import {
  TrendingUp, TrendingDown, DollarSign, Users,
  Target, Calendar, AlertCircle, ChevronRight,
  Filter, Download, RefreshCw
} from 'lucide-react'

// Data from the CSV
const adSpendData = {
  sidetool: {
    googleAds: [
      { week: 'Sep 22', spend: 120.8, impressions: 820, clicks: 34, leads: 0, ctr: 4.15 }
    ],
    meta: [
      { week: 'Aug 4', spend: 165.83, impressions: 3493, clicks: 32, leads: 0, cpl: 0, cr: 0 },
      { week: 'Aug 11', spend: 435.35, impressions: 1369, clicks: 45, leads: 1, cpl: 435.4, cr: 2.2 },
      { week: 'Aug 18', spend: 52.35, impressions: 135, clicks: 5, leads: 3, cpl: 17.5, cr: 60.0 },
      { week: 'Aug 25', spend: 479.69, impressions: 24839, clicks: 95, leads: 6, cpl: 79.9, cr: 6.3 },
      { week: 'Sep 1', spend: 455.95, impressions: 34103, clicks: 84, leads: 1, cpl: 456.0, cr: 1.2 },
      { week: 'Sep 8', spend: 380.07, impressions: 14842, clicks: 75, leads: 7, cpl: 54.3, cr: 9.3 },
      { week: 'Sep 15', spend: 191.63, impressions: 34225, clicks: 86, leads: 2, cpl: 95.8, cr: 2.3 },
      { week: 'Sep 22', spend: 275.54, impressions: 27358, clicks: 102, leads: 3, cpl: 91.8, cr: 2.9 }
    ]
  },
  kleva: {
    googleAds: [
      { week: 'Sep 8', spend: 218.24, impressions: 4608, clicks: 116, leads: 0, ctr: 2.52 },
      { week: 'Sep 15', spend: 260.59, impressions: 6624, clicks: 189, leads: 0, ctr: 2.85 },
      { week: 'Sep 22', spend: 150.72, impressions: 3407, clicks: 64, leads: 0, ctr: 1.88 }
    ],
    linkedIn: [
      { week: 'Sep 1', spend: 150, impressions: 804, clicks: 339, leads: 2, cpl: 75.0, ctr: 42.16, cr: 0.6 },
      { week: 'Sep 8', spend: 325, impressions: 1179, clicks: 558, leads: 4, cpl: 81.3, ctr: 47.33, cr: 0.7 },
      { week: 'Sep 15', spend: 350, impressions: 1030, clicks: 528, leads: 3, cpl: 116.7, ctr: 51.26, cr: 0.6 },
      { week: 'Sep 22', spend: 335, impressions: 867, clicks: 474, leads: 5, cpl: 66.9, ctr: 54.67, cr: 1.1 }
    ]
  }
}

// Sample funnel data
const funnelData = [
  { name: 'Website Visitors', value: 10000, fill: '#8884d8' },
  { name: 'Leads', value: 500, fill: '#83a6ed' },
  { name: 'SQLs', value: 150, fill: '#8dd1e1' },
  { name: 'Demos', value: 60, fill: '#82ca9d' },
  { name: 'Opportunities', value: 30, fill: '#a4de6c' },
  { name: 'Won Deals', value: 8, fill: '#ffc658' },
]

// KPI Cards data
const kpiData = {
  sidetool: {
    revenue: { current: 160000, target: 210000, change: -15 },
    deals: { current: 2, target: 8, change: -60 },
    pipeline: { current: 450000, target: 600000, change: 12 },
    meetings: { current: 12, target: 20, change: -20 },
    ltvcac: { current: 3.2, target: 10, change: -45 },
    cac: { current: 15000, target: 5000, change: 35 }
  },
  kleva: {
    revenue: { current: 37000, target: 150000, change: 45 },
    deals: { current: 3, target: 9, change: 25 },
    pipeline: { current: 158000, target: 300000, change: 65 },
    meetings: { current: 8, target: 15, change: 15 },
    ltvcac: { current: 8.5, target: 10, change: 12 },
    cac: { current: 3500, target: 3000, change: -8 }
  }
}

export default function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState<'all' | 'sidetool' | 'kleva'>('all')
  const [timeRange, setTimeRange] = useState('last30days')

  const getKPIValue = (metric: keyof typeof kpiData.sidetool) => {
    if (selectedCompany === 'all') {
      return {
        current: kpiData.sidetool[metric].current + kpiData.kleva[metric].current,
        target: kpiData.sidetool[metric].target + kpiData.kleva[metric].target,
        change: (kpiData.sidetool[metric].change + kpiData.kleva[metric].change) / 2
      }
    }
    return selectedCompany === 'sidetool' ? kpiData.sidetool[metric] : kpiData.kleva[metric]
  }

  const KPICard = ({ title, value, target, change, prefix = '', suffix = '' }: {
    title: string
    value: number
    target: number
    change: number
    prefix?: string
    suffix?: string
  }) => {
    const isPositive = change >= 0
    const progressPercent = (value / target) * 100

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <span className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(change)}%
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {prefix}{value.toLocaleString()}{suffix}
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Target: {prefix}{target.toLocaleString()}{suffix}</span>
            <span>{progressPercent.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${progressPercent >= 100 ? 'bg-green-500' : progressPercent >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
        </div>
      </div>
    )
  }

  const channelPerformance = selectedCompany === 'kleva'
    ? [
        { channel: 'LinkedIn', leads: 14, spend: 1160, cpl: 82.9, conversion: 0.75 },
        { channel: 'Google Ads', leads: 0, spend: 629.55, cpl: 0, conversion: 0 },
      ]
    : [
        { channel: 'Meta', leads: 23, spend: 2430.96, cpl: 105.7, conversion: 4.4 },
        { channel: 'Google Ads', leads: 0, spend: 120.8, cpl: 0, conversion: 0 },
        { channel: 'SEO', leads: 15, spend: 0, cpl: 0, conversion: 12 },
        { channel: 'Referrals', leads: 8, spend: 0, cpl: 0, conversion: 25 },
      ]

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
                  onClick={() => setSelectedCompany('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCompany === 'all'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
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

              {/* Time Range */}
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="last90days">Last 90 days</option>
                <option value="thisquarter">This Quarter</option>
              </select>

              <button className="p-2 text-gray-600 hover:text-gray-900">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <KPICard
            title="MRR"
            value={getKPIValue('revenue').current}
            target={getKPIValue('revenue').target}
            change={getKPIValue('revenue').change}
            prefix="$"
          />
          <KPICard
            title="New Deals"
            value={getKPIValue('deals').current}
            target={getKPIValue('deals').target}
            change={getKPIValue('deals').change}
          />
          <KPICard
            title="Pipeline"
            value={getKPIValue('pipeline').current}
            target={getKPIValue('pipeline').target}
            change={getKPIValue('pipeline').change}
            prefix="$"
          />
          <KPICard
            title="Meetings"
            value={getKPIValue('meetings').current}
            target={getKPIValue('meetings').target}
            change={getKPIValue('meetings').change}
          />
          <KPICard
            title="LTV:CAC"
            value={getKPIValue('ltvcac').current}
            target={getKPIValue('ltvcac').target}
            change={getKPIValue('ltvcac').change}
            suffix=":1"
          />
          <KPICard
            title="CAC"
            value={getKPIValue('cac').current}
            target={getKPIValue('cac').target}
            change={getKPIValue('cac').change}
            prefix="$"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Funnel Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Conversion Funnel</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funnelData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <div className="text-gray-500">Lead → SQL</div>
                <div className="font-semibold">30%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500">SQL → Demo</div>
                <div className="font-semibold">40%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-500">Demo → Won</div>
                <div className="font-semibold">13%</div>
              </div>
            </div>
          </div>

          {/* Channel Performance */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Channel Performance</h2>
            <div className="space-y-3">
              {channelPerformance.map((channel) => (
                <div key={channel.channel} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{channel.channel}</span>
                    <span className="text-sm text-gray-500">{channel.leads} leads</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Spend: </span>
                      <span className="font-medium">${channel.spend.toFixed(0)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">CPL: </span>
                      <span className="font-medium">
                        {channel.cpl > 0 ? `$${channel.cpl.toFixed(0)}` : 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Conv: </span>
                      <span className="font-medium">{channel.conversion.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ad Spend Trends */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Ad Spend & Performance Trends</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spend Over Time */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">Weekly Ad Spend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={selectedCompany === 'kleva'
                    ? adSpendData.kleva.linkedIn
                    : adSpendData.sidetool.meta
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="spend" stroke="#8884d8" name="Spend ($)" />
                  <Line type="monotone" dataKey="leads" stroke="#82ca9d" name="Leads" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* CTR & Conversion */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-3">CTR & Conversion Rates</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={selectedCompany === 'kleva'
                    ? adSpendData.kleva.linkedIn
                    : adSpendData.sidetool.meta
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ctr" stroke="#ff7300" name="CTR (%)" />
                  <Line type="monotone" dataKey="cr" stroke="#e91e63" name="Conv Rate (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-amber-500" />
            Alerts & Actions
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium text-sm">Google Ads: 0% conversion rate</div>
                  <div className="text-xs text-gray-600">369 clicks, 0 leads in past 3 weeks</div>
                </div>
              </div>
              <button className="text-red-600 text-sm font-medium hover:text-red-700">
                Review Campaign <ChevronRight className="inline w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium text-sm">High CPL on Meta</div>
                  <div className="text-xs text-gray-600">Average $105, target is $50</div>
                </div>
              </div>
              <button className="text-amber-600 text-sm font-medium hover:text-amber-700">
                Optimize Targeting <ChevronRight className="inline w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium text-sm">LinkedIn performing well</div>
                  <div className="text-xs text-gray-600">50%+ CTR, 5 leads last week</div>
                </div>
              </div>
              <button className="text-green-600 text-sm font-medium hover:text-green-700">
                Scale Campaign <ChevronRight className="inline w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}