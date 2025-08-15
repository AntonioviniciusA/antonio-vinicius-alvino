import { Code } from "lucide-react";
import Image from "next/image";

interface SkillItem {
  name: string;
  iconUrl: string;
  altText: string;
}

const SkillsSection = () => {
  const skills: SkillItem[] = [
    {
      name: "React",
      iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      altText: "React logo"
    },
    {
      name: "Next.js",
      iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
      altText: "Next.js logo"
    },
    {
      name: "Node.js",
      iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      altText: "Node.js logo"
    },
    {
      name: "Tailwind CSS",
      iconUrl: "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
      altText: "Tailwind CSS logo"
    },
    {
      name: "TypeScript",
      iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
      altText: "TypeScript logo"
    },
    {
      name: "MySQL",
      iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
      altText: "MySQL logo"
    },
    {
      name: "Docker",
      iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
      altText: "Docker logo"
    },
    {
      name: "Git",
      iconUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
      altText: "Git logo"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-purple-500 text-white px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center gap-2">
          <Code className="w-8 h-8" />
          Minhas Habilidades
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center space-y-2">
              <Image
                src={skill.iconUrl}
                width={64}
                height={64}
                alt={skill.altText}
              />
              <span className="text-lg font-semibold">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;