import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skills = [
  { category: "Frontend", items: ["React", "React Native", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "Fastify", "Jest"] },
  { category: "DevOps & Outils", items: ["Git", "Docker", "CI/CD"] }
]

export default function Skills() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Compétences</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{skill.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {skill.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

