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
  const [scrollPercent, setScrollPercent] = useState(0)

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
      const percentScrolled = scrollTop / scrollHeightCalc
      // if (width > height) setScrollPercent(percentScrolled)
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
  console.log(scrollPercent)
  return (
    <Div100vh className={styles.backgroundImage}>
      {/* {listener} */}
      <svg
        style={{ transform: `translateY(${Math.floor(-scrollPercent * 30 + 60)}%)` }}
        className={styles.svgWrapper}
        viewBox={`0 0 600 600`}
      >
        <Icon fill={`var(${colors[colorIndex]})`} pose={pathIds[pathIndex]} />
      </svg>
    </Div100vh>
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
    'M91.1,-155.3C123.1,-121.2,157.5,-104.4,171.4,-77.3C185.4,-50.2,178.8,-12.7,163.6,16.4C148.3,45.5,124.4,66.3,107.6,102.7C90.8,139,81,190.9,56.9,201.3C32.9,211.7,-5.5,180.7,-45.4,164.5C-85.2,148.2,-126.5,146.8,-145.9,125.7C-165.3,104.6,-162.8,63.8,-179.9,19C-197,-25.8,-233.6,-74.6,-225,-106.7C-216.5,-138.9,-162.9,-154.4,-117.8,-182.5C-72.8,-210.6,-36.4,-251.3,-3.4000000000000004,-246C29.6,-240.7,59.1,-189.3,91.1,-155.3Z'
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
