import { BlurFade } from "@/components/ui/blur";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BrandGithubSolid } from "@mynaui/icons-react";
import Link from "next/link";
import { geistSans } from "../font";
import Logo from "../global/logo";
import Image from "next/image";

const Footer = () => {
  return (
    <BlurFade delay={0.1} inView>
      <footer className="relative mx-2 mb-2 overflow-hidden rounded-3xl bg-gradient-to-br from-[#37322f] to-[#201e1d] px-4 py-8 text-sidebar sm:px-6 lg:px-8">
        <div className="relative z-10 h-60 w-full text-center">
          <div className="absolute left-1/2 -translate-x-1/2 translate-y-[140%] text-[108px] font-bold leading-none md:translate-y-[22%] md:text-[278px]">
            <span className="select-none bg-gradient-to-b from-transparent to-neutral-700/50 bg-clip-text text-transparent">
              response
            </span>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3">
            <div className="h-56 w-56 rounded-full border-[20px] border-[#7c533a]/60 blur-[80px]"></div>
          </div>
        </div>

        <div className="container absolute left-0 right-0 top-0 z-50 mx-auto mt-6 flex w-full max-w-5xl flex-col items-center">
          <div className="mt-4 flex w-full flex-col items-center justify-around gap-6 md:flex-row">
            <Logo />
            <nav className="flex w-fit flex-wrap items-center justify-center gap-5 gap-y-3 lg:flex-nowrap lg:gap-12">
              <span
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium leading-7",
                  geistSans.className,
                )}
              >
                <span>Made by</span>
                <Button asChild variant="link" className="px-0 text-sidebar">
                  <Link
                    href="https://peerlist.io/sutharjay"
                    target="_blank"
                    aria-label="Jay Suthar"
                    className=" "
                  >
                    Jay Suthar
                  </Link>
                </Button>
              </span>
            </nav>
            <div className="flex w-fit items-center gap-3">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:bg-accent/5 hover:text-current"
              >
                <Link
                  href="https://github.com/sutharjay1/response"
                  target="_blank"
                  aria-label="Response GitHub repository"
                >
                  <BrandGithubSolid className="h-6 w-6" />
                </Link>
              </Button>
              <Separator
                orientation="vertical"
                className="h-6 bg-sidebar-border/20"
              />
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="hover:bg-accent/5 hover:text-current"
              >
                <Link
                  href="https://peerlist.io/sutharjay"
                  target="_blank"
                  aria-label="Response GitHub repository"
                  className="p-1.5"
                >
                  <Image
                    src="https://res.cloudinary.com/cdn-feedback/image/upload/v1733355730/response/peerlist.png"
                    alt="Peerlist logo"
                    width={32}
                    height={32}
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </BlurFade>
  );
};

export default Footer;
