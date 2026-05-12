// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f5fa] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#def2ff] flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[#e5322d]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-8xl font-bold text-black mb-4 tracking-tight">
          4
          <span className="text-[#e5322d]">0</span>
          4
        </h1>

        <h2 className="text-2xl font-semibold text-[#454545] mb-3">
          Страница не найдена
        </h2>

        <p className="text-[#454545] mb-8 max-w-md mx-auto leading-relaxed">
          К сожалению, запрашиваемая страница не существует или была
          перемещена. Проверьте правильность адреса или вернитесь на главную.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#e5322d] text-white rounded-lg 
                     hover:bg-[#c92a26] transition-colors duration-200 font-medium shadow-lg 
                     shadow-[#e5322d]/20 hover:shadow-xl hover:shadow-[#e5322d]/30 
                     active:scale-95 transform"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Вернуться на главную
        </Link>

        <div className="mt-12 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#acacac] opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-[#e5322d] opacity-70"></div>
          <div className="w-2 h-2 rounded-full bg-[#acacac] opacity-50"></div>
        </div>
      </div>
    </div>
  );
}