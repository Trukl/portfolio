import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function About() {
  return (
    <section className="my-0">
      <Card>
        <CardHeader>
          <CardTitle>Mon parcours</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Développeur FullStack passionné avec 4 ans d&apos;expérience dans le développement web
            et mobile. Spécialisé sur la stack JS, avec une solide expérience en React et Node.js.
          </p>
          <p className="mb-4">
            Je suis constamment à la recherche de nouveaux défis pour élargir mes compétences et
            contribuer à des projets ambitieux. Mon approche combine expertise technique et
            créativité pour livrer des solutions innovantes.
          </p>
          <p>
            Reconnu pour mon autonomie, mon sérieux et ma rigueur, je m&apos;efforce toujours de
            dépasser les attentes et de rester à la pointe des dernières technologies.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
