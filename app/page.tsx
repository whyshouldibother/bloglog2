import Projects from '@components/Projects'
export default function Home() {
  return (
      <main className="flex-1 md:pt-5 md:p-8 overflow-auto">
        <header className="mb-20">
            <p>
                This is just a place to track my progress throughout time with my ESP32.
            </p>
        </header>
        <Projects/> 
      </main>
  );
}
