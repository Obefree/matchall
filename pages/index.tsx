import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-mono">
          <li className="mb-2 tracking-[-.01em]">
            Привет! Это мини-игра. Чтобы начать — нажмите кнопку ниже.
          </li>
          <li className="tracking-[-.01em]">
            Вводите свои любимые фильмы, книги, музыку и еду — и ищите совпадения!
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/join"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-gray-800 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            🎲 Начать игру
          </Link>

          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          >
            📘 Документация
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-xs text-gray-500">
        <Link href="https://nextjs.org/learn" target="_blank" className="hover:underline hover:underline-offset-4">
          Learn
        </Link>
        <Link href="https://vercel.com/templates?framework=next.js" target="_blank" className="hover:underline hover:underline-offset-4">
          Templates
        </Link>
        <Link href="https://nextjs.org" target="_blank" className="hover:underline hover:underline-offset-4">
          Next.js →
        </Link>
      </footer>
    </div>
  );
}
