import PngExample from '@/assets/test.png'
import SvgExample from '@/assets/test.svg'

export const Mock = () => {
  return (
    <div>
        <img src={PngExample} width={50} height={50} />
        <SvgExample width={50} height={50} />
    </div>
  )
}
