import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };

  className?: string;
}

const Hero = ({
  badge = 'baadge',
  heading = 'heading',
  description = 'Decribtions',
  buttons = {
    primary: {
      text: 'Discover all components',
      url: 'https://www.example.com',
    },
    secondary: {
      text: 'View on GitHub',
      url: 'https://example.com',
    },
  },

  className,
}: Hero1Props) => {


  return (
    <section className={cn('py-32', className)}>
      <div className="container">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )}
            <h1 className="text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
          <Image
            src="/hero.avif"
            alt="Online tutoring platform connecting students with expert tutors"
            width={1200}
            height={700}
            priority
            className="aspect-video w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
