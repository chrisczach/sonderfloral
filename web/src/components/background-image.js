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
  // const [index, setIndex] = useState(0)

  let width = 2
  let height = 1
  try {
    width = window.innerWidth
    height = window.innerHeight
  } catch (e) {}
  const [scrollPercent, setScrollPercent] = useState(width < height ? 1 : 0)

  // const colorIndex = Math.floor(Math.random() * colors.length)
  // const pathIndex = Math.floor(Math.random() * pathIds.length)

  // const colorIndex = index
  // const pathIndex = index

  // const [listener, { width, height }] = ResizeAware()

  useEffect(() => {
    const scrollHandler = ({ target }) => {
      const { scrollTop, scrollHeight } = target
      const { height: heightDiv } = target.getBoundingClientRect()
      const scrollHeightCalc = scrollHeight - heightDiv
      const percentScrolled = scrollTop / scrollHeightCalc
      setScrollPercent(height > width ? 1 : percentScrolled)

      // const divisor = 4
      // const segmentSize = scrollHeightCalc / divisor
      // const index = Math.max(Math.ceil(scrollTop / segmentSize) - 1, 0)
      // setIndex(index)
    }

    scroll.current.addEventListener('scroll', scrollHandler)

    return () => {
      scroll.current.removeEventListener('scroll', scrollHandler)
    }
  }, [])
  return (
    <Div100vh className={styles.backgroundImage}>
      {/* {listener} */}
      <svg
        style={{ transform: `translateY(${-scrollPercent * 15 + 70}%)` }}
        className={styles.svgWrapper}
        viewBox={`0 0 600 600`}
      >
        <path
          style={{ transform: `translate(-10%, ${scrollPercent * -3 + 40}%)` }}
          fill={`var(${colors[2]})`}
          d={paths.third}
        />
        <path
          style={{ transform: `translate(35%, ${scrollPercent * 6 + 55}%)` }}
          fill={`var(${colors[3]})`}
          d={paths.fourth}
        />
        <path
          style={{ transform: `translate(75%, ${scrollPercent * 10 + 50}%)` }}
          fill={`var(${colors[0]})`}
          d={paths.first}
        />
        <path
          style={{ transform: `translate(115%, ${scrollPercent * 0 + 25}%)` }}
          fill={`var(${colors[1]})`}
          d={paths.second}
        />
      </svg>
    </Div100vh>
  )
}

const colors = ['--color-accent-light', '--color-accent-dark', '--color-brand', '--color-main-dark']

const paths = {
  first:
    'M103.2,-169.2C137.1,-138.7,170.4,-115.9,173.4,-86C176.4,-56.2,149.1,-19.3,131.2,10.100000000000001C113.4,39.6,105.1,61.7,96.4,98.5C87.8,135.2,78.8,186.6,54.4,200.8C30.1,214.9,-9.8,191.9,-46,173.5C-82.2,155.1,-114.8,141.4,-153.7,120.1C-192.6,98.7,-237.8,69.7,-244.4,34.2C-250.9,-1.2999999999999998,-218.7,-43.2,-198,-91.2C-177.3,-139.2,-168.1,-193.3,-137,-225.1C-106,-256.9,-53,-266.4,-9.2,-252.1C34.6,-237.8,69.2,-199.7,103.2,-169.2Z',
  second:
    'M40.5,-32.5C72.3,-42.5,131.7,-64.9,154.4,-57.9C177.2,-51,163.3,-14.8,164.5,28.4C165.6,71.5,181.8,121.5,162.4,136.5C142.9,151.5,87.8,131.4,45.6,134C3.5,136.6,-25.7,161.8,-50.2,159.8C-74.7,157.7,-94.4,128.3,-114.9,101.4C-135.5,74.5,-156.8,50,-169.6,19C-182.5,-12,-186.7,-49.6,-161.3,-60.5C-135.8,-71.3,-80.6,-55.4,-48.8,-45.4C-16.9,-35.4,-8.5,-31.2,-2.1,-28C4.3,-24.7,8.7,-22.5,40.5,-32.5Z',
  third:
    'M47.6,-65.5C67.7,-61,94.4,-58.1,111.9,-44C129.5,-29.8,138,-4.4,151.1,33.6C164.2,71.7,181.8,122.3,168.6,156.7C155.3,191.1,111,209.2,70.8,204.1C30.6,198.9,-5.5,170.5,-48.8,160.4C-92,150.3,-142.4,158.7,-171.6,140.2C-200.7,121.7,-208.8,76.4,-214.4,31.4C-220,-13.7,-223.3,-58.6,-209.6,-98.7C-195.9,-138.8,-165.2,-174.1,-127.5,-170.6C-89.7,-167,-44.9,-124.5,-15.6,-100.2C13.7,-76,27.4,-70,47.6,-65.5Z',
  fourth:
    'M91.1,-155.3C123.1,-121.2,157.5,-104.4,171.4,-77.3C185.4,-50.2,178.8,-12.7,163.6,16.4C148.3,45.5,124.4,66.3,107.6,102.7C90.8,139,81,190.9,56.9,201.3C32.9,211.7,-5.5,180.7,-45.4,164.5C-85.2,148.2,-126.5,146.8,-145.9,125.7C-165.3,104.6,-162.8,63.8,-179.9,19C-197,-25.8,-233.6,-74.6,-225,-106.7C-216.5,-138.9,-162.9,-154.4,-117.8,-182.5C-72.8,-210.6,-36.4,-251.3,-3.4000000000000004,-246C29.6,-240.7,59.1,-189.3,91.1,-155.3Z'
}

// const pathIds = Object.keys(paths)

// const morphTransition = ({ from, to }) =>
//   tween({
//     from: 0,
//     to: 1
//   }).pipe(interpolate(from, to))

// const Icon = posed.path(
//   pathIds.reduce((config, id) => {
//     config[id] = {
//       d: paths[id],
//       transition: morphTransition
//     }

//     return config
//   }, {})
// )

// const NextButton = posed.button({
//   hoverable: true,
//   pressable: true,
//   init: { scale: 1 },
//   hover: { scale: 1.1 },
//   press: { scale: 0.8 }
// })
