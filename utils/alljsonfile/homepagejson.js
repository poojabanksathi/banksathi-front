import shoppingIcon from '../../public/assets/shopping-icon.svg'
import cashbackicon from '../../public/assets/cashback-icon.svg'
import airportloungeicon from '../../public/assets/airport-lounge-icon.svg'
import travelicon from '../../public/assets/travel-icon.svg'
import dineinicon from '../../public/assets/dining-icon.svg'
import moviesicon from '../../public/assets/movies-icon.svg'
import salaryIcon from '../../public/assets/salary-icon.svg'
import highestInterest from '../../public/assets/highest-rate.svg'
import womenIcon from '../../public/assets/women-icon.svg'
import minorIcon from '../../public/assets/minor-icon.svg'
import zeroBal from '../../public/assets/xero-bal-icon.svg'
import nriIcon from '../../public/assets/nri-icon.svg'

export const productsTitle = [
  {
    id: '1',
    name: 'Credit Card'
  },
  {
    id: '2',
    name: 'Bank Account'
  },
  {
    id: '3',
    name: 'Personal Loan'
  }
]

export const creditCardsSubCategory = [
  {
    id: '1',
    name: 'Shopping',
    icon: shoppingIcon,
    urlSlug: '/credit-cards/shopping'
  },
  {
    id: '2',
    name: 'Cashback',
    icon: cashbackicon,
    urlSlug: '/credit-cards/cashback'
  },
  {
    id: '3',
    name: 'Airport Lounge',
    icon: airportloungeicon,
    urlSlug: '/credit-cards/airport-lounge'
  },
  {
    id: '4',
    name: 'Travel',
    icon: travelicon,
    urlSlug: '/credit-cards/travel'
  },
  {
    id: '5',
    name: 'Dine-in',
    icon: dineinicon,
    urlSlug: '/credit-cards/dining'
  },
  {
    id: '6',
    name: 'Movie',
    icon: moviesicon,
    urlSlug: '/credit-cards/movies'
  }
]
export const bankAccountsCategory = [
  {
    id: '3',
    name: 'Salary Account',
    icon: salaryIcon,
    urlSlug: '/bank-accounts/best-salary-account'
  },
  {
    id: '4',
    name: 'Higher Interest Rate',
    icon: highestInterest,
    urlSlug: '/bank-accounts/saving-account-interest-rate'
  },
  {
    id: '5',
    name: 'Women Savings Account',
    icon: womenIcon,
    urlSlug: "/bank-accounts/women's-savings-account"
  },
  {
    id: '6',
    name: 'Minor Savings Account',
    icon: minorIcon,
    urlSlug: '/bank-accounts/kids-savings-account'
  },
  {
    id: '7',
    name: 'Zero Balance Account',
    icon: zeroBal,
    urlSlug: '/bank-accounts/zero-balance-savings'
  },
  {
    id: '8',
    name: 'NRI Account',
    icon: nriIcon,
    urlSlug: '/bank-accounts/nri-savings-account'
  }
]
export const loansCategory = [
  {
    id: '1',
    name: 'Digital Loan',
    icon: nriIcon,
    urlSlug: '/personal-loan/digital'
  },
  {
    id: '2',
    name: 'Instant Loan',
    icon: zeroBal,
    urlSlug: '/personal-loan/instant'
  }
]
