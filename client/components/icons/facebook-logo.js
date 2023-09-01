import { FaFacebook } from 'react-icons/fa'

export default function FacebookLogo({ size = '36', className }) {
  return (
    <button className="btn">
      <FaFacebook color="#3b5998" size={size} className={className} />{' '}
    </button>
  )
}
