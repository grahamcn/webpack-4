import xs, { Stream } from 'xstream'
import { div, footer, VNode } from '@cycle/dom'

interface Sinks {
	DOM: Stream<VNode>
}

function Footer(): Sinks {
	return {
		DOM: xs.of(
      footer([
        div('Footer')
      ])
    )
	}
}

export default Footer
