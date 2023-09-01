import { loadStripe } from '@stripe/stripe-js'

export async function Checkout(param) {
  let stripePromise = null

  const getStripe = ({ lineItems }) => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        'pk_test_51Nau9xJ7kSSBMf69SEdcce9mhfqAVZY0DWWewkgYEZAfHIi1vdXau221rJoVPjTpyD3IPzOABC4eE9XEqZiO7bTv00yl1cwDlg'
      )
    }
    return stripePromise
  }

  const stripe = await getStripe(param)

  await stripe.redirectToCheckout({
    mode: 'payment',
    // eslint-disable-next-line no-undef
    lineItems: param.lineItems,
    successUrl: `http://localhost:3000/cart/linepay/credicardSucess`,
    cancelUrl: `http://localhost:3000/video/video-subscribe`,
  })
}
