import * as React from 'react'
import { render } from 'react-dom'
import "antd/dist/antd.css"

import Vote from './containers/Vote'

render(
  <Vote />,
  document.getElementById('vote_button')
)
