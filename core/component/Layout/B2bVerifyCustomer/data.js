import blueCircleBg from '../../../../public/assets/blue-circle.svg'
import thumb from '../../../../public/assets/ri-thumb-up-fill.svg'
import price from '../../../../public/assets/ri-price-tag-3-fill.svg'
import dashboard from '../../../../public/assets/ri-dashboard-2-fill.svg'

export const mockData = {
  informCustomerData: [
    {
      id: '1',
      bg1: blueCircleBg,
      icon: thumb,
      text: 'Its FREE and customer will get their complete Credit Bureau report'
    },
    { id: '2', bg1: blueCircleBg, icon: price, text: 'It helps them to get the best Loan and Credit Card Product' },
    { id: '3', bg1: blueCircleBg, icon: dashboard, text: 'It will not impact customers’ Credit Sore in any manner.' },
    {
      id: '4',
      bg1: blueCircleBg,
      icon: dashboard,
      text: 'Your personal information is 100% secured with us. We do not share your data with any third-party or eve your advisor.'
    }
  ]
}
