export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        Contact
      </h1>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <div className="w-full max-w-xl my-16 text-center text-gray-300 animate-fade-in">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
          minus voluptas sunt voluptatibus, voluptatem commodi dolorum nostrum
          explicabo aliquid consequuntur?
        </p>
      </div>
    </div>
  );
}
