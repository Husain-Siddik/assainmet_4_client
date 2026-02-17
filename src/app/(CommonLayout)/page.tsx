import { Hero } from "@/components/modules/home/Hero";





export default async function Home() {






  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">


      <div>
        <Hero
          className="px-3"
          badge="Trusted by Learners & Educators"
          heading="Learn Smarter. Teach Better. Grow Faster."
          description="Skill Bridge helps students connect with top tutors for personalized learning experiences. Start your journey today."

          buttons={{
            primary: {
              text: "Find a Tutor",
              url: "/tutors",
            },
            secondary: {
              text: "Become a Tutor",
              url: "/signup",
            },
          }}

        ></Hero>
      </div>
    </div>
  );
}
