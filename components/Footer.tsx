"use client";
import { legalsLinksData, linksData, socialsData } from '@/data/works';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [isHashLink, setIsHashLink] = useState("");
  const classLink = "font-light text-base text-subtitle hover:underline hover:text-white";
  const pathname = usePathname();

  useEffect(() => {
    if(window.location.href.includes(window.location.hash)) {
      setIsHashLink(`/${window.location.hash}`);
    }
  }, []);

  useEffect(() => {
    const sectionsAndHeader = document.querySelectorAll("section[id], header[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setIsHashLink(`/#${id}`);
            }
          }
        });
      },
      { threshold: 0.5 }
    );
  
    sectionsAndHeader.forEach((element) => observer.observe(element));
  
    return () => {
      sectionsAndHeader.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <footer className={cn("relative flex flex-col justify-center px-6 mx-auto", "2xl:max-w-[70%]")}>
      <div className={cn("relative size-full p-6 border-t border-neutral-600/30 bg-gradient-to-t from-transparent  via-transparent via-50% to-[#151518] backdrop-blur-xl rounded-3xl mx-auto", "xl:py-24")}>
        <div className={cn("flex flex-col space-y-14 py-6", "md:justify-center md:text-center", "lg:items-center", "xl:flex-row xl:items-start xl:justify-between xl:space-y-0 xl:max-w-7xl xl:mx-auto")}>
          <div className={cn("space-y-4")}>
            <Image src={"/images/novai.png"} width={2048} height={2048} alt="Logo" className='md:mx-auto pb-2' style={{width: "80px"}} />
            <div className={cn("space-y-2 pb-2")}>
              <h6 className={cn("font-black text-2xl")}>Novai</h6>
              <p className={cn("font-light text-base text-subtitle max-w-xs leading-relaxed", "md:max-w-max md:mx-auto", "xl:max-w-sm")}>
              Agence d'Agent & Automatisation IA
              </p>
            </div>
            <div className={cn("flex justify-evenly items-end gap-2", "md:justify-center md:gap-3")}>
              {socialsData.map((data, index) => (
                <Link
                  key={index}
                  href={data.link}
                  target="_blank"
                  rel="preload"
                  className={cn(
                    "p-[2px]",
                    "*:transition ease-out *:hover:duration-300 *:hover:text-white border rounded-lg", 
                    "transition-all ease-in",
                    "border-[0.1px] border-neutral-600/50 bg-gradient-to-b from-background to-[#151518] rounded-[10px] p-3",
                    "hover:bg-gradient-to-b hover:from-secondary hover:to-primary"
                  )}
                >
                  <data.icon className="text-white flex items-center justify-center w-full h-full text-xl antialiased" />
                </Link>
              ))}
            </div>
          </div>
          <div className={cn("flex flex-col gap-10", "lg:flex-row lg:gap-20")}>
            <div className={cn("space-y-4")}>
              <h6 className={cn("uppercase text-lg font-medium")}>Pages</h6>
              <ul className="leading-loose">
                {linksData.map((data, i) => (
                  <li key={i}>
                    <Link 
                      aria-label={data.label}
                      href={data.link} 
                      onClick={() => setIsHashLink(data.link)}
                      className={cn(classLink, data.link === isHashLink && "font-bold text-white underline")}
                    >
                      {data.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={cn("space-y-4")}>
              <h6 className={cn("uppercase text-lg font-medium")}>Pages Légales</h6>
              <ul className="leading-loose">
                {legalsLinksData.map((data, i) => (
                  <li key={i}>
                    <Link href={data.link} aria-label={data.label} className={cn(classLink, data.link === pathname && "text-white font-bold")}>{data.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={cn("space-y-2", "lg:space-y-0")}>
            <h6 className={cn("uppercase text-lg font-medium")}>Vous avez un projet ?</h6>
            <div className={cn("pt-6", "md:flex md:justify-center")}>
              <Link href="https://cal.com/novaiagency/appel-de-decouverte" target="_blank" rel="preload" className={cn(
                "text-white font-medium", 
                "w-[80%] h-12",
                "md:w-60 md:h-14",
                "lg:mx-auto",
                "xl:w-60 xl:h-14 p-[1px]",
                "*:transition ease-out *:hover:duration-300 *:hover:text-white", 
                "transition-all ease-in ",
                "bg-secondary shadow-custom-secondary backdrop-blur-xl flex items-center justify-center text-base antialiased rounded-[10px]",
                "hover:bg-primary hover:shadow-custom-primary",
              )}>
                Réserver votre appel
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={cn("flex justify-between p-6")}>
        <p className='text-sm text-subtitle/80'>Tous droits réservés</p>
        <p className='text-sm text-subtitle/80'>Novai Agency - 2025</p>
      </div>
    </footer>
  );
};

export default Footer;