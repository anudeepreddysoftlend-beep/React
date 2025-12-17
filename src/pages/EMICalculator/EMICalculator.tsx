import React, { useState } from 'react';
import './EMICalculator.css';

interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  monthlyBreakdown: MonthlyPayment[];
}

interface MonthlyPayment {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

const EMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [tenure, setTenure] = useState<string>('');
  const [tenureType, setTenureType] = useState<'months' | 'years'>('years');
  const [result, setResult] = useState<EMIResult | null>(null);
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(Math.round(num));
  };

  const getSliderBackground = (value: string, min: number, max: number) => {
    const numeric = parseFloat(value);
    if (isNaN(numeric)) return {};

    const clamped = Math.min(Math.max(numeric, min), max);
    const percentage = ((clamped - min) * 100) / (max - min);

    return {
      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
    };
  };

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(interestRate);
    const tenureValue = parseFloat(tenure);

    if (isNaN(P) || isNaN(annualRate) || isNaN(tenureValue) || P <= 0 || annualRate <= 0 || tenureValue <= 0) {
      return;
    }

    const N = tenureType === 'years' ? tenureValue * 12 : tenureValue;
    const R = annualRate / 12 / 100;

    // EMI Formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    // Calculate monthly breakdown
    const monthlyBreakdown: MonthlyPayment[] = [];
    let balance = P;

    for (let month = 1; month <= N; month++) {
      const interestForMonth = balance * R;
      const principalForMonth = emi - interestForMonth;
      balance = balance - principalForMonth;

      monthlyBreakdown.push({
        month,
        emi: emi,
        principal: principalForMonth,
        interest: interestForMonth,
        balance: Math.max(0, balance),
      });
    }

    setResult({
      emi,
      totalAmount,
      totalInterest,
      monthlyBreakdown,
    });
  };

  const handleReset = () => {
    setPrincipal('');
    setInterestRate('');
    setTenure('');
    setResult(null);
    setShowBreakdown(false);
  };

  const principalPercentage = result ? ((result.totalAmount - result.totalInterest) / result.totalAmount) * 100 : 0;
  const interestPercentage = result ? (result.totalInterest / result.totalAmount) * 100 : 0;

  // Calculate donut chart values
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const interestArcLength = result ? circumference * (interestPercentage / 100) : 0;
  const principalArcLength = result ? circumference * (principalPercentage / 100) : 0;

  return (
    <div className="emi-calculator-page">
      {/* Hero Section */}
      <section className="emi-hero">
        <div className="emi-hero-content">
          <div className="emi-hero-icon">🧮</div>
          <h1>EMI Calculator</h1>
          <p>Plan your loan repayment with our easy-to-use EMI calculator. Get instant calculations for your monthly installments.</p>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle decoration-circle-1"></div>
          <div className="decoration-circle decoration-circle-2"></div>
          <div className="decoration-circle decoration-circle-3"></div>
        </div>
      </section>

      <div className="emi-calculator-container">
        <div className="emi-calculator-wrapper">
          {/* Calculator Form */}
          <div className="emi-form-card card">
            <h2 className="form-title">Calculate Your EMI</h2>
          
          <div className="form-group">
            <label htmlFor="principal">
              Loan Amount <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-prefix">₹</span>
              <input
                type="text"
                inputMode="decimal"
                id="principal"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter loan amount"
              />
            </div>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="50000"
              value={principal || '0'}
              onChange={(e) => setPrincipal(e.target.value)}
              style={getSliderBackground(principal || '50000', 50000, 5000000)}
              className="emi-slider"
            />
          </div>

          <div className="form-group">
            <label htmlFor="interestRate">
              Interest Rate (% per annum) <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                inputMode="decimal"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
              />
              <span className="input-suffix">%</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={interestRate || '0'}
              onChange={(e) => setInterestRate(e.target.value)}
              style={getSliderBackground(interestRate || '1', 1, 20)}
              className="emi-slider"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tenure">
              Loan Tenure <span className="required">*</span>
            </label>
            <div className="tenure-input-group">
              <input
                type="text"
                inputMode="numeric"
                id="tenure"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter tenure"
              />
              <div className="tenure-toggle">
                <button
                  type="button"
                  className={`tenure-btn ${tenureType === 'years' ? 'active' : ''}`}
                  onClick={() => setTenureType('years')}
                >
                  Years
                </button>
                <button
                  type="button"
                  className={`tenure-btn ${tenureType === 'months' ? 'active' : ''}`}
                  onClick={() => setTenureType('months')}
                >
                  Months
                </button>
              </div>
            </div>
            <input
              type="range"
              min={tenureType === 'years' ? 1 : 12}
              max={tenureType === 'years' ? 30 : 360}
              step={tenureType === 'years' ? 1 : 12}
              value={tenure || '0'}
              onChange={(e) => setTenure(e.target.value)}
              style={getSliderBackground(tenure || (tenureType === 'years' ? '1' : '12'), tenureType === 'years' ? 1 : 12, tenureType === 'years' ? 30 : 360)}
              className="emi-slider"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary calculate-btn"
              onClick={calculateEMI}
              disabled={!principal || !interestRate || !tenure}
            >
              Calculate EMI
            </button>
            <button
              type="button"
              className="btn btn-secondary reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          </div>

          {/* Donut Chart */}
          {result && (
            <div className="emi-donut-chart-card card">
              <h3 className="donut-chart-title">Loan Breakdown</h3>
              <div className="donut-chart-container">
                <svg viewBox="0 0 200 200" className="donut-chart-svg">
                  {/* Background circle (Principal) */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="24"
                    className="donut-background"
                  />
                  {/* Interest portion (Blue) */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="24"
                    strokeDasharray={`${interestArcLength} ${circumference}`}
                    strokeDashoffset={principalArcLength}
                    className="donut-interest"
                    transform="rotate(-90 100 100)"
                  />
                </svg>
                <div className="donut-chart-center">
                  <div className="donut-center-label">Total</div>
                  <div className="donut-center-value">{formatCurrency(result.totalAmount)}</div>
                </div>
              </div>
              <div className="donut-chart-legend">
                <div className="donut-legend-item">
                  <div className="donut-legend-color principal"></div>
                  <div className="donut-legend-info">
                    <span className="donut-legend-label">Principal</span>
                    <span className="donut-legend-value">{formatCurrency(parseFloat(principal))}</span>
                  </div>
                </div>
                <div className="donut-legend-item">
                  <div className="donut-legend-color interest"></div>
                  <div className="donut-legend-info">
                    <span className="donut-legend-label">Interest</span>
                    <span className="donut-legend-value">{formatCurrency(result.totalInterest)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="emi-results-section">
            <div className="emi-result-card card">
              <h2 className="result-title">Your EMI Details</h2>
              
              <div className="emi-main-result">
                <div className="emi-amount">
                  <span className="emi-label">Monthly EMI</span>
                  <span className="emi-value">{formatCurrency(result.emi)}</span>
                </div>
              </div>

              <div className="emi-details-grid">
                <div className="emi-detail-item">
                  <div className="detail-icon principal-icon">💰</div>
                  <div className="detail-info">
                    <span className="detail-label">Principal Amount</span>
                    <span className="detail-value">{formatCurrency(parseFloat(principal))}</span>
                  </div>
                </div>

                <div className="emi-detail-item">
                  <div className="detail-icon interest-icon">📈</div>
                  <div className="detail-info">
                    <span className="detail-label">Total Interest</span>
                    <span className="detail-value interest">{formatCurrency(result.totalInterest)}</span>
                  </div>
                </div>

                <div className="emi-detail-item">
                  <div className="detail-icon total-icon">🏦</div>
                  <div className="detail-info">
                    <span className="detail-label">Total Amount Payable</span>
                    <span className="detail-value">{formatCurrency(result.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="emi-visual-breakdown">
                <h3>Payment Breakdown</h3>
                <div className="breakdown-chart">
                  <div 
                    className="chart-bar principal-bar" 
                    style={{ width: `${principalPercentage}%` }}
                  >
                    <span className="chart-label">Principal ({principalPercentage.toFixed(1)}%)</span>
                  </div>
                  <div 
                    className="chart-bar interest-bar" 
                    style={{ width: `${interestPercentage}%` }}
                  >
                    <span className="chart-label">Interest ({interestPercentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-color principal"></span>
                    <span>Principal: {formatCurrency(parseFloat(principal))}</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color interest"></span>
                    <span>Interest: {formatCurrency(result.totalInterest)}</span>
                  </div>
                </div>
              </div>

              {/* Monthly Breakdown Toggle */}
              <button
                className="breakdown-toggle"
                onClick={() => setShowBreakdown(!showBreakdown)}
              >
                {showBreakdown ? '▲ Hide' : '▼ Show'} Monthly Breakdown
              </button>

              {showBreakdown && (
                <div className="monthly-breakdown">
                  <div className="breakdown-table-wrapper">
                    <table className="breakdown-table">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>EMI</th>
                          <th>Principal</th>
                          <th>Interest</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.monthlyBreakdown.slice(0, showBreakdown ? undefined : 12).map((payment) => (
                          <tr key={payment.month}>
                            <td>{payment.month}</td>
                            <td>₹{formatNumber(payment.emi)}</td>
                            <td>₹{formatNumber(payment.principal)}</td>
                            <td>₹{formatNumber(payment.interest)}</td>
                            <td>₹{formatNumber(payment.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <section className="emi-info-section">
        <h2 className="section-title">Understanding EMI</h2>
        <div className="info-grid">
          <div className="info-card card">
            <div className="info-icon">📊</div>
            <h3>What is EMI?</h3>
            <p>EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.</p>
          </div>
          <div className="info-card card">
            <div className="info-icon">⚡</div>
            <h3>Prepayment Benefits</h3>
            <p>Making prepayments can significantly reduce your total interest and loan tenure. Even small extra payments can save you lakhs over time!</p>
          </div>
          <div className="info-card card">
            <div className="info-icon">💡</div>
            <h3>Tips</h3>
            <p>A longer tenure means lower EMI but higher total interest. Compare different scenarios to find the best option for you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EMICalculator;


