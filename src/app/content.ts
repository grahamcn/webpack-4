import xs, { Stream } from 'xstream'
import { div, VNode } from '@cycle/dom'

interface Sinks {
	DOM: Stream<VNode>
}

function Content(): Sinks {
	return {
		DOM: xs.of(
      div('Content')
    )
	}
}

export default  Content
