import {ButtonLink} from '@/components/ui/ButtonLink';
import {Eyebrow} from '@/components/ui/Eyebrow';
export default function NotFoundPage(){return <section className="not-found"><div className="container"><Eyebrow>Lost along the way?</Eyebrow><span>404</span><h1>This page took a different route.</h1><p>The page may have moved, or the link may be incorrect. The home page is a good place to start.</p><ButtonLink href="/">Back to home</ButtonLink></div></section>}
