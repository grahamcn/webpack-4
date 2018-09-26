import xs, { Stream } from 'xstream'
import { div, header, img, VNode } from '@cycle/dom'

import logoImage from '../assets/images/logo.png'

interface Sinks {
	DOM: Stream<VNode>
}

function Header(): Sinks {
	return {
		DOM: xs.of(
      header([
        img({
					style: {
						width: '100px',
					},
          attrs: {
            src: logoImage,
            title: 'Sky Bet'
          }
        }),
        div('Header')
      ])
    )
	}
}

export default Header
