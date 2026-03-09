'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Navigation from '@/components/Navigation'
import {
  Calculator,
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

export default function CalculatorPage() {
  const [amount, setAmount] = useState(100000)
  const [months, setMonths] = useState(12)
  const [collateral, setCollateral] = useState(150000)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    calculateLoan()
  }, [amount, months, collateral])

  const calculateLoan = async () => {
    if (amount < 1000 || amount > 5000000) return
    if (months < 1 || months > 60) return

    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/loans/calculator`, {
        params: { amount, months, collateral },
      })

      if (response.data.success) {
        setResult(response.data.data)
      }
    } catch (error) {
      console.error('Calculator error:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const requiredCollateral = amount * 1.5
  const collateralSufficient = collateral >= requiredCollateral
  const qualifies = collateralSufficient && amount >= 1000 && amount <= 5000000

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-rose rounded-lg mb-4"
          >
            <Calculator className="text-white" size={28} />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">
            Loan Calculator
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Estimate your monthly payments and loan eligibility
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enter Loan Details</h2>

            <div className="space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (KES)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="1000"
                    max="5000000"
                    step="1000"
                    className="input pl-11"
                  />
                </div>
                <input
                  type="range"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min="1000"
                  max="5000000"
                  step="1000"
                  className="w-full mt-3"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>KES 1,000</span>
                  <span className="font-semibold text-brand-red">{formatCurrency(amount)}</span>
                  <span>KES 5,000,000</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Duration (Months)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    min="1"
                    max="60"
                    className="input pl-11"
                  />
                </div>
                <input
                  type="range"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  min="1"
                  max="60"
                  className="w-full mt-3"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 month</span>
                  <span className="font-semibold text-brand-red">{months} months</span>
                  <span>60 months</span>
                </div>
              </div>

              {/* Collateral Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collateral Value (KES)
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={collateral}
                    onChange={(e) => setCollateral(Number(e.target.value))}
                    min="0"
                    step="1000"
                    className="input pl-11"
                  />
                </div>
                <input
                  type="range"
                  value={collateral}
                  onChange={(e) => setCollateral(Number(e.target.value))}
                  min="0"
                  max={amount * 2}
                  step="1000"
                  className="w-full mt-3"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>KES 0</span>
                  <span className="font-semibold text-brand-red">{formatCurrency(collateral)}</span>
                </div>
              </div>

              {/* Required Collateral Info */}
              <div className={`p-4 rounded-lg flex gap-3 ${collateralSufficient ? 'bg-green-50' : 'bg-yellow-50'}`}>
                {collateralSufficient ? (
                  <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                ) : (
                  <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
                )}
                <div className="text-sm">
                  <p className={`font-semibold ${collateralSufficient ? 'text-green-900' : 'text-yellow-900'}`}>
                    Required Collateral: {formatCurrency(requiredCollateral)}
                  </p>
                  <p className={collateralSufficient ? 'text-green-700' : 'text-yellow-700'}>
                    {collateralSufficient
                      ? '✓ Your collateral meets the minimum requirement'
                      : '⚠️ You need more collateral to qualify for this loan'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Qualification Status */}
            <div className={`card p-6 ${qualifies ? 'border-2 border-green-400 bg-green-50' : 'border-2 border-yellow-400 bg-yellow-50'}`}>
              <div className="flex items-start gap-4">
                {qualifies ? (
                  <div className="p-3 bg-green-500 rounded-lg">
                    <CheckCircle className="text-white" size={28} />
                  </div>
                ) : (
                  <div className="p-3 bg-yellow-500 rounded-lg">
                    <AlertCircle className="text-white" size={28} />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 ${qualifies ? 'text-green-900' : 'text-yellow-900'}`}>
                    {qualifies ? 'Eligible for Loan' : 'Additional Requirements Needed'}
                  </h3>
                  <p className={`text-sm ${qualifies ? 'text-green-700' : 'text-yellow-700'}`}>
                    {qualifies
                      ? 'You meet the basic requirements for this loan amount.'
                      : 'Please adjust your loan amount or provide additional collateral to meet eligibility criteria.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Loan Summary */}
            {result && (
              <div className="card p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Loan Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Principal Amount</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(result.loan_amount)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="text-lg font-bold text-brand-red">{result.interest_rate}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-lg font-bold text-gray-900">{result.duration_months} months</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(result.total_interest)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Legal Fees (2.5%)</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(result.legal_fees || 0)}</span>
                  </div>
                  <div className="bg-gradient-rose p-4 rounded-lg">
                    <div className="flex justify-between items-center text-white">
                      <span className="text-lg">Monthly Payment</span>
                      <span className="text-2xl font-bold">{formatCurrency(result.monthly_payment)}</span>
                    </div>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-white">
                      <span className="text-lg">Total Repayment</span>
                      <span className="text-2xl font-bold">{formatCurrency(result.total_repayable)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Key Information */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex gap-3">
                <Info className="text-blue-600 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-2">Interest Rates:</p>
                  <ul className="space-y-1">
                    <li>• KES 1 - 99,999: <strong>20%</strong></li>
                    <li>• KES 100,000 - 399,999: <strong>17.5%</strong></li>
                    <li>• KES 400,000 - 599,999: <strong>15%</strong></li>
                    <li>• KES 600,000+: <strong>5-10%</strong></li>
                  </ul>
                  <p className="mt-3 text-xs text-blue-700">
                    * Legal fees: 2.5% of loan amount<br />
                    * Collateral requirement: 1.5x loan value
                  </p>
                </div>
              </div>
            </div>

            {/* Apply Now Button */}
            {qualifies && (
              <Link
                href="/register"
                className="btn btn-primary w-full flex items-center justify-center group py-3"
              >
                Apply for This Loan
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            )}
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 grid md:grid-cols-3 gap-6"
        >
          <div className="card p-6">
            <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <CheckCircle className="text-green-600" size={22} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Processing</h3>
            <p className="text-sm text-gray-600">Applications reviewed within 24-48 hours</p>
          </div>

          <div className="card p-6">
            <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <TrendingUp className="text-blue-600" size={22} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Competitive Rates</h3>
            <p className="text-sm text-gray-600">Interest rates from 5% to 20% monthly</p>
          </div>

          <div className="card p-6">
            <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Calendar className="text-purple-600" size={22} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Flexible Terms</h3>
            <p className="text-sm text-gray-600">Repayment periods from 1 to 60 months</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
