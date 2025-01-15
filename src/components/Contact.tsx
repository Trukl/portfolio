import { Mail, Linkedin, Github } from 'lucide-react'

export default function Contact() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <div className="flex flex-col space-y-2">
        <a href="mailto:votre.email@example.com" className="flex items-center text-blue-600 hover:text-blue-800">
          <Mail className="mr-2" /> votre.email@example.com
        </a>
        <a href="https://www.linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
          <Linkedin className="mr-2" /> LinkedIn
        </a>
        <a href="https://github.com/votre-profil" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
          <Github className="mr-2" /> GitHub
        </a>
      </div>
    </section>
  )
}

