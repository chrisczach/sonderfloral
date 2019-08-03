import React, { useContext, useState, useEffect } from 'react'
import posed from 'react-pose'
import { tween } from 'popmotion'
import { interpolate } from 'flubber'
import ResizeAware from 'react-resize-aware'
import Div100vh from 'react-div-100vh'

import styles from './background-image.module.css'
import { ScrollRefContext } from './global-styles'

export default function BackgroundImage() {
  const scroll = useContext(ScrollRefContext)
  const [index, setIndex] = useState(0)

  // const colorIndex = Math.floor(Math.random() * colors.length)
  // const pathIndex = Math.floor(Math.random() * pathIds.length)

  const colorIndex = index
  const pathIndex = index

  let width
  let height
  try {
    width = window.innerWidth
    height = window.innerHeight
  } catch (e) {}
  // const [listener, { width, height }] = ResizeAware()

  useEffect(() => {
    const scrollHandler = ({ target }) => {
      const { scrollTop, scrollHeight } = target
      const { height } = target.getBoundingClientRect()
      const scrollHeightCalc = scrollHeight - height
      const divisor = 4
      const segmentSize = scrollHeightCalc / divisor
      const index = Math.max(Math.ceil(scrollTop / segmentSize) - 1, 0)
      setIndex(index)
    }

    scroll.current.addEventListener('scroll', scrollHandler)
    return () => {
      scroll.current.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  return (
    <div className={styles.backgroundImage}>
      {/* {listener} */}
      <svg
        className={styles.svgWrapper}
        width={width}
        height={Math.min(height * 0.8, width)}
        viewBox={`0 0 400 400`}
      >
        <Icon fill={`var(${colors[colorIndex]})`} pose={pathIds[pathIndex]} />
      </svg>
    </div>
  )
}

const colors = ['--color-accent-light', '--color-accent-dark', '--color-brand', '--color-main-dark']

const paths = {
  first:
    'M68.2,-100.9C82.3,-97,83.4,-67.8,79.8,-45.4C76.2,-22.9,67.8,-7.2,78.4,20.6C89,48.5,118.5,88.4,120.3,126.7C122,164.9,96,201.4,69.2,187.2C42.4,173,14.8,108.1,-21.9,90.2C-58.6,72.2,-104.5,101.3,-146.3,100.4C-188,99.5,-225.7,68.7,-236.5,30.5C-247.4,-7.6,-231.5,-53,-204.8,-86.1C-178.1,-119.2,-140.7,-139.9,-104.8,-133.9C-68.8,-127.8,-34.4,-94.9,-3.7,-89.1C27,-83.4,54.1,-104.8,68.2,-100.9Z',
  second:
    'M40.5,-32.5C72.3,-42.5,131.7,-64.9,154.4,-57.9C177.2,-51,163.3,-14.8,164.5,28.4C165.6,71.5,181.8,121.5,162.4,136.5C142.9,151.5,87.8,131.4,45.6,134C3.5,136.6,-25.7,161.8,-50.2,159.8C-74.7,157.7,-94.4,128.3,-114.9,101.4C-135.5,74.5,-156.8,50,-169.6,19C-182.5,-12,-186.7,-49.6,-161.3,-60.5C-135.8,-71.3,-80.6,-55.4,-48.8,-45.4C-16.9,-35.4,-8.5,-31.2,-2.1,-28C4.3,-24.7,8.7,-22.5,40.5,-32.5Z',
  third:
    'M47.6,-65.5C67.7,-61,94.4,-58.1,111.9,-44C129.5,-29.8,138,-4.4,151.1,33.6C164.2,71.7,181.8,122.3,168.6,156.7C155.3,191.1,111,209.2,70.8,204.1C30.6,198.9,-5.5,170.5,-48.8,160.4C-92,150.3,-142.4,158.7,-171.6,140.2C-200.7,121.7,-208.8,76.4,-214.4,31.4C-220,-13.7,-223.3,-58.6,-209.6,-98.7C-195.9,-138.8,-165.2,-174.1,-127.5,-170.6C-89.7,-167,-44.9,-124.5,-15.6,-100.2C13.7,-76,27.4,-70,47.6,-65.5Z',
  fourth:
    'M84.1,-100.8C122.7,-106,177.3,-106,177.7,-86.6C178.1,-67.3,124.2,-28.6,99.1,0.9C74.1,30.3,77.8,50.5,73.8,75.1C69.8,99.6,58,128.5,38.1,138.3C18.1,148.1,-10,138.8,-22.7,116.9C-35.4,95.1,-32.8,60.6,-45.5,41.8C-58.1,22.9,-86,19.6,-100.2,6.5C-114.4,-6.7,-115,-29.7,-97.2,-34.3C-79.4,-38.8,-43.2,-24.9,-23.9,-28.6C-4.7,-32.3,-2.3,-53.6,10.2,-69.5C22.7,-85.3,45.4,-95.7,84.1,-100.8Z'
}

const pathIds = Object.keys(paths)

const morphTransition = ({ from, to }) =>
  tween({
    from: 0,
    to: 1
  }).pipe(interpolate(from, to))

const Icon = posed.path(
  pathIds.reduce((config, id) => {
    config[id] = {
      d: paths[id],
      transition: morphTransition
    }

    return config
  }, {})
)

const NextButton = posed.button({
  hoverable: true,
  pressable: true,
  init: { scale: 1 },
  hover: { scale: 1.1 },
  press: { scale: 0.8 }
})
