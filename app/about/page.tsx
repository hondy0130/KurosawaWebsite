import Strengths from '../components/Strengths';
import Members from '../components/Members';
import CompanyInfo from '../components/CompanyInfo';

export default function AboutPage() {
  return (
    <main>
      {/* ヒーローセクション（テキストなし、トップと同じ背景装飾） */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 bg-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-[#A5D6A7]/40 via-[#C8E6C9]/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#81C784]/35 via-[#A5D6A7]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#66BB6A]/15 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2C5F2D]/30 to-transparent"></div>
      </section>

      {/* Strengths */}
      <Strengths />

      {/* Member */}
      <Members />

      {/* Company Information */}
      <CompanyInfo />
    </main>
  );
}


