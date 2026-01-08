 
  const investmentPlans = [
  {
    slug: 'debut-plan',
    name: 'Debut Plan',
    minAmount: 50,
    maxAmount: 10000,
    returnPercent: 20,
    dailyInterest: true,
    referralCommissionPercent: 10,
    durationHours: 24,
    durationDays: 1,
    totalReturnPercent: 20,
    capitalIncluded: true,
    description: 'Return 20% daily with capital after 24 hours',
    cta: 'Invest Now',
  },

  {
    slug: 'progressive-package',
    name: 'Progressive Package',
    minAmount: 1500,
    maxAmount: 50000,
    returnPercent: 40,
    dailyInterest: true,
    referralCommissionPercent: 10,
    durationHours: 48,
    durationDays: 2,
    totalReturnPercent: 80,
    capitalIncluded: true,
    description: 'Return 40% daily with capital after 48 hours',
    cta: 'Invest Now',
  },

  {
    slug: 'enhanced-package',
    name: 'Enhanced Package',
    minAmount: 5500,
    maxAmount: 100000,
    returnPercent: 50,
    dailyInterest: true,
    referralCommissionPercent: 10,
    durationHours: 96,
    durationDays: 4,
    totalReturnPercent: 200,
    capitalIncluded: true,
    description: 'Return 50% daily with capital after 96 hours',
    cta: 'Invest Now',
  },

  {
    slug: 'elite-package',
    name: 'Elite Package',
    minAmount: 25000,
    maxAmount: null, // Unlimited
    returnPercent: 70,
    dailyInterest: true,
    referralCommissionPercent: 10,
    durationHours: 168,
    durationDays: 7,
    totalReturnPercent: 490,
    capitalIncluded: true,
    description: 'Return 70% daily with capital after 7 days',
    cta: 'Invest Now',
  },
];
const InvestmentPlanCard = ({ plan }) => {
  return (
    <div className="plan-card w-full max-w-sm rounded-xl overflow-hidden bg-white border border-neutral-200 shadow-lg">
      <div className="p-8">
        <h3 className="text-2xl font-bold text-neutral-800">{plan.name}</h3>
        <div className="mt-4 mb-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-neutral-900">${plan.minAmount} - ${plan.maxAmount || 'Unlimited'}</span>
          </div>
          <p className="text-neutral-500 text-sm mt-1">Minimum investment: ${plan.minAmount}</p>
        </div>

        <div className="border-t border-b border-neutral-200 py-6 mb-6">
          <div className="flex items-center mb-4">
            <span className="text-secondary-600 font-bold mr-2">{plan.returnPercent}%</span>
            <span className="text-neutral-700">Return daily with capital after {plan.durationDays} days</span>
          </div>
          <div className="bg-neutral-100 rounded-full h-2 mb-2">
            <div className="bg-neutral-800 h-2 rounded-full" style={{ width: `${plan.returnPercent}%` }}></div>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          <li className="flex items-start">
            <i className="fas fa-check-circle text-secondary-600 mt-1 mr-3"></i>
            <span className="text-neutral-700">{plan.description}</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle text-secondary-600 mt-1 mr-3"></i>
            <span className="text-neutral-700">Referral Commission: {plan.referralCommissionPercent}%</span>
          </li>
        </ul>

        <button className="w-full bg-neutral-800 hover:bg-neutral-900 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center">
          <span>{plan.cta}</span>
          <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
};

const AppPlan = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
      {investmentPlans.map((plan, index) => (
        <InvestmentPlanCard key={index} plan={plan} />
      ))}
    </div>
  );
};

export default AppPlan;