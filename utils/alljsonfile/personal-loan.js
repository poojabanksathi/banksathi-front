import starImage from '../../public/assets/Star-18.svg'

export const inputRangeFilters = [
  {
    id: '1',
    filterName: 'Required Loan Amount',
    slug: 'loanAmount'
  },
  {
    id: '2',
    filterName: 'Loan Tenure',
    slug: 'loanTenure'
  },
  {
    id: '3',
    filterName: 'Interest rate',
    slug: 'interest'
  }
]
export const loanSortingOptions = [
  {
    id: '1',
    name: 'Credit Score: Low to High'
  },
  {
    id: '2',
    name: 'Credit Score: High to Low'
  },
  {
    id: '3',
    name: 'Rating: Low to High'
  },
  {
    id: '4',
    name: 'Rating: High to Low'
  }
]
export const loanAmountsOptions = [
  {
    id: '1',
    name: 'Upto 1 Lakh',
    valueToMatch: '100000'
  },
  {
    id: '2',
    name: '1 to 3 Lakhs',
    valueToMatch: '300000'
  },
  {
    id: '3',
    name: '3 to 5 Lakhs',
    valueToMatch: '500000'
  },
  {
    id: '4',
    name: '5 to 10 Lakhs',
    valueToMatch: '1000000'
  },
  {
    id: '5',
    name: '10+ Lakhs',
    valueToMatch: '10000001'
  }
]
export const incomeOptions = [
  {
    id: '1',
    name: 'Upto 25K',
    valueToMatch: '25000'
  },
  {
    id: '2',
    name: '25K to 50K',
    valueToMatch: '50000'
  },
  {
    id: '3',
    name: '50K to 100K',
    valueToMatch: '100000'
  },
  {
    id: '4',
    name: '100K+',
    valueToMatch: '1000001'
  }
]
export const itrOptions = [
  {
    id: '1',
    name: 'Upto 3 lakhs',
    valueToMatch: '300000'
  },
  {
    id: '2',
    name: '3 lakhs to 5 lakhs',
    valueToMatch: '500000'
  },
  {
    id: '3',
    name: '5 lakhs to 7 lakhs',
    valueToMatch: '700000'
  },
  {
    id: '4',
    name: '7 lakhs to 10 lakhs',
    valueToMatch: '1000000'
  },
  {
    id: '5',
    name: '10 lakhs to 15 lakhs',
    valueToMatch: '1500000'
  },
  {
    id: '6',
    name: '15 lakhs to 20 lakhs',
    valueToMatch: '2000000'
  },
  {
    id: '7',
    name: '20 lakhs+',
    valueToMatch: '2000001'
  }
]
export const eligibilityFeatures = [
  {
    id: '1',
    title: 'Just a few details',
    subTitle: 'GSimple process, minimal details needed for quick and easy solutions tailored just for you.',
    image: starImage
  },
  {
    id: '2',
    title: 'Get personalised loan offers',
    subTitle:
      'Explore loan options personalized to your needs with offers designed to fit your unique financial situation.',
    image: starImage
  },
  {
    id: '3',
    title: 'Fast Loan approval',
    subTitle: 'Swift loan approval, ensuring you get the financial support you need without unnecessary delays.',
    image: starImage
  }
]
export const moneyUsageOptions = [
  {
    id: '11',
    name: 'Debt Consolidation'
  },
  {
    id: '12',
    name: 'Home Improvement'
  },
  {
    id: '13',
    name: 'Medical Expenses'
  },
  {
    id: '14',
    name: 'Education'
  },
  {
    id: '15',
    name: 'Wedding & Special Events'
  },
  {
    id: '16',
    name: 'Business'
  },
  {
    id: '17',
    name: 'Travel'
  }
]
export const mockCreditScore = [
  { id: '1', name: '0-300' },
  { id: '2', name: '300-500' },
  { id: '3', name: '500-700' },
  { id: '4', name: '700-900' }
]
export const employmentOptions = [
  {
    id: '1',
    name: 'Salaried'
  },
  {
    id: '2',
    name: 'Self-employed'
  }
]
