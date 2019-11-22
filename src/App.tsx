import React, { Suspense } from 'react'
import { BrowserRouter, Switch, NavLink, Route } from 'react-router-dom';
import Home from './Home'

const About = React.lazy(() => import(/* webpackChunkName: "About" */'./About'))
const Contact = React.lazy(() => import(/* webpackChunkName: "Contact" */'./Contact'))

const LazyAbout = () => <Suspense fallback="Loading"><About/></Suspense>
const ContactAbout = () => <Suspense fallback="Loading"><Contact/></Suspense>

export default function App() {
	return <BrowserRouter>
		<div>
			<div>
				<NavLink exact to="/">Home</NavLink>
				<NavLink exact to="/about">About</NavLink>
				<NavLink exact to="/contact">Contact</NavLink>
			</div>

			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/about" component={LazyAbout} />
				<Route exact path="/contact" component={ContactAbout} />
			</Switch>
		</div>
	</BrowserRouter>
}
