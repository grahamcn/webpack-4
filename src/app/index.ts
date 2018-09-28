import xs, { Stream } from 'xstream'
import { div, VNode, DOMSource } from '@cycle/dom'

import Header from './header'
import Content from './content'
import {baseApi} from './utils/globals'
const getFooter = () => import('./footer')

console.log(baseApi)

interface Sinks {
	DOM: Stream<VNode>
}

interface Sources {
	DOM: DOMSource
}

function App(sources: Sources): Sinks {

  const scrollDown$ =
		sources.DOM.select('document')
      .events('scroll')

  const HeaderComponent = Header()
  const headerDom$: Stream<VNode> = HeaderComponent.DOM

  const ContentComponent = Content()
  const contentDom$: Stream<VNode> = ContentComponent.DOM

	const footerDom$: Stream<VNode> =
		scrollDown$
			.take(1)
			.map(() =>
				xs.fromPromise(getFooter())
					.map(footerModule => {
						const FooterComponent = footerModule.default()
						const footerDom$ = FooterComponent.DOM
						return footerDom$
					})
					.flatten()
			)
			.flatten()
      .startWith(div())

  const vdom$ =
    xs.combine(
      headerDom$,
      contentDom$,
      footerDom$,
    ).map(([headerDom, contentDom, footerDom]) =>
      div([
        headerDom,
        contentDom,
        footerDom,
      ])
    )

	return {
    DOM: vdom$,
	}
}

export default App
