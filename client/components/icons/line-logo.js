import { FaLine } from 'react-icons/fa'

export default function LineLogo({ size = '36', className }) {
  return (
    <button className="btn">
      <FaLine color="#06C755" size={size} className={className} />
    </button>
  )
}
